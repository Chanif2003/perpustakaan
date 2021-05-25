import React, { Component, useEffect, useState } from "react";
import { Title, Logo, Versi, base_url } from "../../../constant/constant";
import {
    Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory,
    useLocation,
} from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { connect } from "react-redux";
const Sidebar = (props) => {
    const [auth, setAuth] = useState([]);
    const logout = () => {
        const logout_ = async () => {
            const out = await axios.post(base_url + "api/auth/logout");
            window.location.href = base_url + "login";
        };
        logout_();
    };
    useEffect(() => {
        const Member = async () => {
            const get = await axios.get(
                base_url + "api/getDataAnggotaByUserId/" + props.reduxAuth.id
            );
            setAuth(get.data);
        };
        Member();
    }, []);
    return (
        <aside className="sidebar">
            <div className="S-Header">
                {/* <img  src={`${base_url}img/images/bg.jpg`}  className="Logo" /> */}
                <h5 className="title">SMK N 1 BENAI</h5>
            </div>
            <div className="S-Main-Top">
                <div className="S-Main-Panel">
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            // justifyContent: "center",
                            alignItems: "flex-end",
                        }}
                    >
                        <span
                            style={{
                                background: "rgba(255,255,255,0.5)",
                                width: "100%",
                                paddingLeft: 10,
                                fontWeight: "bold",
                                fontSize: 10,
                            }}
                        >
                            {props.reduxAuth.level == "User" && (
                                <div>
                                    <img
                                        src={`${base_url}img/User/${auth.foto}`}
                                        width="50"
                                        height="50"
                                        tag="ego oktafanda"
                                    />
                                    <br />
                                    {props.reduxAuth.name}
                                </div>
                            )}
                            {/* Kepolisian Republik Indonesia
                            <br />
                            Polres Kabupaten Kuantan Singingi */}
                        </span>
                    </div>
                </div>
            </div>
            {props.reduxAuth.level == "Admin" && (
                <div className="S-Main">
                    <div className="S-Main-Nav">
                        <h5 className="menu">Menu</h5>
                        <div className="S-Main-Container">
                            <ul>
                                <li
                                    className={
                                        useLocation().pathname == "/Dashboard"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <NavLink to="/Dashboard">
                                        <span className="las la-igloo"></span>
                                        <span>Dasboard</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={
                                        useLocation().pathname == "/BukuTamu"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <NavLink to="/BukuTamu">
                                        <span className="las la-dungeon"></span>
                                        <span>Buku Tamu</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={
                                        useLocation().pathname == "/Buku"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <NavLink to="/Buku">
                                        <span className="las la-book"></span>
                                        <span>Buku</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={
                                        useLocation().pathname == "/Anggota"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <NavLink to="/Anggota">
                                        <span className="las la-user-circle"></span>
                                        <span>Anggota</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={
                                        useLocation().pathname == "/Pinjaman"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <NavLink to="/Pinjaman">
                                        <span className="las la-hand-holding-heart"></span>
                                        <span>Pinjaman</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={
                                        useLocation().pathname ==
                                        "/Pengembalian"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <NavLink to="/Pengembalian">
                                        <span className="lar la-handshake"></span>
                                        <span>Pengembalian</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={
                                        useLocation().pathname == "/Laporan"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <NavLink to="/Laporan">
                                        <span className="las la-print"></span>
                                        <span>Laporan</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={
                                        useLocation().pathname == "/Logout"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <a
                                        onClick={logout}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <span className="las la-file-import"></span>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {props.reduxAuth.level == "User" && (
                <div className="S-Main">
                    <div className="S-Main-Nav">
                        <h5 className="menu">Menu</h5>
                        <div className="S-Main-Container">
                            <ul>
                                <li
                                    className={
                                        useLocation().pathname == "/Home" ||
                                        useLocation().pathname == "/"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <NavLink to="/Home">
                                        <span className="las la-igloo"></span>
                                        <span>Home</span>
                                    </NavLink>
                                </li>

                                <li
                                    className={
                                        useLocation().pathname == "/Buku" ||
                                        useLocation().pathname == "/"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <NavLink to="/Buku">
                                        <span className="las la-book"></span>
                                        <span>Buku</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={
                                        useLocation().pathname == "/Profile" ||
                                        useLocation().pathname == "/"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <NavLink to="/Profile">
                                        <span className="las la-user-circle"></span>
                                        <span>Profile</span>
                                    </NavLink>
                                </li>

                                <li
                                    className={
                                        useLocation().pathname == "/Logout"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <a
                                        onClick={logout}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <span className="las la-file-import"></span>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            <div className="S-footer">
                <p
                    style={{
                        color: "#fff",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    Versi {Versi}
                </p>
            </div>
        </aside>
    );
};
const mapRedux = (store) => {
    return {
        reduxAuth: store.autentication,
    };
};

export default connect(mapRedux)(Sidebar);

//bahan item

// {
/* <ul>
<li className="active">
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
    <ul>
        <li>
            <a>
                <span className="las la-angle-right"></span>
                <span>Dasboard</span>
            </a>
        </li>
        <li className="active">
            <a>
                <span className="las la-angle-right"></span>
                <span>Dasboard</span>
            </a>
        </li>
    </ul>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
</ul> */
// }
