import React, { Component } from "react";
import { HashRouter, Router, Route, Link, Switch } from "react-router-dom";

// //////////////////
// import TestBarcode from "../views/pages/TestBarcode";
import BaseLayout from "../views/layout/Layout-base/Lay-sidebar";

// ------------------------------------------------------------
import Dashboard from "../views/pages/Buku";
import Barcode from "../views/pages/TestBarcode";
import Login from "../views/pages/Login";
// ///////////////////
export default function index() {
    return (
        <>
            <Switch>
                <Route path="/" exact>
                    <BaseLayout>
                        <Dashboard />
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
