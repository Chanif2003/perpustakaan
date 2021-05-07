import React, { Component } from "react";
import $ from "jquery";
import "./style.scss";

export default class LiveSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listdata: [],
        };
    }
    componentDidUpdate(previousProps, previousState) {
        if (
            previousProps.groupList !== this.props.groupList &&
            this.props.groupList != null
        ) {
            this.setState({
                listdata: this.props.groupList,
            });
        }
    }
    componentDidMount = () => {
        jQuery(document).ready(function ($) {
            $(".live-search-list").hide();
        });

        $(".live-search-box").focus(function () {
            $(".live-search-list").show();
            $(".live-search-list li").each(function () {
                $(this).attr("data-search-term", $(this).text().toLowerCase());
            });

            $(".live-search-box").on("keyup", function () {
                var searchTerm = $(this).val().toLowerCase();

                $(".live-search-list li").each(function () {
                    if (
                        $(this).filter(
                            "[data-search-term *= " + searchTerm + "]"
                        ).length > 0 ||
                        searchTerm.length < 1
                    ) {
                        $(".live-search-list").show();
                        $(this).show();
                    } else {
                        $(".live-search-list").hide();
                        $(this).hide();
                    }
                });
            });
        });

        $(".live-search-list > li").click(function () {
            $("#kat").val($(this).data("label"));
            $(".ket_").addClass("focused");
            $(".live-search-list").hide();
        });
        $(document).on("click", function (event) {
            // console.log(event.target.className);
            if (event.target.dataset.onlist) {
                var searchTerm = $(this).val().toLowerCase();
                $(".live-search-list").show();
            } else {
                $(".live-search-list").hide();
            }
        });
    };
    hendlerOnclickItem = (item) => {
        $("#kat").val(item)
    };
    render() {
        return (
            <div
                className="form-group form-float"
                style={{
                    marginTop: -30,
                }}
            >
                <div className="form-line ket_">
                    <label>{this.props.label}</label>
                    <input
                        type="text"
                        id="kat"
                        className="form-control live-search-box"
                        name={this.props.name}
                        autoComplete="off"
                        data-onlist="true"
                        defaultValue=""
                        placeholder={this.props.place}
                        required
                    />
                </div>
                <ul className="live-search-list card">
                    {Object.keys(this.state.listdata).map((item, i) => (
                        <li
                            data-label="key"
                            key={i}
                            onClick={(e) => {
                                this.hendlerOnclickItem(item);
                            }}
                        >
                            <i className="fa fa-label"></i>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
