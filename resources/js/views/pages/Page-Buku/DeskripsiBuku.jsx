import React, { useState, useEffect, useCallback } from "react";
import ECard from "../../../components/Card/Ecard";
import axios from "axios";
import { base_url } from "../../../constant/constant";
import Swal from "sweetalert2";
import $ from "jquery";
import "./style.scss";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
var JsBarcode = require("jsbarcode");
const swal = () => {
    Swal.fire({
        title: "Please Wait !",
        html: "Loading....",
        didOpen: () => {
            Swal.showLoading();
        },
    });
};
export default function DeskripsiBuku(props) {
    const history = useHistory();
    const handleRoute = useCallback(() => history.push("/Buku"), [history]);

    const location = useLocation();
    const getLocationParams = () => {
        const url = location.pathname.substr(1).split("/");
        return url;
    };
    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(
        () => {
            reqGetData(getLocationParams()[1]);
            // JsBarcode("#barcode").init();
            if (loading) {
                var number = getData.kode_buku;

                JsBarcode("#barcode", number, {
                    text: number.match(/.{1,4}/g).join("  "),
                    width: 2,
                    height: 50,
                    fontSize: 15,
                });

                var svg = $("#barcode")[0];

                var xml = new XMLSerializer().serializeToString(svg);

                var base64 = "data:image/svg+xml;base64," + btoa(xml);

                // var img = $("#image")[0];
                console.log(base64);
            }
        },
        [loading],
        []
    );

    const reqGetData = async (kodeBuku) => {
        const get = await axios.get(base_url + "api/getDataByKode/" + kodeBuku);
        setData(get.data);
        setLoading(true);
    };

    return (
        <div>
            {loading == true ? (
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
                    {Swal.close()}
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                src={base_url + "img/Buku/" + getData.image}
                                className="w-100"
                            />
                            <hr />
                            <strong>Barcode</strong>
                            <svg
                                color="#000"
                                id="barcode"
                                jsbarcode-format="upc"
                                jsbarcode-value="123456789012"
                                jsbarcode-textmargin="0"
                                jsbarcode-fontoptions="bold"
                            ></svg>
                        </div>
                        <div
                            className="col-md-8"
                            style={{
                                borderLeft: "2px solid orange",
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                            }}
                        >
                            <h5>
                                <strong>{getData.judul_buku}</strong>
                            </h5>
                            <hr />
                            <ECard>
                                <Deskripsi
                                    className="mt-1 mb-1"
                                    keys={<strong>Kategori</strong>}
                                    classKeysProps="pl-1"
                                    value={
                                        <span className="badge badge-dark">
                                            {getData.Kategori}
                                        </span>
                                    }
                                />
                                <Deskripsi
                                    className="mt-1 mb-1"
                                    keys={<strong>Penerbit</strong>}
                                    classKeysProps="pl-1"
                                    value={getData.penerbit}
                                />
                                <Deskripsi
                                    className="mt-1 mb-1"
                                    keys={<strong>Pengarang</strong>}
                                    classKeysProps="pl-1"
                                    value={getData.pengarang}
                                />
                                <Deskripsi
                                    className="mt-1 mb-1"
                                    keys={<strong>Jumlah Halaman</strong>}
                                    classKeysProps="pl-1"
                                    value={getData.jumlah_halaman + ` Halaman`}
                                />
                                <Deskripsi
                                    className="mt-1 mb-1"
                                    keys={<strong>Jumlah Stok</strong>}
                                    classKeysProps="pl-1"
                                    value={getData.stok}
                                />
                                <Deskripsi
                                    className="mt-1 mb-1"
                                    keys={<strong>Tahun Terbit</strong>}
                                    classKeysProps="pl-1"
                                    value={getData.tahun_terbit}
                                />
                            </ECard>
                            <hr />
                            <ECard>
                                <strong>Keterangan Buku</strong>
                                <p>{getData.deskripsi}</p>
                            </ECard>
                        </div>
                    </div>
                </ECard>
            ) : (
                swal()
            )}
        </div>
    );
}

const Deskripsi = (props) => {
    return (
        <table className={`wd-100 ` + props.className}>
            <tr>
                <td className={`wd-30 ` + props.classKeysProps}>
                    {props.keys}
                </td>
                <td className="wd-1">:</td>
                <td className={`wd-60 ` + props.classVal}>{props.value}</td>
            </tr>
        </table>
    );
};
