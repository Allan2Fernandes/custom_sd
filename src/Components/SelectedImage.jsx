import React from "react";
import "../Styles/SelectedImage.css"

function SelectedImage(props){
    if(props.shouldRender){
        return (
            <div id={"selectedImageDiv"}>
                <img
                    src={props.imageToRender}
                    alt={"Generated Image"}
                />
            </div>
        );
    }else{
        return (
            <div id={"selectedImageDiv"}>
                <img src={"https://cdn.getimg.ai/generated/img-nKwQwVKKyVSQeVDhj2obyj.png"} alt={"No generated images"}/>
            </div>
        );
    }
}

export default SelectedImage