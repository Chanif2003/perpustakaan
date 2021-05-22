import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";

export default function App(props) {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    useEffect(() => {
        setLabels(props.label);
        setValues(props.value);
    }, [props.label, props.value]);
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Data Kunjngan",
                data: values,
                fill: false,
                borderColor: "#742774",
            },
        ],
    };
    return (
        <div className="App">
            <Line data={data} />
        </div>
    );
}
