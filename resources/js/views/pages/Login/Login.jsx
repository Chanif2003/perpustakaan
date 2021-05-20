import axios from "axios";
import React, { useState, useEffect } from "react";
import "./scss/_login.scss";
import { base_url } from "../../../constant/constant";
import Loading from "../../../components/LoadingPage/Loading";
const Cookies = require("js-cookie");
export default function Login() {
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState({
        status: false,
        msg: null,
    });
    useEffect(() => {
        setLoading(false);
    }, []);
    const Loadingpage = () => {
        return (
            <div
                style={{
                    position: "fixed",
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
    const Login = (event) => {
        event.preventDefault();
        const form_data = new FormData(event.target);
        pushBackend(form_data);
        setLoading(true);
    };
    const pushBackend = async (data) => {
        const log = await axios
            .post(base_url + "api/auth/login", data)
            .catch((error) => {
                setLoading(false);
                setMsg({
                    status: true,
                    msg: "Ma'af upaya login anda gagal",
                });
            });
        if (log != undefined) {
            Cookies.set("token", log.data.access_token, { expires: 7 });
            setLoading(false);
            window.location.href = base_url + "Dashboard";
        }
    };
    const getdata = () => {
        axios
            .get(base_url + "api/auth/user-profile", {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => console.log(error));
    };
    return loading ? (
        Loadingpage()
    ) : (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2" />
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-title">ADMIN PANEL</div>
                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                {console.log(msg)}
                                {msg.status ? (
                                    <span
                                        style={{
                                            color: "white",
                                        }}
                                    >
                                        {msg.msg}
                                    </span>
                                ) : (
                                    ""
                                )}
                                <form onSubmit={Login}>
                                    <div className="form-group form-group-log">
                                        <label className="form-control-label">
                                            EMAIL
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control form-control_log logInp inp"
                                            name="email"
                                        />
                                    </div>
                                    <div className="form-group form-group-log">
                                        <label className="form-control-label">
                                            PASSWORD
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control form-control_log logInp inp"
                                            name="password"
                                        />
                                    </div>
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text">
                                            {/* Error Message */}
                                        </div>
                                        <div className="col-lg-12 login-btm login-button text-right">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                LOGIN
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
