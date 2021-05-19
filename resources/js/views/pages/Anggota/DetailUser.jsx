import React, { useState, useEffect, useCallback } from "react";
import ECard from "../../../components/Card/Ecard";
import { base_url } from "../../../constant/constant";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../../../components/LoadingPage/Loading";
const JsBarcode = require("jsbarcode");
export default function DetailUser(props) {
    const history = useHistory();
    const handleRoute = useCallback(() => history.push("/Anggota"), [history]);
    const location = useLocation();
    const getLocationParams = () => {
        const url = location.pathname.substr(1).split("/");
        return url;
    };
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        setLoading(true);
        getDataUser(getLocationParams()[1]);
    }, []);
    const getDataUser = async (us) => {
        const get = await axios.get(base_url + "api/getDataAnggotaById/" + us);
        setData(get.data);
        setInterval(() => {
            setLoading(false);
        }, 1000);
    };
    const loadingPage = () => {
        return (
            <>
             <div
                style={{
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                }}
            ><Loading/></div>
            </>
        );
    };
    const render = () => {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-lg-6 mb-3">
                    <ECard
                        title={
                            <button
                                className="btn btn-secondary btn-sm mb-1"
                                onClick={handleRoute}
                            >
                                <i className="las la-arrow-alt-circle-left"></i>
                            </button>
                        }
                    >
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
                                />
                                <strong>{data.name}</strong>
                                <strong>{data.kode_anggota}</strong>
                            </div>
                            <div className="mt-2">
                                <div style={styleReference}>
                                    <strong>Jenis Klamin</strong>
                                    <p style={{ marginBottom: 0 }}>
                                        {data.jenis_klamin}
                                    </p>
                                </div>
                                <hr />
                                <div style={styleReference}>
                                    <strong>Tempat Tanggal Lahir</strong>
                                    <p style={{ marginBottom: 0 }}>
                                        {data.tempat_lahir +
                                            " " +
                                            data.tanggal_lahir}
                                    </p>
                                </div>
                                <hr />
                                <div style={styleReference}>
                                    <strong>No Telepon</strong>
                                    <p style={{ marginBottom: 0 }}>
                                        {data.tlp}
                                    </p>
                                </div>
                                <hr />
                                <div style={styleReference}>
                                    <strong>Alamat</strong>
                                    <p style={{ marginBottom: 0 }}>
                                        {data.alamat}
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
            </div>
        );
    };

    return loading ? loadingPage() : render();
}

const styleReference = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
};
