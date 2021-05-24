import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { ECard } from "../../../components/Card/Card";
import { base_url } from "../../../constant/constant";
import { NavLink } from "react-router-dom";
const JsBarcode = require("jsbarcode");
import Swal from "sweetalert2";
export default function Output(props) {
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(2);
    const [pageCount, setPageCount] = useState(0);

    const [lay, setLay] = useState("col-lg-12");

    useEffect(() => {
        setLay(props.classItem);
        resultData();
        setLoading(true);
    }, [props.classItem, lay, offset]);
    const hndelDeletes = (id) => {
        const hndelDel = async (kode_anggota) => {
            const del = await axios
                .get(base_url + "api/deleteAnggota/" + kode_anggota)
                .catch((e) => {
                    console.log(e);
                });
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
        const is = id;
        Swal.fire({
            text: "Yakin Akan Menghapus Data?",
            showCancelButton: true,
            confirmButtonText: `Ya`,
        }).then((result) => {
            if (result.isConfirmed) {
                hndelDel(is);
            }
        });
    };
    const resultData = async () => {
        const getData = await axios.get(`${base_url}api/getDataAnggota`);
        const data = getData.data;
        const slice = data.slice(offset, offset + perPage);
        // JsBarcode("#barcode", number, {
        //     text: number.match(/.{1,4}/g).join("  "),
        //     width: 2,
        //     height: 50,
        //     fontSize: 15,
        // });
        const postData = slice.map((item, i) => (
            <div className={`${lay} mb-2`} key={i}>
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
                                src={`${base_url}img/User/${item.foto}`}
                                width="100px"
                                height="100px"
                            />
                            <strong>{item.name}</strong>
                            <strong>{item.kode_anggota}</strong>
                            {/* <strong>{lay}</strong> */}
                            <div
                                className="card w-100 p-1"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <NavLink
                                    to={`/detailAnggota/${item.kode_anggota}`}
                                    className="btn btn-info btn-sm mr-1"
                                >
                                    <i className="las la-eye"></i>
                                </NavLink>
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={(e) => {
                                        props.edit(item);
                                    }}
                                >
                                    <i className="las la-edit"></i>
                                </button>
                                <button
                                    className="btn btn-danger btn-sm ml-1"
                                    onClick={(e) => {
                                        hndelDeletes(item.kode_anggota);
                                    }}
                                >
                                    <i className="las la-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </ECard>
            </div>
        ));
        setData(postData);
        setPageCount(Math.ceil(data.length / perPage));
        setLoading(false);
        console.log(offset);
    };
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1);
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
                    <h6>Anggota</h6>
                    <div className="search-area">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                        />
                    </div>
                </div>
            }
        >
            <div className="row">
                {loading ? <p>loading...</p> : data}
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
    );
}
