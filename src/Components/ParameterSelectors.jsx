import React, {useEffect} from "react";
import "../Styles/ParameterSelectors.css"

function ParameterSelectors(props){

    return (
        <div id={"MainDiv"}>
            <center id={"TitleCenter"}>
                <label>Parameters</label>
            </center>
            <div id={"rngDiv"}>
                <label id={"rngLabel"}>RNG Seed</label>
                <br/>
                <input id={"seedInput"} type={"number"} placeholder={"(OPTIONAL) Reproduceable with seed"}/>
            </div>

            <br/>
            <div>
                <label id={"guidanceScaleLabel"}>Guidance Scale: {props.guidanceScaleValue}</label>
                <br/>
                <div id={"guidanceScaleInputDiv"}>
                    <input id={"guidanceScaleInput"} type={"range"} onChange={props.handleChange} min={0} max={12} value={props.guidanceScaleValue}/>
                </div>
            </div>
            <br/>
            <div id={"inferenceStepsDiv"}>
                <label>No. Inference steps</label>
                <br/>
                <input id={"infStepsInput"} type={"number"} placeholder={"Integer between 0-30"} value={props.infSteps} onChange={props.changeHandler}/>
            </div>
        </div>
    );
}

export default ParameterSelectors



//Parameters to select between
/*
* Seed
* Guidance scale (Fill in default)
* inference steps (Fill in default)
*
*
* */