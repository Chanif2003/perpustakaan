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
export default function Dashboard() {
    return (
        <div className="container">
            <CardBodget />
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
        <div className="row mt-3">
            <div className="col-md-4 mb-1">
                <CardItems>
                    <h2>
                        <strong>{countsBook.Book + " Buku"}</strong>
                    </h2>
                    <small>Jumlah Buku Di Pusataka</small>
                </CardItems>
            </div>
            <div className="col-md-4 mb-1">
                <CardItems>
                    <h2>
                        <strong>{countsBook.Member} Orang</strong>
                    </h2>
                    <small>Jumlah member Pustaka</small>
                </CardItems>
            </div>
            <div className="col-md-4 mb-1">
                <CardItems>
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
    return <ECard title="Data Kunjungan"></ECard>;
};



const DataPeminjamanBuku = () => {
    return <ECard title="Data Peminjam Buku"></ECard>;
};
