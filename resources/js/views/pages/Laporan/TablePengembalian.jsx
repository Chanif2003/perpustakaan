import React, { useState, useEffect } from "react";
import $, { data } from "jquery";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
// import "datatables.net-dt/js/";
import ECard from "../../../components/Card/Ecard";
import axios from "axios";
import { base_url } from "../../../constant/constant";
import Loading from "../../../components/LoadingPage/Loading";
import Swal from "sweetalert2";
export default function TablePengembalian() {
    const [dataPeminjam, setDataPeminjam] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renders, setRender] = useState(true);
    const [mountsSearch, setMouthSearch] = useState(null);
    useEffect(() => {
        setLoading(true);
        getDataPeminjam("");
    }, []);

    const getDataPeminjam = async (search) => {
        const get = await axios.get(
            base_url + "api/getdataPengembalian/" + search
        );
        setDataPeminjam(get.data);
        setLoading(false);
        console.log(get.data);
        setRender(true);
    };
    const hendelSearchMounth = (e) => {
        setRender(false);
        getDataPeminjam(e.target.value);
        setMouthSearch(e.target.value);
    };
    const hendelSearchSearch = (e) => {
        setRender(false);
        getDataPeminjam(e.target.value);
        setMouthSearch(e.target.value);
    };
    const loadingPage = () => {
        return (
            <ECard className="text-center">
                <Loading />
            </ECard>
        );
    };
    const MissData = () => {
        return (
            <ECard className="text-center">
                <h5>
                    Data pada bulan{" "}
                    {require("moment")(mountsSearch).format("MMM YYYY")} tidak
                    ditemukan
                </h5>
            </ECard>
        );
    };
    const hendelPrint = () => {
        const search = mountsSearch == null ? "" : mountsSearch;
        window.open(
            base_url + "print-Laporan/pengembalian/" + search,
            "_blank" // <- This is what makes it open in a new window.
        );
    };

    return (
        <div>
            <ECard className="mb-1">
                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            <label>Cari Berdasarkan Bulan</label>
                            <input
                                type="month"
                                className="form-control form-control-sm"
                                onChange={hendelSearchMounth}
                            />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <label>Cari</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                onChange={hendelSearchSearch}
                                placeholder="cari berdadsarkan nama / kode member "
                            />
                        </div>
                    </div>
                    <div
                        className="col-md-2"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div className="form-group m-0 p-0">
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={hendelPrint}
                            >
                                <i className="fa fa-print"></i> Print
                            </button>
                        </div>
                    </div>
                </div>
            </ECard>
            {dataPeminjam.length > 0 ? (
                renders ? (
                    <TbJquery data={dataPeminjam} />
                ) : (
                    loadingPage()
                )
            ) : (
                MissData()
            )}
        </div>
    );
}

const TbJquery = (props) => {
    const [dataPeminjam, setDataPeminjam] = useState([]);
    const [render, setRender] = useState(false);
    useEffect(() => {
        setDataPeminjam(props.data);
        // console.log(dataPeminjam);
        if (dataPeminjam.length > 0) {
            setRender(true);
        }
    }, [props.data, dataPeminjam]);
    useEffect(() => {
        if (render) {
            JqueryEx();
            $(document).on("click", ".dels", (e) => {
                console.log("ok");
                if (e.target.getAttribute("data-id") != null) {
                    deletes(e.target.getAttribute("data-id"));
                }
            });
        }
    }, [render]);
    const JqueryEx = () => {
        $(document).ready(function () {
            var table = $("#example").DataTable({
                responsive: true,
                bFilter: false,
            });
            // Handle click on "Expand All" button
            $("#btn-show-all-children").on("click", function () {
                // Expand row details
                table
                    .rows(":not(.parent)")
                    .nodes()
                    .to$()
                    .find("td:first-child")
                    .trigger("click");
            });

            // Handle click on "Collapse All" button
            $("#btn-hide-all-children").on("click", function () {
                // Collapse row details
                table
                    .rows(".parent")
                    .nodes()
                    .to$()
                    .find("td:first-child")
                    .trigger("click");
            });
        });
    };
    const deletes = (id) => {
        const run = async (kode) => {
            const del = await axios.get(
                base_url + "api/deletePengembalian/" + kode
            );
            console.log(del);
            if (del.data.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: "Good Job",
                    text: "Berhasil",
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops..!",
                    text: del.data.msg,
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        };

        const kode = id;
        Swal.fire({
            text: "Yakin Akan Menghapus Data?",
            showCancelButton: true,
            confirmButtonText: `Ya`,
        }).then((result) => {
            if (result.isConfirmed) {
                run(kode);
            }
        });
    };
    return (
        <ECard title="Laporan Pengembalian Buku">
            <table id="example" className="display" width="100%">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Siswa</th>
                        <th>Alamat</th>
                        <th>No Hendphone</th>
                        <th>Tanggal Pinjam</th>
                        <th>Tanggal Pengembalian</th>
                        <th>Lama Pinjam</th>
                        <th>Jumlah Buku</th>
                        <th>Catatan</th>
                        <th>Hapus</th>
                    </tr>
                </thead>
                <tbody>
                    {dataPeminjam.length > 0 &&
                        dataPeminjam.map((item, i) => {
                            let io = i + 1;
                            return (
                                <tr key={i}>
                                    <td>{io++}</td>
                                    <td>{item.pinjaman.nama}</td>
                                    <td>{item.pinjaman.alamat}</td>
                                    <td>{item.pinjaman.tlp}</td>
                                    <td>
                                        {require("moment")(
                                            item.pinjaman.tanggal_pinjam
                                        ).format("DD MMM YYYY")}
                                    </td>
                                    <td>
                                        {require("moment")(
                                            item.pinjaman.tanggal_kembali
                                        ).format("DD MMM YYYY")}
                                    </td>
                                    <td>
                                        {item.pinjaman.lama_pinjam + " Hari"}
                                    </td>
                                    <td>{item.jumlahPinjam + " Buku"}</td>
                                    <td>{item.pinjaman.catatan}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm dels"
                                            data-id={
                                                item.pinjaman.kode_peminjaman
                                            }
                                        >
                                            <i className="las la-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </ECard>
    );
};
