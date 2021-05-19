import axios from "axios";
import React, { useEffect, useState } from "react";
import { ECard, ECartTable } from "../../../components/Card/Card";
import { base_url } from "../../../constant/constant";
import "./style.scss";
import PagePeminjaman from "./PagePeminjaman";
import PeminjamanActive from "./PeminjamanActive";
export default function Peminjaman() {
    const [loading, setLoading] = useState(false);
    const [itmLoading, setItemLoading] = useState(false);

    const [dataSearch, setdataSearch] = useState([]);

    const [page, setPage] = useState(0);

    const [kode, setKode] = useState(null);

    const [dataPeminjamAktif, setdataPeminjamAktif] = useState([]);

    const hendelOnchangeSearch = (e) => {
        setItemLoading(true);
        const searchdata = async (evn) => {
            const get = await axios.get(base_url + "api/searchAnggota/" + evn);
            if (evn == "") {
                setdataSearch([]);
                setItemLoading(false);
            } else {
                setdataSearch(get.data);
                setItemLoading(false);
                console.log(get.data.length);
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
        return <p>Loading...</p>;
    };
    const itmLoadingPage = () => {
        return <p>Loading...</p>;
    };
    const hendlListSearch = (kode_) => {
        setPage(1);
        setKode(kode_);
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
                        <ECard>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={hendelOnchangeSearch}
                                    placeholder="input kode / Scann Isbn / nama anggota pustaka"
                                />
                            </div>
                            <hr />
                            {itmLoading
                                ? itmLoadingPage()
                                : dataSearch.map((items, i) => {
                                      return (
                                          <ECard
                                              className="mb-1 itm-anggota"
                                              key={i}
                                              onClick={() => {
                                                  hendlListSearch(
                                                      items.kode_anggota
                                                  );
                                              }}
                                          >
                                              <div
                                                  style={{
                                                      display: "flex",
                                                  }}
                                              >
                                                  <img
                                                      style={{
                                                          width: 50,
                                                          height: 50,
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
                        </ECard>
                    </div>
                    <div className="col-lg-6">
                        <ECard title="Member yang sedang meminjam buku">
                            {dataPeminjamAktif.map((items, i) => {
                                return (
                                    <ECard  key={i}  className="mb-2">
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
                                            <PeminjamanActive
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

    const pagePeminjaman = () => {
        return (
            <div>
                <PagePeminjaman kode_anggota={kode} />
            </div>
        );
    };

    return loading
        ? loadingPage()
        : page == 0
        ? pageInputAnggota()
        : pagePeminjaman();
}
