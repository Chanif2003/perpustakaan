import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";

const CircleChart = (props) => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [labelState, setLabelState] = useState([]);
    const [valueState, setValueState] = useState([]);
    const data = {
        labels: labelState,
        datasets: [
            {
                label: "Jumlah",
                data: valueState,
                backgroundColor: props.bgItem,
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartConfig = {
        type: "doughnut",
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            stepSize: 1,
                        },
                    },
                ],
            },
        },
    };
    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chartjs(
                chartContainer.current,
                chartConfig
            );
            setChartInstance(newChartInstance);
        }

        setLabelState(props.label);
        setValueState(props.value);

        // console.log(labelState);
    }, [props.label, props.value, labelState, valueState]);

    return (
        <div>
            <canvas ref={chartContainer} style={{ height: 500 }} />
        </div>
    );
};
export default CircleChart;
