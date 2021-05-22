import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { ECard, ECartTable } from "../../../../components/Card/Card";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import HistoryPeminjaman from "./HistoryPeminjaman";
import axios from "axios";
import PeminjamanActive from "./PeminjamanActive";
function Profile(props) {
    const history = useHistory();
    const handleRoute = useCallback(() => history.push("/Anggota"), [history]);
    const [base_url] = useState(webUrl);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState([]);
    const [config, setConfig] = useState({});
    const [peminjaman, setPeminjaman] = useState([]);
    useEffect(() => {
        Member();
    }, []);
    const Member = async () => {
        const get = await axios.get(
            base_url + "api/getDataAnggotaByUserId/" + props.reduxAuth.id
        );
        setData(get.data);
        setLoading(false);
    };
    useEffect(() => {
        if ([data].length > 0) {
            hendelpeminjaman(data.kode_anggota);
        }
    }, [data]);
    const hendelpeminjaman = async (userKode) => {
        const get = await axios.get(
            base_url + "api/getAllPeminjaman/" + userKode
        );
        setPeminjaman(get.data);
    };
    const hendlImageChange = () => {
        $("[name='imgs']").click();
        setLoading(true);
    };
    const hndelImageChange = (evn) => {
        const form_data = new FormData();
        form_data.append("userId", props.reduxAuth.id);
        form_data.append("case", "foto");
        form_data.append("table", "anggota");
        form_data.append("img", evn.target.files[0]);
        const run = async (data) => {
            const push = await axios.post(
                webUrl + "api/ProfileChange",
                form_data
            );
            Member();
            setLoading(false);
        };
        run(form_data);
    };
    const hendlEdit = (event) => {
        event.preventDefault();
        const form_data = new FormData(event.target);
        form_data.append("userId", props.reduxAuth.id);
        form_data.append("case", config.case);
        form_data.append("table", config.table);
        setLoading(true);
        const run = async (data) => {
            const push = await axios.post(webUrl + "api/ProfileChange", data);
            setLoading(false);
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
                    text: push.data.msg,
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        };
        run(form_data);
    };
    return (
        <div className="container">
            <div className="row">
                <div
                    className="col-lg-6 mb-3"
                    style={{
                        fontSize: 12,
                    }}
                >
                    <ECard>
                        <div className="container">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}
                            >
                                <img
                                    src={`${base_url}img/User/${data.foto}`}
                                    width="100px"
                                    height="100px"
                                    style={{
                                        borderRadius: "100%",
                                    }}
                                />
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={hendlImageChange}
                                    style={{
                                        position: "relative",
                                        top: -100,
                                        right: -30,
                                    }}
                                >
                                    <i className="fa fa-edit"></i>
                                </button>
                                <strong>
                                    {data.name}{" "}
                                    <button
                                        className="btn btn-success btn-sm"
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                        onClick={() => {
                                            setConfig({
                                                case: "name",
                                                table: "anggota",
                                            });
                                            setEdit({
                                                title: "upadate nama",
                                                component: (
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        name="name"
                                                        defaultValue={
                                                            props.reduxAuth.name
                                                        }
                                                    />
                                                ),
                                            });
                                        }}
                                    >
                                        <i className="fa fa-edit"></i>
                                    </button>
                                </strong>
                                <strong>{data.kode_anggota}</strong>
                                <input
                                    type="file"
                                    name="imgs"
                                    className="d-none"
                                    onChange={hndelImageChange}
                                />
                            </div>
                            <div className="mt-2">
                                <div style={styleReference}>
                                    <strong>Jenis Klamin</strong>
                                    <p style={{ marginBottom: 0 }}>
                                        {data.jenis_klamin}{" "}
                                        <button
                                            className="btn btn-success btn-sm"
                                            data-toggle="modal"
                                            data-target="#exampleModal"
                                            onClick={() => {
                                                setConfig({
                                                    case: "jenis_klamin",
                                                    table: "anggota",
                                                });
                                                setEdit({
                                                    title: "upadate Jenis Klamin",
                                                    component: (
                                                        <select
                                                            name="jenis_klamin"
                                                            className="form-control form-control-sm"
                                                        >
                                                            <option>
                                                                Laki-Laki
                                                            </option>
                                                            <option>
                                                                Perempuan
                                                            </option>
                                                        </select>
                                                    ),
                                                });
                                            }}
                                        >
                                            <i className="fa fa-edit"></i>
                                        </button>
                                    </p>
                                </div>
                                <hr />
                                <div style={styleReference}>
                                    <strong>Tempat Tanggal Lahir</strong>
                                    <p style={{ marginBottom: 0 }}>
                                        {data.tempat_lahir +
                                            " " +
                                            data.tanggal_lahir}{" "}
                                        <button
                                            className="btn btn-success btn-sm"
                                            data-toggle="modal"
                                            data-target="#exampleModal"
                                            onClick={() => {
                                                setConfig({
                                                    case: "tanggal lahir",
                                                    table: "anggota",
                                                });
                                                setEdit({
                                                    title: "upadate tempat tanggal Lahir",
                                                    component: (
                                                        <>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-1"
                                                                name="tempat_lahir"
                                                                placeholder="Tempat lahir"
                                                                defaultValue={
                                                                    data.tempat_lahir
                                                                }
                                                            />
                                                            <input
                                                                type="date"
                                                                className="form-control form-control-sm"
                                                                name="tanggal_lahir"
                                                                placeholder="Tanggal Lahir"
                                                                defaultValue={
                                                                    data.tanggal_lahir
                                                                }
                                                            />
                                                        </>
                                                    ),
                                                });
                                            }}
                                        >
                                            <i className="fa fa-edit"></i>
                                        </button>
                                    </p>
                                </div>
                                <hr />
                                <div style={styleReference}>
                                    <strong>No Telepon</strong>
                                    <p style={{ marginBottom: 0 }}>
                                        {data.tlp}{" "}
                                        <button
                                            className="btn btn-success btn-sm"
                                            data-toggle="modal"
                                            data-target="#exampleModal"
                                            onClick={() => {
                                                setConfig({
                                                    case: "tlp",
                                                    table: "anggota",
                                                });
                                                setEdit({
                                                    title: "Upadate Nomor Telepeon",
                                                    component: (
                                                        <>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-1"
                                                                name="tlp"
                                                                placeholder="Nomor telepon"
                                                                defaultValue={
                                                                    data.tlp
                                                                }
                                                            />
                                                        </>
                                                    ),
                                                });
                                            }}
                                        >
                                            <i className="fa fa-edit"></i>
                                        </button>
                                    </p>
                                </div>
                                <hr />
                                <div style={styleReference}>
                                    <strong>Alamat</strong>
                                    <p style={{ marginBottom: 0 }}>
                                        {data.alamat}{" "}
                                        <button
                                            className="btn btn-success btn-sm"
                                            data-toggle="modal"
                                            data-target="#exampleModal"
                                            onClick={() => {
                                                setConfig({
                                                    case: "alamat",
                                                    table: "anggota",
                                                });
                                                setEdit({
                                                    title: "upadate Alamat",
                                                    component: (
                                                        <>
                                                            <textarea
                                                                className="form-control form-control-sm mb-1"
                                                                name="alamat"
                                                                placeholder="Alamat"
                                                            >
                                                                {data.alamat}
                                                            </textarea>
                                                        </>
                                                    ),
                                                });
                                            }}
                                        >
                                            <i className="fa fa-edit"></i>
                                        </button>
                                    </p>
                                </div>
                                <hr />
                                <div style={styleReference}>
                                    <strong>Thun Masuk</strong>
                                    <p style={{ marginBottom: 0 }}>
                                        {data.tahun_masuk}
                                    </p>
                                </div>
                                <hr />
                                <div style={styleReference}>
                                    <strong>Jadi Anggota Pada Tanggal</strong>
                                    <p style={{ marginBottom: 0 }}>
                                        {data.created_at}
                                    </p>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </ECard>
                </div>
                <div className="col-lg-6">
                    <ECard title="Akun" className="mb-2">
                        <div style={styleReference}>
                            <strong>Emal</strong>
                            <p style={{ marginBottom: 0 }}>
                                {data.email}{" "}
                                <button
                                    className="btn btn-success btn-sm"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={() => {
                                        setConfig({
                                            case: "email",
                                            table: "user",
                                        });
                                        setEdit({
                                            title: "upadate email",
                                            component: (
                                                <input
                                                    type="email"
                                                    className="form-control form-control-sm"
                                                    name="email"
                                                    defaultValue={
                                                        props.reduxAuth.email
                                                    }
                                                />
                                            ),
                                        });
                                    }}
                                >
                                    <i className="fa fa-edit"></i>
                                </button>
                            </p>
                        </div>
                        <div style={styleReference}>
                            <strong>Password</strong>
                            <p style={{ marginBottom: 0 }}>
                                ********{" "}
                                <button
                                    className="btn btn-success btn-sm"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={() => {
                                        setConfig({
                                            case: "password",
                                            table: "user",
                                        });
                                        setEdit({
                                            title: "upadate email",
                                            component: (
                                                <input
                                                    type="password"
                                                    className="form-control form-control-sm"
                                                    name="password"
                                                    placeholder="password baru"
                                                />
                                            ),
                                        });
                                    }}
                                >
                                    <i className="fa fa-edit"></i>
                                </button>
                            </p>
                        </div>
                    </ECard>
                    <ECard
                        className="mb-2"
                        title="Buku yang belum di kembalikan"
                    >
                        <PeminjamanActive userKode={data.kode_anggota} />
                    </ECard>
                    <ECard title="History Peminjaman">
                        {peminjaman.length > 0 &&
                            peminjaman.map((it, i) => (
                                <div
                                    style={{
                                        paddingBottom: 5,
                                        borderBottom: "1px solid #ccc",
                                        marginBottom: 10,
                                    }}
                                >
                                    <ECartTable
                                        title={
                                            <div
                                                className="pb-2"
                                                style={{
                                                    display: "flex",
                                                    // justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <img
                                                    width="30px"
                                                    height="30px"
                                                    src={`${base_url}img/User/${it.foto}`}
                                                />
                                                <h6 className="m-0 ml-1">
                                                    {it.nama}
                                                </h6>
                                            </div>
                                        }
                                    >
                                        <HistoryPeminjaman
                                            key={i}
                                            userKode={it.kode_anggota}
                                            kodePinjam={it.kode_peminjaman}
                                        />
                                    </ECartTable>
                                </div>
                            ))}
                    </ECard>
                </div>
            </div>

            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <ECard title={edit.title}>
                                <form onSubmit={hendlEdit}>
                                    {edit.component}
                                    <hr />
                                    <div className="text-right">
                                        <a
                                            type="button"
                                            class="btn btn-secondary btn-sm mr-1"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </a>
                                        <button
                                            type="submit"
                                            class="btn btn-primary btn-sm"
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </form>
                            </ECard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const styleReference = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
};

const mapRedux = (store) => {
    return {
        reduxAuth: store.autentication,
    };
};
export default connect(mapRedux)(Profile);
