import React, { Component } from "react";

export default class ListNews extends Component {
    constructor(props) {
        super(props);
    }
    style = {
        ContainerNews: {
            width: "100%",
        },
        imgThm: {
            width: "100%",
            height:200,
            borderRadius: 10,
        },
    };
    render() {
        return (
            <div className="ContainerNews">
                <div
                    className="w-100"
                    style={{
                        display: "flex",
                    }}
                >
                    <div
                        style={{
                            flex: "1",
                            width: "100%",
                            background: "rgb(240,240,240)",
                            boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2)",
                        }}
                        className="text-right pr-2"
                    >
                        <div style={{ fontSize: 10,padding:10 }}>
                            {this.props.leftReference}
                        </div>
                    </div>
                    <div style={{ flex: "3", background: "#fff", padding: 10 }}>
                        <img style={this.style.imgThm} src={this.props.thm} />
                        <div className="mt-2">
                            <h5>
                                <strong>{this.props.title}</strong>
                            </h5>
                            <p>{this.props.intro}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// leftReference
// imgThm
// title
// intro
