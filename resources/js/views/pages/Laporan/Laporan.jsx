import React from "react";
import TablePeminjaman from "./TeblePeminjaman";
export default function Laporan() {
    return (
        <div>
            <Navigasi />
            <TablePeminjaman />
        </div>
    );
}
const Navigasi = () => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="#">Peminjaman</a>
                </li>
                <li className="breadcrumb-item">
                    <a href="#">Pengembalian</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Laporan Pengunjung
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Data Buku
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Data Member Pustaka
                </li>
            </ol>
        </nav>
    );
};
