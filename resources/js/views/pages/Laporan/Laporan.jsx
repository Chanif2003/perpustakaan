import React, { useState, useEffect } from "react";
import TablePeminjaman from "./TeblePeminjaman";
import jsPDF from "jspdf";
import TablePengembalian from "./TablePengembalian";
import DataBuku from "./TableDataBuku";
import TableMemberPustaka from "./TableMemberPustaka";
export default function Laporan() {
    const [navActive, setNavActive] = useState("Peminjaman");
    const [page, setPage] = useState(<TablePeminjaman />);
    const generatePDF = () => {
        var doc = new jsPDF("p", "pt");

        doc.text(20, 20, "This is the first title.");

        doc.addFont("helvetica", "normal");
        doc.text(20, 60, "This is the second title.");
        doc.text(20, 100, "This is the thrid title.");

        // doc.save("demo.pdf");
        window.open(doc.output("bloburl"));
    };
    const hendlNav = (navActive) => {
        setNavActive(navActive);
        switch (navActive) {
            case "Peminjaman":
                setPage(<TablePeminjaman />);
                break;
            case "Pengembalian":
                setPage(<TablePengembalian />);
                break;
            case "Data Buku":
                setPage(<DataBuku />);
                break;
            case "Data Member Pustaka":
                setPage(<TableMemberPustaka />);
                break;
            default:
                break;
        }
    };
    // const page = () => {};
    return (
        <div>
            <Navigasi onActive={hendlNav} />
            {page}
        </div>
    );
}
{
    /* <button onClick={generatePDF} type="primary">
Download PDF
</button> */
}
const Navigasi = (props) => {
    const [nav, setnav] = useState("Peminjaman");
    const Nitems = (params) => {
        return (
            <li
                style={{
                    cursor: "pointer",
                }}
                className="breadcrumb-item"
                onClick={() => {
                    setnav(params);
                    props.onActive(params);
                }}
            >
                <span className={nav == params ? "badge badge-info" : ""}>
                    {params}
                </span>
            </li>
        );
    };
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {Nitems("Peminjaman")}
                {Nitems("Pengembalian")}
                {Nitems("Laporan Pengunjung")}
                {Nitems("Data Buku")}
                {Nitems("Data Member Pustaka")}
            </ol>
        </nav>
    );
};
