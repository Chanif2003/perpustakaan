import React, { useState, useEffect } from "react";
import { ECard } from "../../../components/Card/Card";
import CircleButton from "../../../components/Button/CircleButton";
import moment from "moment";
import axios from "axios";
import { base_url } from "../../../constant/constant";
import Swal from "sweetalert2";
import $ from "jquery";
const swal = () => {
    Swal.fire({
        title: "Please Wait !",
        html: "Loading....",
        didOpen: () => {
            Swal.showLoading();
        },
    });
};
export default function Input(props) {
    const [cases, setCases] = useState("adm-save");
    const [upData, setUpData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [kode_anggota, setKode_anggota] = useState(null);
    const getYear = () => {
        const now = moment().year();
        var indents = [];
        for (let i = now; i >= 2015; i--) {
            indents.push(i);
        }
        return indents;
    };
    const hendlsubmit = () => {
        event.preventDefault();
        const form_data = new FormData(event.target);
        form_data.append("case", cases);
        if (kode_anggota != null) {
            form_data.append("kode_anggota", kode_anggota);
        }
        // for (var pair of form_data.entries()) {
        //     console.log(pair[0] + ", " + pair[1]);
        // }
        save(form_data);
        swal();
    };
    const save = async (data) => {
        Swal.close();
        const push = await axios.post(base_url + "api/anggota", data);
        console.log(push);
        if (push.data.status == 200) {
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
                text: res.data.msg,
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }
    };
    useEffect(() => {
        if (props.cases == "edit") {
            setValueInput(props.pushValues);
            setCases("update");
        }
    }, [props.cases, props.pushValues, upData]);

    const setValueInput = (dataUps) => {
        let updateData = dataUps;
        setUpData(updateData);
        setKode_anggota(updateData.kode_anggota);
        $("[name='name']").val(updateData.name);
        $("[name='email']").val(updateData.email);
        $("[name='password']").val("********");
        $("[name='jenis_klamin']").val(updateData.jenis_klamin);
        $("[name='tempat_lahir']").val(updateData.tempat_lahir);
        $("[name='tanggal_lahir']").val(updateData.tanggal_lahir);
        $("[name='tlp']").val(updateData.tlp);
        $("[name='alamat']").val(updateData.alamat);
        $("[name='tahun_masuk']").val(updateData.tahun_masuk);
        $(".simpan")
            .removeClass("btn-primary")
            .addClass("btn-success")
            .text("Edit");
    };
    return (
        <ECard
            title={
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <h6>Form Iput Anggota Baru</h6>
                    <CircleButton
                        className="btn btn-secondary btn-sm mb-1"
                        onClick={props.hendltoggelInput}
                    >
                        x
                    </CircleButton>
                </div>
            }
        >
            <form onSubmit={hendlsubmit}>
                <div className="form-group">
                    <label>Nama Lengkap</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        name="name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        name="email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control form-control-sm"
                        name="password"
                        required
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Jenis Klamin</label>
                    <select
                        name="jenis_klamin"
                        className="form-control form-control-sm"
                    >
                        <option>Laki-Laki</option>
                        <option>Perempuan</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Tempat Lahir</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        name="tempat_lahir"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tanggal Lahir</label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        name="tanggal_lahir"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Nomot Telepon</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        name="tlp"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Alamat</label>
                    <textarea
                        className="form-control"
                        name="alamat"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Tahun Masuk</label>
                    <select
                        className="form-control form-control-sm"
                        name="tahun_masuk"
                        required
                    >
                        {getYear().map((it, i) => (
                            <option key={i}>{it}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group text-right">
                    <button
                        onClick={() => {
                            window.location.reload();
                        }}
                        className="btn btn-secondary btn-sm mr-1"
                    >
                        Batal
                    </button>
                    <button className="btn btn-primary btn-sm simpan">
                        Simpan
                    </button>
                </div>
            </form>
        </ECard>
    );
}
