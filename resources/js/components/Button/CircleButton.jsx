import React from "react";
import "./style.scss";
export default function componentName(props) {
    return (
        <button className={`circle ${props.className}`} onClick={props.onClick}>
            {props.children}
        </button>
    );
}
