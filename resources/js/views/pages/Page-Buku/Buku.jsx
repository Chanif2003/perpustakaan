import React, { useState, useEffect } from "react";
import { ECard } from "../../../components/Card/Card";
import CircleButton from "../../../components/Button/CircleButton";
import $ from "jquery";
import axios from "axios";
import DataBuku from "./DataBuku";
const baseUrl = require("../../../constant/constant").base_url;
const JsBarcode = require("jsbarcode");
import Swal from "sweetalert2";
import moment from "moment";
import { genDelete } from "../../../Helpers/Axios-gen";
import {
    Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory,
    useLocation,
} from "react-router-dom";
import ReactPaginate from "react-paginate";
import ScannerComponent from "./ScannerComponent";
export default function componentName() {
    const [kode, setKode] = useState(null);
    const [case_action, setCaseAction] = useState("save");
    const [statusKode, setstatusKode] = useState(null);
    const [listdata, setListdata] = useState([]);
    const [widthCek, setCekWIdth] = useState(500);
    const [upKodeBuku, setUpKodeBuku] = useState(null);

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(2);
    const [pageCount, setPageCount] = useState(0);
    const [useScann, setScann] = useState(0);

    const [formSearch, setFormSearch] = useState(false);
    const [search, setSearch] = useState(null);
    const hendltoggel = () => {
        $(".inp").hide();
        $(".tbl").removeClass("col-lg-6");
        $(".tbl").addClass("col-lg-12");
        $(".el__").removeClass("col-md-12");
        $(".el__").addClass("col-md-6");
    };
    const hendlInp = () => {
        $(".inp").show();
        $(".tbl").addClass("col-lg-6");
        $(".tbl").removeClass("col-lg-12");
        $(".el__").addClass("col-md-12");
    };

    const hendelBarcode = () => {
        const _rand = randNum(13);
        // $("#kode").attr("readonly", true);
        cek(_rand);
    };

    const cek = async (_rand) => {
        const get = await axios.get(baseUrl + "api/cek_kode/" + _rand);
        if (get.data == 0) {
            // $("#kode").val(_rand);
            setKode(_rand);
        } else {
            setstatusKode(null);
            // $("#kode").val(null);
            hendelBarcode();
        }
    };
    const randNum = (length) => {
        return Math.floor(
            Math.pow(10, length - 1) +
                Math.random() * 9 * Math.pow(10, length - 1)
        );
    };
    const formSubmit = (event) => {
        event.preventDefault();
        const form_data = new FormData(event.target);
        form_data.append("case", case_action);
        if (case_action == "update") {
            form_data.append("kode_buku", upKodeBuku);
        }
        pushBackend(form_data);
        // for (var pair of form_data.entries()) {
        //     console.log(pair[0] + ", " + pair[1]);
        // }
    };
    const pushBackend = async (data) => {
        const pushData = await axios.post(baseUrl + "api/ActionDataBuku", data);
        if (pushData.data.status == 200) {
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

    const getListData = async () => {
        const params = search != null ? "/" + search : "";
        const get = await axios.get(baseUrl + "api/getdataBuku" + params);
        setListdata(get.data);

        // ///////////////////////////////////////////////
        const data = get.data;
        const slice = data.slice(offset, offset + perPage);
        const postData = slice.map((item, i) => (
            <div className="el__ col-md-6" key={i}>
                <DataBuku
                    onView={
                        <NavLink
                            to={`/detailBuku/${item.kode_buku}`}
                            className="btn btn-info btn-sm mr-1"
                        >
                            <i className="las la-eye"></i>
                        </NavLink>
                    }
                    onDel={() => {
                        hendlDelete(item.kode_buku);
                    }}
                    onEdit={() => {
                        const data = item;
                        hendlonEdit(data);
                    }}
                    className="mb-2"
                    image={baseUrl + "img/Buku/" + item.image}
                    title={item.judul_buku}
                    Kategori={item.Kategori}
                />
            </div>
        ));
        setData(postData);
        setPageCount(Math.ceil(data.length / perPage));
    };
    const hendlonEdit = (data) => {
        hendlInp();
        setKode(data.kode_buku);
        setUpKodeBuku(data.kode_buku);
        $("#kode").val(data.kode_buku);
        $("[name='judul_buku']").val(data.judul_buku);
        $("[name='Kategori']").val(data.Kategori);
        $("[name='penerbit']").val(data.penerbit);
        $("[name='pengarang']").val(data.pengarang);
        $("[name='stok']").val(data.stok);
        $("[name='jumlah_halaman']").val(data.jumlah_halaman);
        $("[name='tahun_terbit']").val(data.tahun_terbit);
        $(".simpan")
            .removeClass("btn-primary")
            .addClass("btn-success")
            .text("edit");
        setCaseAction("update");
    };
    const getYear = () => {
        const now = moment().year();
        var indents = [];
        for (let i = now; i >= 1995; i--) {
            indents.push(i);
        }
        return indents;
    };
    const hendlDelete = (kode) => {
        genDelete(
            "api/ActionDataBuku",
            { kode_buku: kode, case: "delete" },
            (res) => {
                if (res.data.status == 200) {
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
            }
        );
    };

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1);
    };

    // use Efect
    useEffect(() => {
        getListData();
        JsBarcode("#barcode").init();
    }, [offset]);
    useEffect(() => {
        $(".modal-barcode").hide();
        if (kode == null || kode == "") {
            $(".form-data-input").hide();
        } else {
            $(".form-data-input").show();
        }
    }, [kode]);
    useEffect(() => {
        $(".inp").hide();
    }, []);
    useEffect(() => {
        getListData();
    }, [search]);
    // ////////////////////////////////

    const getValScann = (data) => {
        if (formSearch) {
            setSearch(data);
            $("#search").val(data);
        } else {
            setKode(data);
            $("#kode").attr("readonly", true);
            $(".genBar").attr("disabled", true);
            hendlInp();
        }
    };

    return (
        <div className="row">
            <div
                className="col-lg-12 mb-3"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <button className="btn btn-primary btn-sm" onClick={hendlInp}>
                    Input Buku
                </button>

                {formSearch ? (
                    <div
                        className="search-area"
                        style={{
                            display: "flex",
                        }}
                    >
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="search"
                            id="search"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <CircleButton
                            className="btn btn-info btn-sm mb-1 btn-close-search"
                            onClick={() => {
                                setFormSearch(false);
                                setSearch(null);
                            }}
                        >
                            x
                        </CircleButton>
                    </div>
                ) : (
                    <CircleButton
                        className="btn btn-info btn-sm mb-1"
                        onClick={() => {
                            setFormSearch(true);
                        }}
                    >
                        <i className="fa fa-search" />
                    </CircleButton>
                )}
            </div>
            <div className="col-lg-6 mb-1 inp">
                <ECard
                    title={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <h6>Form Iput Buku</h6>
                            <CircleButton
                                className="btn btn-danger btn-sm mb-1"
                                onClick={hendltoggel}
                            >
                                x
                            </CircleButton>
                        </div>
                    }
                >
                    <form id="forms" onSubmit={formSubmit}>
                        <div className="row">
                            <div className="col-md-8 mb-2">
                                <div
                                    className="form-group"
                                    style={{
                                        marginBottom: 0,
                                    }}
                                >
                                    <label htmlFor="exampleInputEmail1">
                                        Input Barcode
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control code-barcode"
                                        id="kode"
                                        onChange={(e) => {
                                            setKode(e.target.value);
                                            if (e.target.value == "") {
                                                $(".btn-sm").attr(
                                                    "disabled",
                                                    false
                                                );
                                            }
                                        }}
                                        value={kode}
                                        aria-describedby="emailHelp"
                                        name="kode_buku"
                                    />
                                    <ScannerComponent values={getValScann} />
                                </div>
                            </div>
                            <div
                                className="col-md-4"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "flex-end",
                                    // marginBottom: "1rem",
                                }}
                            >
                                <div className="barcodes">
                                    {/* <CreateBarcode /> */}
                                    <button
                                        onClick={() => {
                                            window.location.reload();
                                        }}
                                        className="btn btn-secondary btn-sm mr-1"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm genBar"
                                        onClick={hendelBarcode}
                                    >
                                        Buat Barcode
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-data-input">
                            <hr />
                            <div className="form-group">
                                <label>Judul Buku</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name="judul_buku"
                                />
                            </div>
                            <div className="form-group">
                                <label>Kategori</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name="Kategori"
                                />
                            </div>
                            <div className="form-group">
                                <label>Penerbit</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name="penerbit"
                                />
                            </div>
                            <div className="form-group">
                                <label>Pengarang</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name="pengarang"
                                />
                            </div>
                            <div className="form-group">
                                <label>Jumlah Halaman</label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    name="jumlah_halaman"
                                />
                            </div>
                            <div className="form-group">
                                <label>Stok</label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    name="stok"
                                />
                            </div>
                            <div className="form-group">
                                <label>Tahun Terbit</label>
                                <select
                                    className="form-control form-control-sm"
                                    id="exampleFormControlSelect1"
                                    name="tahun_terbit"
                                >
                                    {getYear().map((it, i) => (
                                        <option key={i}>{it}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input
                                    type="file"
                                    className="form-control form-control-sm"
                                    name="image"
                                />
                            </div>
                            <div className="form-group">
                                <label>Keterangan Singkat Buku</label>
                                <textarea
                                    className="form-control"
                                    name="deskripsi"
                                    rows="3"
                                ></textarea>
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
                        </div>
                    </form>
                </ECard>
            </div>

            <div className="col-lg-12 mb-1 tbl">
                <ECard>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="mb-2">
                        {" "}
                        <strong>
                            <i className="fa fa-user"></i>Semua Kategori
                        </strong>
                    </div>

                    <div className="row">
                        {data}
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                </ECard>
            </div>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{
                    zIndex: 9999999,
                }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div
                            className="modal-header"
                            style={{
                                padding: 5,
                            }}
                        >
                            <h5
                                className="modal-title"
                                id="exampleModalLabel"
                                style={{
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                Barcode
                            </h5>
                            <div>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div
                            className="modal-body barch"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
