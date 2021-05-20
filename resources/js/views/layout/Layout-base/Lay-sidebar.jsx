import React, { Component, useState, useEffect } from "react";
import "../scss/style.scss";
import Sidebar from "../Navigator/Sidebar";
import Header from "../Navigator/TopNav";
import { base_url } from "../../../constant/constant";
import { connect } from "react-redux";
const Cookies = require("js-cookie");
import Loading from "../../../components/LoadingPage/Loading";
const Base = (props) => {
    const [autentication, setAutentication] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getdata();
    }, []);
    useEffect(() => {
        setAutentication(props.reduxAuth);
    }, [props.reduxAuth]);
    const getdata = async () => {
        const auth = await axios
            .get(base_url + "api/auth/user-profile", {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            })
            .catch((error) => {
                window.location.href = base_url + "Login";
            });
        setAutentication(auth.data);
        props.auth(auth.data);
        if ([auth.data].length > 0) {
            setLoading(false);
        } else {
            window.location.href = base_url + "Login";
        }
    };
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
    return loading ? (
        <Loadingpage />
    ) : (
        <div
            style={{
                overflowX: "hidden",
                paddingBottom: 20,
            }}
        >
            <input type="checkbox" id="nav-toggle" />
            <Header />
            <Sidebar />
            {/* <Content /> */}
            <main className="Main-Content">{props.children}</main>
        </div>
    );
};
const mapRedux = (store) => {
    return {
        reduxAuth: store.autentication,
    };
};
const hadData = (dispatch) => {
    return {
        auth: (data) =>
            dispatch({
                type: "Login",
                data: data,
            }),
    };
};
export default connect(mapRedux, hadData)(Base);
