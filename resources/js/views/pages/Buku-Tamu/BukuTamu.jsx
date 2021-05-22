import axios from "axios";
import React, { useEffect, useState } from "react";
import { ECard, CardItems } from "../../../components/Card/Card";
import { base_url } from "../../../constant/constant";
import Swal from "sweetalert2";
import {
    Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory,
    useLocation,
} from "react-router-dom";
import $ from "jquery";
export default function BukuTamu() {
    return (
        <div className="container">
            <BukuTamuComponent />
        </div>
    );
}

const BukuTamuComponent = () => {
    const [cases, setCases] = useState("save");
    const [getData, setdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(false);

    const location = useLocation();
    const [dataEdit, setDataEdit] = useState(null);
    const getLocationParams = () => {
        const url = location.pathname.substr(1).split("/");
        return url;
    };

    useEffect(() => {
        getdataBukuTamu("");
    }, []);
    useEffect(() => {
        if (getLocationParams()[1] != undefined) {
            const getDataById = async (id) => {
                const get = await axios.get(
                    base_url + "api/getdataBukuTamuById/" + id
                );
                setCases("update");
                setDataEdit(get.data);
            };
            getDataById(getLocationParams()[1]);
        }
    }, []);

    useEffect(() => {
        if (dataEdit != null) {
            $("[name='nama']").val(dataEdit.nama);
            $("[name='kelas']").val(dataEdit.kelas);
            $("[name='tanggal']").val(dataEdit.tanggal);
            $("[name='keperluan']").val(dataEdit.keperluan);
            $(".btn-sub")
                .removeClass("btn-primary")
                .addClass("btn-success")
                .text("edit");
        }
    }, [dataEdit]);

    const getdataBukuTamu = async (search) => {
        const get = await axios.get(base_url + "api/getdataBukuTamu/" + search);
        setLoading(false);
        setRender(true);
        setdata(get.data);
    };
    const submitBukuTamu = (evn) => {
        evn.preventDefault();
        const form_data = new FormData(evn.target);
        form_data.append("case", cases);
        if (cases == "update") {
            form_data.append("id", getLocationParams()[1]);
        }
        pushData(form_data);
    };
    const pushData = async (data) => {
        const data_ = await axios
            .post(base_url + "api/pushBukuTamu", data)
            .catch((error) => {
                console.log(error);
            });
        if (data_.data.status == 200) {
            Swal.fire({
                icon: "success",
                title: "Good Job",
                text: "Berhasil",
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = base_url + "BukuTamu";
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops..!",
                text: data_.data.msg,
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = base_url + "BukuTamu";
                }
            });
        }
    };

    const Input = () => {
        return (
            <form onSubmit={submitBukuTamu}>
                <ECard title="Catatan Buku Tamu">
                    <div className="form-group">
                        <label>Nama Siswa</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="nama"
                            id="nama"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Kelas</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="kelas"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tanggal</label>
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            name="tanggal"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Keperluan</label>
                        <textarea
                            className="form-control form-control-sm"
                            name="keperluan"
                            required
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="form-group text-right">
                        <button className="btn btn-primary btn-sm btn-sub">
                            Simpan
                        </button>
                    </div>
                </ECard>
            </form>
        );
    };
    const TbJquery = (props) => {
        const [getData, setdata] = useState([]);
        const [render, setRender] = useState(false);
        useEffect(() => {
            setdata(props.data);
            if (getData.length > 0) {
                setRender(true);
            }
        }, [props.data, getData]);
        useEffect(() => {
            if (render) {
                JqueryEx();
                $(document).on("click", ".dels", (d) => {
                    console.log(d);
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

        return (
            <ECard title="Buku Tamu">
                <div className="form-group mb-2">
                    <label>Cari berdasarkan Bulan</label>
                    <input
                        type="month"
                        className="form-control form-control-sm"
                    />
                </div>
                <table id="example" className="display mt-2" width="100%">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Siswa</th>
                            <th>Kelas</th>
                            <th>Tanggal</th>
                            <th>Keperluan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getData.length > 0 &&
                            getData.map((item, i) => {
                                let io = i + 1;
                                return (
                                    <tr key={i}>
                                        <td>{io++}</td>
                                        <td>{item.nama}</td>
                                        <td>{item.kelas}</td>
                                        <td>{item.tanggal}</td>
                                        <td>{item.keperluan}</td>
                                        <td>
                                            <a
                                                href={
                                                    base_url +
                                                    "BukuTamu/" +
                                                    item.id
                                                }
                                                className="btn btn-info btn-sm mr-1"
                                            >
                                                <i className="fa fa-edit"></i>
                                            </a>
                                            <button
                                                data-id={item.id}
                                                className="btn btn-danger btn-sm dels"
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
    const hendlOnEdit = (data) => {
        console.log(data);
    };
    return (
        <div className="row mt-3">
            <div className="col-md-6">
                <Input />
            </div>
            <div className="col-md-6">
                {getData.length > 0 ? (
                    render ? (
                        <TbJquery data={getData} onEdit={hendlOnEdit} />
                    ) : (
                        ""
                    )
                ) : (
                    ""
                )}

                {/* <TbJquery data={}/> */}
            </div>
        </div>
    );
};
