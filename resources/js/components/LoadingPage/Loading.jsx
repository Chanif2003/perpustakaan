import React from "react";
import "./style.scss";
export default function Loading() {
    return (
        <div className="rootLoader">
            <div className="loader">
                <div className="loader__container">
                    <div className="loader__container__item" />
                </div>
                <div className="loader__container">
                    <div className="loader__container__item" />
                </div>
                <div className="loader__container">
                    <div className="loader__container__item" />
                </div>
            </div>
        </div>
    );
}
