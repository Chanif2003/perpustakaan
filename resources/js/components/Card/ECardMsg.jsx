import React, { Component } from "react";
import "./style.scss";
export default class ECardMsg extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="ECardMsg" style={this.props.style}>
                <span className="title" style={this.props.titleStyle}>{this.props.title}</span>
                <div className="ECardMsg-child" style={this.props.childStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

// //////////////
// style
// title 
// childStyle
// children
