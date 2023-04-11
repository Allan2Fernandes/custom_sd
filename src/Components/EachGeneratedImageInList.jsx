import React from "react";
import "../Styles/EachGeneratedImageInList.css"
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function EachGeneratedImageInList(props){
    return (
        <div id={"imgDiv"} className={props.backGroundSelectorClass + " " + props.selectedThumbnailClass}>
            <div id={"childDiv"}>
                <div id={"deleteImageButtonDiv"}>
                    <button onClick={props.deleteItemHandler}>
                        <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                    </button>
                </div>
                <center>
                    <img id={"imgElement"} src={props.decodedImage} alt={"Decoded image"} onClick={props.imageSelectorClickHandler}/>
                </center>
            </div>
        </div>
    );
}

export default EachGeneratedImageInList