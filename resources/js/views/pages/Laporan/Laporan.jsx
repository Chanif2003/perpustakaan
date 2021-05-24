import React, { useState, useEffect } from "react";
import TablePeminjaman from "./TeblePeminjaman";
import jsPDF from "jspdf";
import TablePengembalian from "./TablePengembalian";
import DataBuku from "./TableDataBuku";
import TableMemberPustaka from "./TableMemberPustaka";
import PinjamanReport from "./PrintTemplate/Pinjaman";
import TablePengunjung from "./TablePengunjung";
export default function Laporan() {
    const [navActive, setNavActive] = useState("Peminjaman");
    const [page, setPage] = useState(<TablePeminjaman />);

    const hendlNav = (navActive) => {
        setNavActive(navActive);
        switch (navActive) {
            case "Peminjaman":
                setPage(<TablePeminjaman />);
                break;
            case "Pengembalian":
                setPage(<TablePengembalian />);
                break;
            case "Laporan Pengunjung":
                setPage(<TablePengunjung />);
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
            {/* <PinjamanReport/> */}
            <Navigasi onActive={hendlNav} />
            {page}
        </div>
    );
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
