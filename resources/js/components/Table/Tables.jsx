import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import "./style.scss";
export default class Tables extends Component {
    i = 0;
    constructor(prpos) {
        super(prpos);
        this.state = {
            isActive: false,
            offset: 0,
            data: [],
            perPage: this.props.contPage != undefined ? this.props.contPage : 5,
            currentPage: 0,
            Header: this.props.Header,
        };
    }
    handlePageClick = (e, page) => {
        // console.log(page);
        // const selectedPage = e.selected;
        const selectedPage = page - 1;
        const offset = selectedPage * this.state.perPage;

        this.setState(
            {
                currentPage: selectedPage,
                offset: offset,
            },
            () => {
                this.ItemData(this.state.data);
            }
        );
    };
    componentDidUpdate(previousProps, previousState) {
        // console.log(previousProps.data);
        if (previousProps.data !== this.props.data) {
            this.setState({
                data: this.props.data,
            });
            this.ItemData(this.props.data);
        }
    }
    componentDidMount() {
        this.ItemData(this.state.data);
    }

    hedlerDetails = (event) => {
        if (event.target.parentElement.className == "") {
            if (document.querySelector(".detailAct") !== null) {
                document
                    .querySelector(".detailAct")
                    .classList.remove("detailAct");
            }
            event.target.parentElement.classList.add("detailAct");
        } else {
            event.target.parentElement.classList.remove("detailAct");
        }
    };

    ItemData = (param) => {
        // console.log(this.state.data);
        const data = param;
        const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
        );
        const postData = slice.map((item, i) => (
            <React.Fragment key={i}>
                <tr>
                    {Object.values(item).map((ex, it) =>
                        it == 0 ? (
                            <td
                                key={it}
                                data-label={this.state.Header[it]}
                                onClick={this.hedlerDetails.bind(event)}
                            >
                                {ex}
                            </td>
                        ) : (
                            <td key={it} data-label={this.state.Header[it]}>
                                {ex}
                            </td>
                        )
                    )}
                </tr>
            </React.Fragment>
        ));

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            postData,
        });
    };
    render() {
        return (
            <>
                <table className="E-Table-details">
                    <thead>
                        <tr style={this.props.colorHead}>
                            {this.state.Header.map((item, key) => (
                                <th scope="col" key={key}>
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{this.state.postData}</tbody>
                </table>

                {/* //// page costum UI */}
                {/* <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                /> */}
                {/* ///////////////////// */}

                <div className="Container-Paging">
                    <Pagination
                        count={this.state.pageCount}
                        color="primary"
                        onChange={this.handlePageClick}
                    />
                </div>
            </>
        );
    }
}
