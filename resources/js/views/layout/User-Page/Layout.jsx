import React, { Component } from "react";
import Navigator from "../Navigator/Navigator";
import "../scss/style.scss";
export default function componentName(props) {
    return (
        <div className="containerBase">
            <Navigator />
            <main className="Client-Content">{props.children}</main>
        </div>
    );
}
