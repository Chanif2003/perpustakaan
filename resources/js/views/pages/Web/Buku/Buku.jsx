import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { ECard, ECartTable } from "../../../../components/Card/Card";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";

// children
import Kategori from "./components/Kategori";
import ListBuku from "./components/ListBuku";
export default function Buku() {
    const [search, setSearch] = useState(null);
    const hendlSearch = (evn) => {
        setSearch(evn.target.value);
    };
    return (
        <div className="container mt-3">
            <div className="row">
                <aside className="col-md-6 col-lg-4 mb-3">
                    <Kategori />
                </aside>
                <aside className="col-md-6 col-lg-8">
                    <ECard
                        title={
                            <div className="form-group w-50">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Search"
                                    onChange={hendlSearch}
                                />
                            </div>
                        }
                    >
                        <ListBuku search={search} />
                    </ECard>
                </aside>
            </div>
        </div>
    );
}
