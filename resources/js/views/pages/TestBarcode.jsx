import React, { useEffect } from "react";
import $ from "jquery";
var JsBarcode = require("jsbarcode");
import Loading from "../../components/LoadingPage/Loading";
export default function TestBarcode() {
    useEffect(() => {
        JsBarcode("#barcode").init();
    }, []);
    return (
        <div>
            <div className="row">
                <div className="col-md-5" style={{
                    background:'orange'
                }}>
                    <Loading />
                </div>
            </div>

            {/* <svg
                id="barcode"
                jsbarcode-format="upc"
                jsbarcode-value="123456789012"
                jsbarcode-textmargin="0"
                jsbarcode-fontoptions="bold"
            ></svg> */}
        </div>
    );
}
