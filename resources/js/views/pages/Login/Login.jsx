import axios from "axios";
import React from "react";
import "./scss/_login.scss";
import { base_url } from "../../../constant/constant";
const Cookies = require("js-cookie");
export default function Login() {
    const Login = (event) => {
        event.preventDefault();
        const form_data = new FormData(event.target);
        pushBackend(form_data);
    };
    const pushBackend = async (data) => {
        const log = await axios.post(base_url + "api/auth/login", data);
        Cookies.set("token", log.data.access_token, { expires: 7 });
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
    return (
        <div>
            <div className="container">
                <button
                    className="btn btn-info"
                    onClick={getdata}
                >
                    Cek
                </button>
                <div className="row">
                    <div className="col-lg-3 col-md-2" />
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-key">
                            <i className="fa fa-key" aria-hidden="true" />
                        </div>
                        <div className="col-lg-12 login-title">ADMIN PANEL</div>
                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
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
                                            className="form-control form-control_log logPassword inp"
                                            name="password"
                                        />
                                    </div>
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text">
                                            {/* Error Message */}
                                        </div>
                                        <div className="col-lg-6 login-btm login-button">
                                            <button
                                                type="submit"
                                                className="btn btn-outline-primary"
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
