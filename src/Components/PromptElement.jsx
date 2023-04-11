import React from "react";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../Styles/PromptElement.css"
function PromptElement(props){
    return (
        <div id={"PromptElementDiv"}>
            <label>{props.promptDescription}</label>
            <button id={"removeButton"} className={props.index%2===0?'even':'odd'}>
                <FontAwesomeIcon icon={faRemove} onClick={props.deleteFunction}></FontAwesomeIcon>
            </button>
        </div>
    )
}

export default PromptElement