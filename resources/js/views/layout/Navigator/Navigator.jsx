import React from "react";
import {
    Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory,
    useLocation,
} from "react-router-dom";
import { Title, Logo, Versi } from "../../constant/constant";
export default function Navigator() {
    return (
        <div className="navigator">
            <div
                style={{
                    height: 100,
                    position: "absolute",
                    top: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={Logo}
                    style={{ width: "90%", height: "auto" }}
                />
            </div>
            <div className="Container-Item">
                <div
                    className={
                        useLocation().pathname == "/"
                            ? "Nav-Item active"
                            : "Nav-Item"
                    }
                >
                    <NavLink to="/">
                        <i className="las la-home la-2x"></i>
                    </NavLink>
                </div>
                <div className="spanTitle">
                    <span>Home</span>
                </div>
                <div
                    className={
                        useLocation().pathname == "/Sebaran"
                            ? "Nav-Item active"
                            : "Nav-Item"
                    }
                >
                    <NavLink to="/Sebaran">
                        <i className="las la-map-marked-alt la-2x"></i>
                    </NavLink>
                </div>
                <div className="spanTitle">
                    <span>Sebaran</span>
                </div>
                <div
                    className={
                        useLocation().pathname == "/Pelaporan"
                            ? "Nav-Item active"
                            : "Nav-Item"
                    }
                >
                    <NavLink to="/Pelaporan">
                        <i className="las la-file-alt la-2x"></i>
                    </NavLink>
                </div>
                <div className="spanTitle">
                    <span>Lapor</span>
                </div>
                <div
                    className={
                        useLocation().pathname == "/Berita"
                            ? "Nav-Item active"
                            : "Nav-Item"
                    }
                >
                    <NavLink to="/Berita">
                        <i className="lar la-newspaper la-2x"></i>
                    </NavLink>
                </div>
                <div className="spanTitle">
                    <span>Berita</span>
                </div>
                <div
                    className={
                        useLocation().pathname == "/profile"
                            ? "Nav-Item active"
                            : "Nav-Item"
                    }
                >
                    <NavLink to="/profile">
                        <i className="las la-city la-2x"></i>
                    </NavLink>
                </div>
                <div className="spanTitle">
                    <span>Profile</span>
                </div>
            </div>
        </div>
    );
}
