import React from "react";

export default function CardItems(props) {
    return (
        <div className={`e-card-items ${props.rootClass}`} style={props.rootStyle}>
            <div
                className={`e-items-child ${
                    props.className != undefined
                        ? props.className
                        : "primary-msg"
                }`}
            >
                <div className="e-card-body" style={props.style}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
