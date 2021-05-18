import React from "react";
import "./style.scss";
export default function componentName(props) {
    return (
        <button className={`circle ${props.className}`} style={props.style} onClick={props.onClick}>
            {props.children}
        </button>
    );
}
