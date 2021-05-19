import React, { Component } from "react";
import { HashRouter, Router, Route, Link, Switch } from "react-router-dom";

// //////////////////
// import TestBarcode from "../views/pages/TestBarcode";
import BaseLayout from "../views/layout/Layout-base/Lay-sidebar";

// ---------------------------master---------------------------------
import Dashboard from "../views/pages/Page-Buku/Buku";
import Buku from "../views/pages/Page-Buku/Buku";
import Barcode from "../views/pages/TestBarcode";
import Login from "../views/pages/Login/Login";
import Anggota from "../views/pages/Anggota/Anggota";
import Peminjaman from "../views/pages/Peminjaman/Peminjaman";
import Pengembalian from "../views/pages/Pengembalian/pengembalian";
// -----------------------------------------------------------
// ////child/////////////////////
import DetailBuku from "../views/pages/Page-Buku/DeskripsiBuku";
import DetailAnggota from "../views/pages/Anggota/DetailUser";
// /////////////////////////////
export default function index() {
    return (
        <>
            <Switch>
                <Route path="/" exact>
                    <BaseLayout>
                        <Dashboard />
                    </BaseLayout>
                </Route>
                <Route path="/Buku" exact>
                    <BaseLayout>
                        <Buku />
                    </BaseLayout>
                </Route>
                <Route path="/detailBuku/:kode">
                    <BaseLayout>
                        <DetailBuku />
                    </BaseLayout>
                </Route>
                <Route path="/Anggota">
                    <BaseLayout>
                        <Anggota />
                    </BaseLayout>
                </Route>
                <Route path="/detailAnggota/:kode_anggota">
                    <BaseLayout>
                        <DetailAnggota />
                    </BaseLayout>
                </Route>
                <Route path="/Pinjaman">
                    <BaseLayout>
                        <Peminjaman />
                    </BaseLayout>
                </Route>
                <Route path="/Pinjaman/:kode">
                    <BaseLayout>
                        <Peminjaman />
                    </BaseLayout>
                </Route>
                <Route path="/Pengembalian">
                    <BaseLayout>
                        <Pengembalian />
                    </BaseLayout>
                </Route>
                <Route path="/Barcode">
                    <Barcode />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
        </>
    );
}
