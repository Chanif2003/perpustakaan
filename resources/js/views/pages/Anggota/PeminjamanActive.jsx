import axios from "axios";
import React, { useState, useEffect } from "react";
import { base_url } from "../../../constant/constant";
import moment from "moment";
import CircleButton from "../../../components/Button/CircleButton";
import Loading from "../../../components/LoadingPage/Loading";
export default function PeminjamanActive(props) {
    const [userKode, setUserKode] = useState([]);
    const [loadResult, setLoadResult] = useState(false);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (props.userKode != null) {
            setUserKode(props.userKode);
            getData(props.userKode);
        }
    }, [props.userKode, userKode]);
    const getData = async (kode) => {
        const get = await axios.get(
            base_url + "api/getDataPeminjamanBuku/" + kode
        );
        setResult(get.data);
        setLoading(false);
        setLoadResult(true);
    };
    const TdItem = (props) => {
        return (
            <tr>
                <td
                    style={{
                        width: "30%",
                    }}
                >
                    {props.KeyData}
                </td>
                <td
                    style={{
                        width: "1%",
                    }}
                >
                    :
                </td>
                <td
                    style={{
                        width: "70%",
                    }}
                >
                    {props.value}
                </td>
            </tr>
        );
    };
    const loadingpage = () => {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <Loading />
            </div>
        );
    };
    return loading ? (
        loadingpage()
    ) : (
        <div>
            <table
                className="w-100"
                style={{
                    fontSize: 12,
                    fontFamily: "arial",
                }}
            >
                <thead>
                    <TdItem
                        KeyData="Kode Pinjam"
                        value={
                            <span className="badge badge-info ml-1">
                                {loadResult &&
                                    result.peminjaman.kode_peminjaman}
                            </span>
                        }
                    />
                    <TdItem
                        KeyData="Tanggal Pinjam"
                        value={
                            <span className="badge badge-info ml-1">
                                {loadResult && result.peminjaman.tanggal_pinjam}
                            </span>
                        }
                    />
                    <TdItem
                        KeyData="Lama Pinjam"
                        value={
                            <span className="badge badge-info ml-1">
                                {loadResult && result.peminjaman.lama_pinjam}
                            </span>
                        }
                    />
                    <TdItem
                        KeyData="Keterangan"
                        value={
                            <span className="badge badge-info ml-1">
                                {loadResult && result.peminjaman.detail}
                            </span>
                        }
                    />
                    <TdItem
                        KeyData="Status"
                        value={
                            <span className="badge badge-warning ml-1">
                                {loadResult && result.peminjaman.statusPeminjaman}
                            </span>
                        }
                    />
                </thead>
            </table>
            <hr />
            <table
                className="table"
                style={{
                    fontSize: 10,
                }}
            >
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Judul buku</th>
                        <th>Kategori</th>
                        <th>Pengarang</th>
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {loadResult &&
                        result.troli.map((items, i) => {
                            let io = i + 1;
                            return (
                                <tr key={i}>
                                    <td>{io}</td>
                                    <td>{items.judul_buku}</td>
                                    <td>{items.Kategori}</td>
                                    <td>{items.pengarang}</td>
                                    {/* <td>
                                        <CircleButton
                                            className="btn btn-danger btn-sm mb-1"
                                            onClick={() => {

                                            }}
                                        >
                                            <i className="fa fa-trash" />
                                        </CircleButton>
                                    </td> */}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
