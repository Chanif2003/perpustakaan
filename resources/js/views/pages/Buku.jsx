import React, { useState, useEffect } from "react";
import { ECard } from "../../components/Card/Card";
import CircleButton from "../../components/Button/CircleButton";
import $ from "jquery";
const baseUrl = require("../../constant/constant").base_url;
const JsBarcode = require("jsbarcode");
export default function componentName() {
    const [kode, setKode] = useState(null);
    const [case_action, setCaseAction] = useState("save");
    const hendltoggel = () => {
        $(".inp").hide();
        $(".tbl").removeClass("col-lg-6");
        $(".tbl").addClass("col-lg-12");
    };
    const hendlInp = () => {
        $(".inp").show();
        $(".tbl").addClass("col-lg-6");
        $(".tbl").removeClass("col-lg-12");
    };
    const CreateBarcode = () => {
        return (
            <svg
                id="barcode"
                jsbarcode-format="upc"
                jsbarcode-value="123456789012"
                jsbarcode-textmargin="0"
                jsbarcode-fontoptions="bold"
            ></svg>
        );
    };
    useEffect(
        () => {
            JsBarcode("#barcode").init();
            $(".modal-barcode").hide();
            if (kode == null || kode == "") {
                $(".form-data-input").hide();
            } else {
                $(".form-data-input").show();
            }
            console.log(baseUrl);
        },
        [kode],
        []
    );
    const hendelBarcode = () => {
        // $(".code-barcode").attr("enabled", true);
        $(".modal-barcode").show();
        console.log(Math.floor(Math.random() * (0 - 10 + 1)) + 0);
    };

    const formSubmit = (event) => {
        event.preventDefault();
        const form_data = new FormData(event.target);
        form_data.append("case", case_action);
        pushBackend(form_data);
    };
    const pushBackend = async (data) => {
        const pushData = await axios.post(baseUrl + "api/ActionDataBuku", data);
        console.log(pushData);
    };
    return (
        <div className="row">
            <div className="col-lg-12 mb-3">
                <button className="btn btn-primary btn-sm" onClick={hendlInp}>
                    Input Buku
                </button>
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
                            <div className="col-md-6">
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
                                        }}
                                        aria-describedby="emailHelp"
                                        name="kode_buku"
                                    />
                                </div>
                            </div>
                            <div
                                className="col-md-6"
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
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={hendelBarcode}
                                    >
                                        Buat Barcode
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-info btn-sm ml-1 modal-barcode"
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                    >
                                        Barcode
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
                                <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    name="tahun_terbit"
                                />
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input
                                    type="file"
                                    className="form-control form-control-sm"
                                    name="image"
                                />
                            </div>
                            <div className="form-group text-right">
                                <button className="btn btn-primary btn-sm">
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </form>
                </ECard>
            </div>
            <div className="col-lg-6 mb-1 tbl">
                <ECard></ECard>
            </div>
            <Modal />
        </div>
    );
}

const Tables = () => {};

const Modal = () => {
    return (
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
                        className="modal-body"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <svg
                            id="barcode"
                            jsbarcode-format="upc"
                            jsbarcode-value="123456789012"
                            jsbarcode-textmargin="0"
                            jsbarcode-fontoptions="bold"
                        ></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
