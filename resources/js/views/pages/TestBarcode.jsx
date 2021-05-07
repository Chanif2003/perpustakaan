import React, { useEffect } from "react";
import $ from "jquery";
var JsBarcode = require("jsbarcode");
export default function TestBarcode() {
    useEffect(() => {
        JsBarcode("#barcode").init();
    }, []);
    return (
        <div>
            <svg
                id="barcode"
                jsbarcode-format="upc"
                jsbarcode-value="123456789012"
                jsbarcode-textmargin="0"
                jsbarcode-fontoptions="bold"
            ></svg>
        </div>
    );
}
