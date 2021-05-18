import React from "react";
import ECard from "../../../components/Card/Ecard";
import "./style.scss";

export default function DataBuku(props) {
    return (
        <ECard className={props.className}>
            <div className="root-tbl-buku">
                <div className="itemLeft">
                    <img
                        src={props.image}
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </div>
                <div className="itemCenter">
                    <strong
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        {props.title}
                    </strong>
                    <div>
                        <small>
                            <strong>
                                <i className="fa fa-label"></i>{" "}
                                <span class="badge badge-dark">
                                    {props.Kategori}
                                </span>
                            </strong>
                        </small>
                    </div>
                    <div className="">
                        {props.onView}

                        <button
                            className="btn btn-success btn-sm"
                            onClick={props.onEdit}
                        >
                            <i className="las la-edit"></i>
                        </button>
                        <button
                            className="btn btn-danger btn-sm ml-1"
                            onClick={props.onDel}
                        >
                            <i className="las la-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </ECard>
    );
}
