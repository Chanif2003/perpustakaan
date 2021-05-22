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
    return (
        <div className="container">
            <div className="row">
                <aside className="col-md-6 col-lg-4">
                    <Kategori />
                </aside>
                <aside className="col-md-6 col-lg-8">
                    <ListBuku />
                </aside>
            </div>
        </div>
    );
}
