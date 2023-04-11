import React, {useState} from "react";
import "../Styles/PromptHandler.css"
import { faAdd, faImage } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PromptElement from "./PromptElement";


function PromptHandler(props){
    // const [listOfPrompts, setListOfPrompts] = useState([]);

    // async function addPromptToListCLickHandler(){
    //     var label = document.getElementById("positivePromptInput")
    //     if(label.value === ""){
    //         return;
    //     }
    //     let inputtedText = label.value
    //     setListOfPrompts([...listOfPrompts, inputtedText]);
    //     label.value = "";
    // }

    // function handleRemoveItem(indexToRemove){
    //     const newItems = [...listOfPrompts];
    //     newItems.splice(indexToRemove, 1);
    //     setListOfPrompts(newItems);
    // }

    // function generateImageClickHandler(){
    //     var requestBody = {
    //         "prompts": listOfPrompts,
    //         "Seed": 12,
    //         "inf_steps": 30
    //     }
    //     const requestOptions = {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify(requestBody)
    //     }
    //     fetch("http://localhost:8000/imageGenerator/", requestOptions)
    //         .then((response)=> response.json())
    //         .then((data)=> console.log(data));
    // }

    return (
        <div id={"MainPromptDiv"}>
            <center id={"promptTitleCenter"}>
                <label>Prompts</label>
            </center>
            <br/>
            <input id={"positivePromptInput"} type={"text"} placeholder={"Describe the image"}/>
            <button id={"AddPromptButton"} onClick={props.addPromptToListCLickHandler}>
                <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
            </button>
            <br/>
            <input id={"negativePromptInput"} type={"text"} placeholder={"(Optional) Negative image features"}/>
            <br/>
            <div id={"listItemsDiv"}>
                {props.listOfPrompts.map((item, index)=>(
                    <PromptElement key={index} promptDescription={item} index = {index} deleteFunction = {()=>props.handleRemoveItem(index)}></PromptElement>
                ))}
            </div>
            <center>
                <button id={"GenerateImageButton"} onClick={props.generateImageClickHandler}>
                    <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
                    <label>Generate</label>
                </button>
            </center>

        </div>

    );
}

export default PromptHandler