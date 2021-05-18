import React, { useState, useEffect } from "react";
import { ECard } from "../../../components/Card/Card";
// -- component init--
import InputForm from "./Input";
import FormOutput from "./Output";

// -------------------
export default function Anggota() {
    const [toggle, setToggel] = useState(false);
    const [pushValue, setPushValue] = useState(null);
    const [cases, setCases] = useState("save");
    const hendlInp = () => {
        setToggel(true);
        setPushValue(null);
    };
    const hendltoggelInput = () => {
        setToggel(false);
        setCases("save");
    };
    const hendlEdit = (data) => {
        setPushValue(data);
        setToggel(true);
        setCases("edit");
    };
    return (
        <div className="row">
            <div
                className="col-lg-12 mb-3"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {toggle === false && (
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={hendlInp}
                    >
                        Anggota Pustaka Baru
                    </button>
                )}
            </div>

            <div className="col-lg-6 mb-1 inp">
                {toggle && (
                    <InputForm
                        hendltoggelInput={hendltoggelInput}
                        pushValues={pushValue}
                        cases={cases}
                    />
                )}
            </div>

            <div className={toggle ? "col-lg-6" : "col-lg-12" + ` mb-1 out`}>
                <FormOutput
                    classItem={toggle ? "col-lg-12" : "col-lg-6"}
                    edit={hendlEdit}
                   
                />
            </div>
        </div>
    );
}
