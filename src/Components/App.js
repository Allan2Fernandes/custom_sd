import "../Styles/App.css"
import PromptHandler from "./PromptHandler";
import {useState} from "react";
import EachGeneratedImageInList from "./EachGeneratedImageInList";
import SelectedImage from "./SelectedImage";
import ParameterSelectors from "./ParameterSelectors";

function App() {
    const [listOfPrompts, setListOfPrompts] = useState([]);
    const [listOfGeneratedImages, setListOfGeneratedImages] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedGuidanceScale, setSelectedGuidanceScale] = useState(8)
    const [infSteps, setInfSteps] = useState(30)
    function decodeBase64ToImage(base64String) {
        var image = new Image();
        image.src = 'data:image/png;base64,' + base64String;
        return image;
    }
    async function addPromptToListCLickHandler(){
        var label = document.getElementById("positivePromptInput")
        if(label.value === ""){
            return;
        }
        let inputtedText = label.value + " 8k, highres";
        setListOfPrompts([...listOfPrompts, inputtedText]);
        label.value = "";
    }

    function handleRemovePromptFromList(indexToRemove){
        const newItems = [...listOfPrompts];
        newItems.splice(indexToRemove, 1);
        setListOfPrompts(newItems);
    }

    function handleRemoveGeneratedImageFromList(indexToRemove){
        if(selectedIndex >= listOfGeneratedImages.length-1){
            var newIndex = selectedIndex-1;
            if(newIndex < 0){
                newIndex = 0;
            }
            setSelectedIndex(newIndex);
            console.log("Reducing selected index")
        }
        const newItems = [...listOfGeneratedImages];
        newItems.splice(indexToRemove, 1);
        setListOfGeneratedImages(newItems);
    }

    async function generateImageClickHandler(){
        if(listOfPrompts.length === 0){
            return;
        }

        var infInputField = document.getElementById("infStepsInput")
        var infInputFieldValue = parseInt(infInputField.value===""?30:infInputField.value);
        var seedInputField = document.getElementById("seedInput");
        var seedInputFieldValue = parseInt(seedInputField.value===""?42:seedInputField.value);
        var withSeed = seedInputField.value !== "";
        var requestBody = {
            "prompts": listOfPrompts,
            "Seed": seedInputFieldValue,
            "inf_steps": infInputFieldValue,
            "with_seed": withSeed
        }
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }
        await fetch("http://localhost:8000/imageGenerator/", requestOptions)
            .then((response)=> response.json())
            .then((data)=> {
                var listOfDecodedImages = [];
                for (let i = 0; i < data['ListImages'].length; i++) {
                    //Decode images to base64
                    listOfDecodedImages.push(decodeBase64ToImage(data['ListImages'][i]))
                }

                //SetState generated images
                const newList = listOfGeneratedImages.concat(listOfDecodedImages)
                setListOfGeneratedImages(newList)
            });
    }

    function imageSelectorClickHandler(index){
        setSelectedIndex(index);
    }

    function handleChangeGuidanceScale(){
        var slider = document.getElementById("guidanceScaleInput")
        var value = slider.value;
        setSelectedGuidanceScale(value)
    }

    function handleInfStepsChange(){
        var inputField = document.getElementById("infStepsInput")
        if(inputField.value >= 1000){
            setInfSteps(999)
        }else{
            setInfSteps(inputField.value);
        }

    }

    return (
        <div id={"AppDiv"}>
            <PromptHandler
                addPromptToListCLickHandler = {() => addPromptToListCLickHandler()}
                listOfPrompts = {listOfPrompts}
                handleRemoveItem = {() => handleRemovePromptFromList()}
                generateImageClickHandler = {() => generateImageClickHandler()}
            />
            <ParameterSelectors
                handleChange = {()=>handleChangeGuidanceScale()}
                guidanceScaleValue = {selectedGuidanceScale}
                infSteps = {infSteps}
                changeHandler = {()=>handleInfStepsChange()}
            />
            <div id={"imageThumbnailsDiv"}>
                {listOfGeneratedImages.map((decodedImage, index)=>(
                    <EachGeneratedImageInList
                        decodedImage={decodedImage.src}
                        imageSelectorClickHandler={()=>imageSelectorClickHandler(index)}
                        index = {index}
                        deleteItemHandler = {()=> handleRemoveGeneratedImageFromList(index)}
                        key={index}
                        backGroundSelectorClass={index%2===0?"evenImageInList":"oddImageInList"}
                        selectedThumbnailClass = {index === selectedIndex?"thumbnailIsSelected":"thumbnailIsNotSelected"}
                    />
                ))}
            </div>
           <SelectedImage
               shouldRender={selectedIndex<listOfGeneratedImages.length}
               imageToRender={listOfGeneratedImages.length===0?"":listOfGeneratedImages[selectedIndex].src}
           />
        </div>
    );
}

export default App;
