import axios from "axios";
import React, { useEffect, useState } from "react";
import { ECard, CardItems } from "../../../components/Card/Card";
import { base_url } from "../../../constant/constant";
import Swal from "sweetalert2";
import LineChart from "../../../components/Chart/LineChart";
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
export default function Dashboard() {
    return (
        <div className="container">
            <CardBodget />
            {/* <div className="row">
                <div className="col-md-6">
                    <DataKunjungan />
                </div>
                <div className="col-md-6">
                    <DataPeminjamanBuku />
                </div>
            </div> */}
            <div className="row">
                <div className="col-md-12">
                    <DataKunjungan />
                </div>
            </div>
        </div>
    );
}

const CardBodget = () => {
    const [countsBook, setCountsBook] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        countBook();
    }, []);
    const countBook = async () => {
        const getCounts = await axios
            .get(base_url + "api/getCouts")
            .catch(() => {});

        setCountsBook(getCounts.data);
    };
    return (
        <div className="row mt-3 mb-3">
            <div className="col-md-4 mb-1">
                <CardItems className="primary-msg">
                    <h2>
                        <strong>{countsBook.Book + " Buku"}</strong>
                    </h2>
                    <small>Jumlah Buku Di Pusataka</small>
                </CardItems>
            </div>
            <div className="col-md-4 mb-1">
                <CardItems className="warning-msg">
                    <h2>
                        <strong>{countsBook.Member} Orang</strong>
                    </h2>
                    <small>Jumlah member Pustaka</small>
                </CardItems>
            </div>
            <div className="col-md-4 mb-1">
                <CardItems className="danger-msg">
                    <h2>
                        <strong>{countsBook.Pinjaman} Orang</strong>
                    </h2>
                    <small>Jumlah Peminjam Aktif</small>
                </CardItems>
            </div>
        </div>
    );
};
const DataKunjungan = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getData("");
    }, []);
    const getData = async (search) => {
        const get = await axios
            .get(base_url + "api/dashboardResult/kunjungan/" + search)
            .catch((e) => {
                console.log(e);
            });
        setData(get.data);
    };
    const hndelOnChnge = (e) => {
        getData(e.target.value);
    };
    return (
        <ECard title="Data Kunjungan">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="search year"
                    onChange={hndelOnChnge}
                />
            </div>
            <LineChart label={data.month} value={data.counth} />
        </ECard>
    );
};

const DataPeminjamanBuku = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getData("");
    }, []);
    const getData = async (search) => {
        const get = await axios
            .get(base_url + "api/dashboardResult/kunjungan/" + search)
            .catch((e) => {
                console.log(e);
            });
        setData(get.data);
    };
    const hndelOnChnge = (e) => {
        getData(e.target.value);
    };
    return (
        <ECard title="Data Kunjungan">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="search year"
                    onChange={hndelOnChnge}
                />
            </div>
            <LineChart label={data.month} value={data.counth} />
        </ECard>
    );
};
