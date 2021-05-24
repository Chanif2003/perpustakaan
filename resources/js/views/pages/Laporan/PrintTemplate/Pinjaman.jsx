import React from "react";
import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
};
const colstyle = {
    width: "30%",
};
const tableStyle = {
    width: "100%",
};
const Prints = () => (
    <div style={{
        width:'100%'
    }}>
        <div
            style={{
                width: "100%",
                height: 300,
                background: "red",
            }}
        ></div>
    </div>
);

const print = () => {
    const string = renderToString(<Prints />);
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.fromHTML(string);
    pdf.save("pdf");
};

const Pinjaman = () => (
    <div style={styles}>
        <button onClick={print}>print</button>
    </div>
);

export default Pinjaman;
