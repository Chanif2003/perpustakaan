import axios from "axios";
import React, { useEffect, useState } from "react";
import { ECard, ECartTable } from "../../../components/Card/Card";
import { base_url } from "../../../constant/constant";
import "./style.scss";
import UserPengembalian from "../Peminjaman/HistoryPeminjaman";
import $ from "jquery";
import Loading from "../../../components/LoadingPage/Loading";
import Swal from "sweetalert2";

export default function pengembalian() {
    const [loading, setLoading] = useState(false);
    const [itmLoading, setItemLoading] = useState(false);

    const [dataSearch, setdataSearch] = useState([]);

    const [kode_a, setKode_a] = useState(null);

    const [dataPeminjamAktif, setdataPeminjamAktif] = useState([]);

    const [pShow, setPshow] = useState(false);

    const [dataItemFirst, setDataItemFirst] = useState([]);

    const [loadingFirstItem, setLoadingFirstItem] = useState(false);

    const [kode_peminjaman, setKode_peminjaman] = useState(null);
    const [dataPeminjaman, setDataPeminjaman] = useState([]);
    const [cases, setCases] = useState("save");

    const hendelOnchangeSearch = (e) => {
        setItemLoading(true);
        const searchdata = async (evn) => {
            const get = await axios.get(
                base_url + "api/searchAnggotaPeminjaman/" + evn
            );
            if (evn == "") {
                setdataSearch([]);
                setItemLoading(false);
            } else {
                setdataSearch(get.data);
                setItemLoading(false);
                setPshow(false);
            }
        };
        searchdata(e.target.value);
    };

    useEffect(() => {
        const listpeminjaman = async () => {
            const get = await axios.get(base_url + "api/getlistpeminjaman");
            setdataPeminjamAktif(get.data);
        };
        listpeminjaman();
    }, []);

    const loadingPage = () => {
        return (
            <div
                className="container"
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Loading />
            </div>
        );
    };
    const itmLoadingPage = () => {
        return <p>Loading...</p>;
    };
    const hendlListSearch = (items) => {
        setKode_a(items.kode_anggota);
        $(".input-search-live").val(items.nama);
        getData(items.kode_anggota);
        setdataSearch([]);
        setPshow(true);
        setKode_peminjaman(items.kode_peminjaman);
    };
    const getData = async (ko) => {
        const get = await axios.get(
            base_url + "api/getDataPeminjamanBuku/" + ko
        );
        setDataItemFirst(get.data.peminjaman);
        setLoadingFirstItem(true);
    };
    const hendlsubmits = (event) => {
        event.preventDefault();
        const form_data = new FormData(event.target);
        form_data.append("kode_anggota", kode_a);
        form_data.append("case", cases);
        form_data.append("kode_peminjaman", kode_peminjaman);
        const pushBackend = async () => {
            const push = await axios.post(
                base_url + "api/pusdatapengembalian",
                form_data
            );
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
        pushBackend();
    };
    const pageInputAnggota = () => {
        return (
            <div className="container">
                <div
                    className="row"
                    style={{
                        marginTop: 30,
                    }}
                >
                    <div className="col-lg-6">
                        <ECard className="mb-1">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control input-search-live"
                                    onChange={hendelOnchangeSearch}
                                    placeholder="input kode / Scann Isbn / nama anggota pustaka"
                                />
                            </div>
                            <hr />
                            {loadingFirstItem && (
                                <ECard
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
                                                src={`${base_url}img/User/${dataItemFirst.foto}`}
                                            />
                                            <h6 className="m-0 ml-1">
                                                {dataItemFirst.nama}
                                            </h6>
                                        </div>
                                    }
                                    className="mb-2"
                                >
                                    <PeminjamanActive
                                        userKode={dataItemFirst.kode_anggota}
                                    />
                                </ECard>
                            )}
                            <hr />
                            {itmLoading
                                ? itmLoadingPage()
                                : dataSearch.map((items, i) => {
                                      return (
                                          <ECard
                                              className="mb-1 itm-anggota"
                                              key={i}
                                              onClick={() => {
                                                  hendlListSearch(items);
                                              }}
                                          >
                                              <div
                                                  style={{
                                                      display: "flex",
                                                  }}
                                              >
                                                  <img
                                                      style={{
                                                          width: 30,
                                                          height: 30,
                                                          borderRadius: "50%",
                                                      }}
                                                      src={`${base_url}img/User/${items.foto}`}
                                                  />
                                                  <div className="ml-2">
                                                      <div>
                                                          {" "}
                                                          <strong>
                                                              {items.nama}
                                                          </strong>
                                                      </div>
                                                      <div>
                                                          <small>
                                                              {
                                                                  items.kode_anggota
                                                              }
                                                          </small>
                                                      </div>
                                                  </div>
                                              </div>
                                          </ECard>
                                      );
                                  })}
                            <div className={pShow ? "" : "d-none"}>
                                <form onSubmit={hendlsubmits}>
                                    <div className="form-group">
                                        <label>Tanggal Pengembalian</label>
                                        <input
                                            className="form-control form-control-sm"
                                            name="tanggal_kembali"
                                            type="date"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>catatan</label>
                                        <textarea
                                            name="catatan"
                                            className="form-control"
                                            row="3"
                                        ></textarea>
                                    </div>
                                    <div className="form-group text-right">
                                        <button className="btn btn-secondary btn-sm mr-1">
                                            Batal
                                        </button>
                                        <button className="btn btn-primary btn-sm">
                                            Simpan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </ECard>
                    </div>
                    <div className="col-lg-6">
                        <ECard title="Member yang sedang meminjam buku">
                            {dataPeminjamAktif.map((items, i) => {
                                return (
                                    <ECard key={i} className="mb-2">
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
                                                        src={`${base_url}img/User/${items.foto}`}
                                                    />
                                                    <h6 className="m-0 ml-1">
                                                        {items.nama}
                                                    </h6>
                                                </div>
                                            }
                                        >
                                            <UserPengembalian
                                                userKode={items.kode_anggota}
                                            />
                                        </ECartTable>
                                    </ECard>
                                );
                            })}

                            {/* <PeminjamanActive userKode={kode_a} /> */}
                        </ECard>
                    </div>
                </div>
            </div>
        );
    };

    return loading ? loadingPage() : pageInputAnggota();
}
