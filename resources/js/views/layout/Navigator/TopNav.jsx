import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Title, Logo, Versi, base_url } from "../../../constant/constant";
const TopNav = (props) => {
    const [auth, setAuth] = useState([]);
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
        <header className="TopNav">
            <div className="Item-left">
                <label style={{ margin: 0 }} htmlFor="nav-toggle">
                    <i className="las la-bars"></i>
                </label>
            </div>
            <div className="Item-right">
                {/* <img
                    src="http://egooktafanda.com/images/me.jpg"
                    className="Img-Item-right"
                /> */}
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {props.reduxAuth.level == "User" ? (
                        <div>
                            <img
                                src={`${base_url}img/User/${auth.foto}`}
                                width="30"
                                height="30"
                                style={{
                                    borderRadius: "100%",
                                }}
                            />
                        </div>
                    ) : (
                        <strong>Admin</strong>
                    )}
                </div>
            </div>
        </header>
    );
};
const mapRedux = (store) => {
    return {
        reduxAuth: store.autentication,
    };
};
export default connect(mapRedux)(TopNav);
