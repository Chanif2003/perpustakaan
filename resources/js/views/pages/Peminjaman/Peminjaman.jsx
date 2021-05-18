import axios from "axios";
import React, { useEffect, useState } from "react";
import ECard from "../../../components/Card/Ecard";
import { base_url } from "../../../constant/constant";
import "./style.scss";
import PagePeminjaman from "./PagePeminjaman";
export default function Peminjaman() {
    const [loading, setLoading] = useState(false);
    const [itmLoading, setItemLoading] = useState(false);

    const [dataSearch, setdataSearch] = useState([]);

    const [page, setPage] = useState(0);

    const [kode, setKode] = useState(null);

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
                    <div className="col-lg-3"></div>
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
