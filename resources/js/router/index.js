import React, { useState, useEffect } from "react";
import { HashRouter, Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router";

// //////////////////
// import TestBarcode from "../views/pages/TestBarcode";
import BaseLayout from "../views/layout/Layout-base/Lay-sidebar";

// ---------------------------master---------------------------------
import Dashboard from "../views/pages/DashBoard/Dashboard";
import BukuTamu from "../views/pages/Buku-Tamu/BukuTamu";
import Buku from "../views/pages/Page-Buku/Buku";
import Barcode from "../views/pages/TestBarcode";
import Login from "../views/pages/Login/Login";
import Anggota from "../views/pages/Anggota/Anggota";
import Peminjaman from "../views/pages/Peminjaman/Peminjaman";
import Pengembalian from "../views/pages/Pengembalian/pengembalian";
import Laporan from "../views/pages/Laporan/Laporan";
// -----------------------------------------------------------
// ////child/////////////////////
import DetailBuku from "../views/pages/Page-Buku/DeskripsiBuku";
import DetailAnggota from "../views/pages/Anggota/DetailUser";
import { connect } from "react-redux";
import { base_url } from "../constant/constant";
const Cookies = require("js-cookie");
// /////////////////////////////

// //// Home Screen //////////////
import Home from "../views/pages/Web/Home/Home";
import Profile from "../views/pages/Web/Profile/Profile";
import Book from "../views/pages/Web/Buku/Buku";
import BukuDetail from "../views/pages/Web/Buku/components/DeskripsiBuku";
// //////////////////////////////

// Autentcation
function index(props) {
    const [auth, setAuth] = useState([]);
    const location = useLocation();
    const getLocationParams = () => {
        const url = location.pathname.substr(1).split("/");
        return url;
    };
    useEffect(() => {
        getdata();
    }, []);
    // useEffect(() => {
    //     if ([auth].length > 0) {
    //         console.log();
    //     }
    // }, [auth]);
    const getdata = async () => {
        const auth = await axios
            .get(base_url + "api/auth/user-profile", {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            })
            .catch((error) => {
                console.log();
                if (getLocationParams()[0] != "login") {
                    window.location.href = base_url + "login";
                }
            });
        console.log(auth);
        setAuth(auth.data);
    };
    return (
        <>
            <Switch>
                {auth.level == "Admin" && (
                    <>
                        <Route path="/" exact>
                            <BaseLayout>
                                <Dashboard />
                            </BaseLayout>
                        </Route>
                        <Route path="/Dashboard" exact>
                            <BaseLayout>
                                <Dashboard />
                            </BaseLayout>
                        </Route>
                        <Route path="/BukuTamu" exact>
                            <BaseLayout>
                                <BukuTamu />
                            </BaseLayout>
                        </Route>
                        <Route path="/BukuTamu/:id" exact>
                            <BaseLayout>
                                <BukuTamu />
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

                        <Route path="/Laporan">
                            <BaseLayout>
                                <Laporan />
                            </BaseLayout>
                        </Route>

                        <Route path="/Barcode">
                            <Barcode />
                        </Route>
                    </>
                )}
                {auth.level == "User" && (
                    <>
                        {" "}
                        <Route path="/" exact>
                            <BaseLayout>
                                <Home />
                            </BaseLayout>
                        </Route>
                        <Route path="/Home" exact>
                            <BaseLayout>
                                <Home />
                            </BaseLayout>
                        </Route>
                        <Route path="/Buku" exact>
                            <BaseLayout>
                                <Book />
                            </BaseLayout>
                        </Route>
                        <Route path="/Buku/:id" exact>
                            <BaseLayout>
                                <BukuDetail />
                            </BaseLayout>
                        </Route>
                        <Route path="/Profile" exact>
                            <BaseLayout>
                                <Profile />
                            </BaseLayout>
                        </Route>
                    </>
                )}
                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
        </>
    );
}

export default index;
