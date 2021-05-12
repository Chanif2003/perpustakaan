import ReactDOM from "react-dom";

import React, { Component } from "react";
import BarcodeReader from "react-barcode-reader";

class ScannerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
        };

        this.handleScan = this.handleScan.bind(this);
    }
    handleScan(data) {
        this.setState({
            result: data,
        });
        this.props.values(this.state.result);
    }
    handleError(err) {
        console.error(err);
    }

    render() {
        return (
            <div>
                <BarcodeReader
                    onError={this.handleError}
                    onScan={this.handleScan}
                />
            </div>
        );
    }
}

export default ScannerComponent;
