import React, { Component } from "react";
import "./style.scss";
const ECard = (props) => {
    return (
        <div className={`e-card ${props.className}`} style={props.style}>
            {props.title != null && (
                <div className="e-card-title">
                    <div className="w-100">{props.title}</div>
                </div>
            )}
            <div className="e-card-body">{props.children}</div>
        </div>
    );
};

export default ECard;
