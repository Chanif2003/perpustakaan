import axios from "axios";
import React, { useEffect, useState } from "react";
import { ECard, ECardMsg } from "../../../components/Card/Card";
import { base_url } from "../../../constant/constant";
import $ from "jquery";
import BarcodeReader from "react-barcode-reader";
import Barcode from "./Barcode";
import CircleButton from "../../../components/Button/CircleButton";
import Swal from "sweetalert2";
import Loading from "../../../components/LoadingPage/Loading";
import PeminjamanActive from "./PeminjamanActive";
export default function PagePeminjaman(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [kode_a, setKode_a] = useState(null);
    const [msg, setMsg] = useState([]);
    const [validate, setValidate] = useState(false);

    const [switPage, setSwitchPage] = useState(0);

    const [createP, setCreateP] = useState({
        tanggal_pinjam: null,
        lama_pinjam: null,
        detail: null,
    });
    const [dataBuku, setDataBuku] = useState([]);

    const [swicingDataChecker, setSwicingDataChecker] = useState({
        status: false,
        msg: "",
    });

    const [switchCase, setSwitchCase] = useState("save");
    const [kodePin, setKodePin] = useState(null);

    const [getStory, setStory] = useState([]);

    useEffect(() => {
        anggota(props.kode_anggota);
        chceckPinjaman(props.kode_anggota);
        setKode_a(props.kode_anggota);
    }, [props.kode_anggota]);

    useEffect(() => {
        $("[name='tanggal_pinjam']").val(createP.tanggal_pinjam);
        $("[name='lama_pinjam']").val(createP.lama_pinjam);
        $("[name='detail']").val(createP.detail);
    }, [createP]);
    useEffect(() => {
        $("[name='tanggal_pinjam']").val(createP.tanggal_pinjam);
        $("[name='lama_pinjam']").val(createP.lama_pinjam);
        $("[name='detail']").val(createP.detail);
    }, [switPage]);
    const loadingPage = () => {
        return (
            <div
                style={{
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Loading />
            </div>
        );
    };

    const anggota = async (kode_anggota) => {
        const get = await axios.get(
            base_url + "api/getDataAnggotaById/" + kode_anggota
        );
        setData(get.data);
    };

    const chceckPinjaman = (kode) => {
        setLoading(true);
        const getCek = async (k) => {
            const get = await axios.get(base_url + "api/checkPinjaman/" + k);
            console.log(get);
            if (get.data > 0) {
                setMsg(
                    <div>
                        <p>Anda talah meminjam buku</p>
                    </div>
                );
                setValidate(false);
            } else {
                setValidate(true);
            }
            setLoading(false);
        };
        getCek(kode);
    };
    const validatefalse = () => {
        return (
            <div>
                <ECard>
                    <ECardMsg className="msg-danger">{msg}</ECardMsg>
                </ECard>
            </div>
        );
    };
    const pagePeminjaman = () => {
        const getBookByKode = async (kode) => {
            const get = await axios.get(
                base_url + "api/getBukuByKodeBuku/" + kode
            );
            if (get.data.count > 0) {
                if (dataBuku.length == 0) {
                    setDataBuku([get.data.result]);
                } else {
                    const objk = [];
                    dataBuku.map((it) => {
                        if (get.data.result.kode_buku != it.kode_buku) {
                            objk.push(it);
                        } else {
                            setSwicingDataChecker({
                                status: true,
                                msg: "buku tlah di scann...!",
                            });
                        }
                    });
                    objk.push(get.data.result);

                    setDataBuku(objk);
                }
                setSwicingDataChecker({
                    status: false,
                    msg: "",
                });
            } else {
                setSwicingDataChecker({
                    status: true,
                    msg: "buku blum di entry ...!",
                });
            }

            // console.log(get.data.count);
        };
        const hendlNext = (event) => {
            setSwitchPage(1);
            event.preventDefault();
            const form_data = new FormData(event.target);
            var obj = {};
            for (var pair of form_data.entries()) {
                obj[pair[0]] = pair[1];
            }
            setCreateP(obj);
        };
        const hendlTroli = (e) => {
            getBookByKode(e.target.value);
        };
        const FormCreate = () => {
            $("[name='tanggal_pinjam']").val(
                createP.tanggal_pinjam != null ? createP.tanggal_pinjam : ""
            );
            return (
                <ECard title="Form Peminjaman Baru">
                    <form onSubmit={hendlNext}>
                        <div className="form-group">
                            <label>Tanggal Pinjam</label>
                            <input
                                type="date"
                                name="tanggal_pinjam"
                                className="form-control from-control-sm"
                            />
                        </div>
                        <div className="form-group">
                            <label>Lama Pinjam</label>
                            <select
                                name="lama_pinjam"
                                className="form-control from-control-sm"
                            >
                                <option value="1">1 Hari</option>
                                <option value="2">2 Hari</option>
                                <option value="3">3 Hari</option>
                                <option value="4">4 Hari</option>
                                <option value="5">5 Hari</option>
                                <option value="6">6 Hari</option>
                                <option value="7">7 Hari</option>
                                <option value="8">8 Hari</option>
                                <option value="9">9 Hari</option>
                                <option value="10">10 Hari</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ket">Keterangan</label>
                            <textarea
                                id="ket"
                                className="form-control"
                                name="detail"
                                rows="2"
                            ></textarea>
                        </div>
                        <div className="form-group text-right">
                            <button className="btn btn-primary btn-sm">
                                Next
                            </button>
                        </div>
                    </form>
                </ECard>
            );
        };

        const handleScan = (data) => {
            $("#kodeBarcode").val(data);
            getBookByKode(data);
        };
        const handleError = (err) => {
            console.error(err);
        };
        // simpan//
        const hendlUpSave = () => {
            let dataResult = {
                pinjaman: createP,
                troli_pinjaman: dataBuku,
                member: data,
                case: switchCase,
            };
            if (kodePin != null) {
                dataResult = { ...dataResult, kode_peminjaman: kodePin };
            }

            const push = async (_data) => {
                const pushData = await axios.post(
                    base_url + "api/pushPeminjamanBuku",
                    _data
                );
                // console.log(pushData);
                if (pushData.data.status == 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Good Job",
                        text: "Berhasil",
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            anggota(kode_a);
                            chceckPinjaman(kode_a);
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
                            anggota(kode_a);
                            chceckPinjaman(kode_a);
                        }
                    });
                }
            };
            push(dataResult);
        };
        // ------
        const hendlRemoveItem = (data, index) => {
            const dataState = [...dataBuku];
            // console.log(dataState);
            dataState.splice(index, 1);
            setDataBuku(dataState);
        };
        const FormAddBook = () => {
            return (
                <ECard title="Form Peminjaman Baru">
                    {/* <button
                        onClick={() => {
                            console.log(dataBuku);
                        }}
                    >
                        ok
                    </button> */}
                    <div className="form-group">
                        <span
                            style={{
                                fontSize: 9,
                                color: "green",
                            }}
                        >
                            <i>
                                jika kode isbn tidak tersedia di database
                                silahkan entry buku dulu
                            </i>
                        </span>
                        <input
                            id="kodeBarcode"
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="input / scann barcode buku"
                            onChange={hendlTroli}
                        />
                        {/* <Barcode /> */}
                        <BarcodeReader
                            onError={handleError}
                            onScan={handleScan}
                        />
                        {swicingDataChecker.status && (
                            <ECardMsg className="mt-2">
                                {swicingDataChecker.msg}
                            </ECardMsg>
                        )}
                    </div>

                    <div>
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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataBuku.map((items, i) => {
                                    let io = i + 1;
                                    return (
                                        <tr key={i}>
                                            <td>{io}</td>
                                            <td>{items.judul_buku}</td>
                                            <td>{items.Kategori}</td>
                                            <td>{items.pengarang}</td>
                                            <td>
                                                <CircleButton
                                                    className="btn btn-danger btn-sm mb-1"
                                                    onClick={(items) => {
                                                        hendlRemoveItem(
                                                            items,
                                                            i
                                                        );
                                                    }}
                                                >
                                                    x
                                                </CircleButton>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="form-group text-right">
                        <button
                            className="btn btn-secondary btn-sm mr-1 ml-1"
                            onClick={() => {
                                setSwitchPage(0);
                            }}
                        >
                            Back
                        </button>
                        <button
                            className="btn btn-primary btn-sm saves"
                            onClick={hendlUpSave}
                        >
                            Simpan
                        </button>
                    </div>
                </ECard>
            );
        };
        return (
            <div>
                <ECard>
                    {switPage == 0 ? <FormCreate /> : <FormAddBook />}
                </ECard>
            </div>
        );
    };
    const hendelEditPinjaman = () => {
        setValidate(true);
        const getData = async (kode) => {
            const get = await axios.get(
                base_url + "api/getDataPeminjamanBuku/" + kode
            );
            // console.log(get);
            setDataBuku(get.data.troli);
            setSwitchCase("update");
            setKodePin(get.data.peminjaman.kode_peminjaman);
            setCreateP({
                tanggal_pinjam: get.data.peminjaman.tanggal_pinjam,
                lama_pinjam: get.data.peminjaman.lama_pinjam,
                detail: get.data.peminjaman.detail,
            });
        };
        getData(kode_a);
    };
    const HistoryPeminjaman = () => {
        return (
            <ECard
                className="mt-1"
                title={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>Buku dalam peminjaman</span>
                        <button
                            className="btn btn-success btn-sm"
                            onClick={hendelEditPinjaman}
                        >
                            <i className="fa fa-edit"></i>
                        </button>
                    </div>
                }
            >
                <PeminjamanActive userKode={kode_a} />
            </ECard>
        );
    };
    const UserPage = () => {
        return (
            <ECard
                style={{
                    fontSize: 12,
                }}
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
                                {data.tempat_lahir + " " + data.tanggal_lahir}
                            </p>
                        </div>
                        <hr />
                        <div style={styleReference}>
                            <strong>No Telepon</strong>
                            <p style={{ marginBottom: 0 }}>{data.tlp}</p>
                        </div>
                        <hr />
                        <div style={styleReference}>
                            <strong>Alamat</strong>
                            <p style={{ marginBottom: 0 }}>{data.alamat}</p>
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
                            <p style={{ marginBottom: 0 }}>{data.created_at}</p>
                        </div>
                        <hr />
                    </div>
                </div>
            </ECard>
        );
    };
    const handleRoute = () => {
        window.location.reload();
    };
    const setDataStory = () => {
        const sets = async () => {
            const get = await axios.get(
                base_url + "api/getStoryPeminjaman/" + kode_a
            );
            setStory(get.data);
        };
    };
    const ListStory = () => {
        return (
            <ECard
                className="mt-1"
                title={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>Buku dalam peminjaman</span>
                        <button
                            className="btn btn-success btn-sm"
                            onClick={hendelEditPinjaman}
                        >
                            <i className="fa fa-edit"></i>
                        </button>
                    </div>
                }
            >
                <PeminjamanActive userKode={kode_a} />
            </ECard>
        );
    };

    return loading ? (
        loadingPage()
    ) : (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <button
                        className="btn btn-secondary btn-sm mb-1"
                        onClick={handleRoute}
                    >
                        <i className="las la-arrow-alt-circle-left"></i>
                    </button>
                </div>
                <div className="col-md-5">
                    <UserPage />
                </div>
                <div className="col-md-7">
                    {validate ? pagePeminjaman() : validatefalse()}

                    {validate == false && <HistoryPeminjaman />}
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
