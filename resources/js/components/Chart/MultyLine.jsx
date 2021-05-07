import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";

export default function MultyLine(props) {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [getDataSet, setDataSet] = useState([]);
    const [getLabel, setLabel] = useState(null);

    const funcSetData = (data = []) => {
        const result = [];
        data.map((items, i) => {
            result.push({
                label: items.label,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(225,0,0,0.4)",
                borderColor: items.bgLine, // The main line color
                borderCapStyle: "square",
                borderDash: [], // try [5, 15] for instance
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "black",
                pointBackgroundColor: "white",
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: "yellow",
                pointHoverBorderColor: "brown",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: items.data,
                spanGaps: true,
            });
        });
        return result;
    };
    var data = {
        labels: getLabel,
        datasets: funcSetData(getDataSet),
    };
    var options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        stepSize: 1,
                    },
                    scaleLabel: {
                        display: true,
                        fontSize: 20,
                    },
                },
            ],
        },
    };
    var myBarChart = {
        type: "line",
        data: data,
        options: options,
    };
    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chartjs(
                chartContainer.current,
                myBarChart
            );
            setChartInstance(newChartInstance);
        }
        setDataSet(props.dataSet);
        setLabel(props.label);
        console.log(getDataSet);
    }, [props.dataSet, props.label, getDataSet, getLabel]);

    return (
        <div>
            <canvas ref={chartContainer} style={{ height: 200 }} />
        </div>
    );
}

// var canvas = document.getElementById("barChart");
// var ctx = canvas.getContext('2d');

// // Global Options:
// Chart.defaults.global.defaultFontColor = 'black';
// Chart.defaults.global.defaultFontSize = 16;

// Notice the scaleLabel at the same level as Ticks

// Chart declaration:
