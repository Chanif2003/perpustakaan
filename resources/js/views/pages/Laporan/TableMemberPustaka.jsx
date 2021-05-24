import React, { useState, useEffect } from "react";
import $, { data } from "jquery";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
// import "datatables.net-dt/js/";
import ECard from "../../../components/Card/Ecard";
import axios from "axios";
import { base_url } from "../../../constant/constant";
import Loading from "../../../components/LoadingPage/Loading";
export default function TableMemberPustaka() {
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
            base_url + "api/LaporanDataAnggota/" + search
        );
        setDataPeminjam(get.data);
        setLoading(false);
        console.log(get.data);
        setRender(true);
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
                <h5>Data tidak ditemukan status 404</h5>
            </ECard>
        );
    };
    const hendelPrint = () => {
        const search = mountsSearch == null ? "" : mountsSearch;
        window.open(
            base_url + "print-Laporan/anggota/" + search,
            "_blank" // <- This is what makes it open in a new window.
        );
    };
    return (
        <div>
            <ECard className="mb-1">
                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            <label>Cari</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                onChange={hendelSearchSearch}
                                placeholder="cari berdadsarkan nama / kode member"
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
    return (
        <ECard title="Laporan Pengembalian Buku">
            <table id="example" className="display" width="100%">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode Anggota</th>
                        <th>Nama</th>
                        <th>Jenis Klamin</th>
                        <th>Tempat Tanggal Lahir</th>
                        <th>No Telepon</th>
                        <th>Alamat</th>
                        <th>Tahun Masuk</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataPeminjam.length > 0 &&
                        dataPeminjam.map((item, i) => {
                            let io = i + 1;
                            return (
                                <tr key={i}>
                                    <td>{io++}</td>
                                    <td>{item.kode_anggota}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.jenis_klamin}</td>
                                    <td>
                                        {item.tempat_lahir +
                                            " " +
                                            require("moment")(
                                                item.tanggal_lahir
                                            ).format("DD MMM YYYY")}
                                    </td>
                                    <td>{item.tlp}</td>
                                    <td>{item.alamat}</td>
                                    <td> {item.tahun_masuk}</td>

                                    <td>
                                        <button className="btn btn-info btn-sm mr-1">
                                            <i className="las la-trash-alt"></i>
                                        </button>
                                        <button className="btn btn-danger btn-sm">
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
