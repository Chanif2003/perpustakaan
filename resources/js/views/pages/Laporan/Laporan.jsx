import React from "react";
import TablePeminjaman from "./TeblePeminjaman";
import jsPDF from "jspdf";

export default function Laporan() {
    const generatePDF = () => {
        var doc = new jsPDF("p", "pt");

        doc.text(20, 20, "This is the first title.");

        doc.addFont("helvetica", "normal");
        doc.text(20, 60, "This is the second title.");
        doc.text(20, 100, "This is the thrid title.");

        // doc.save("demo.pdf");
        window.open(doc.output("bloburl"));
    };

    return (
        <div>
            <Navigasi />
            <TablePeminjaman />
        </div>
    );
}
{
    /* <button onClick={generatePDF} type="primary">
Download PDF
</button> */
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
