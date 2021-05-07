import React, { Component } from "react";
import "../scss/style.scss";
import Sidebar from "../Navigator/Sidebar";
import Header from "../Navigator/TopNav";
const Base = (props) => {
    return (
        <div
            style={{
                overflowX: "hidden",
                paddingBottom:20
            }}
        >
            <input type="checkbox" id="nav-toggle" />
            <Header />
            <Sidebar />
            {/* <Content /> */}
            <main className="Main-Content">{props.children}</main>
        </div>
    );
};

export default Base;
