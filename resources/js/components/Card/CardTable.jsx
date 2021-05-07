import React, { useState, useEffect } from "react";
import "./style.scss";

export default function cardTable(props) {
    const [item, setItem] = useState(false);
    useEffect(() => {
        if (props.visible != undefined) {
            setItem(props.visible);
        }
    }, [setItem, props.visible]);

    const henlerClick = (event) => {
        setItem(!item);
        if (props.henlerParent != undefined) {
            props.henlerParent();
        }
    };
    return (
        <div id="CardTable" className={`CardTable ${props.className}`}>
            <div className="header">
                <div className="left">{props.title}</div>
                <div className="right">
                    {props.action}
                    <button
                        className="btn btn-info btn-sm btn-circle"
                        onClick={henlerClick.bind(this)}
                    >
                        <i className="fa fa-caret-down"></i>
                    </button>
                </div>
            </div>
            <div className="detail" hidden={item ? false : true}>
                {props.children}
            </div>
        </div>
    );
}
