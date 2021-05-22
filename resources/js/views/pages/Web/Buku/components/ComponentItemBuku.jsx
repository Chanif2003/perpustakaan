import React from "react";
import { base_url } from "../../../../../constant/constant";
import "./style.scss";
export default function ComponentItemBuku({ img, title,id }) {
    return (
        <div
            className="root-list-buku"
            onClick={() => {
                window.location.href = base_url + "Buku/" + id;
            }}
        >
            <img src={img} className="img-list-buku" />
            <div className="titles">
                <strong
                    style={{
                        fontSize: 10,
                    }}
                >
                    {title}
                </strong>
            </div>
        </div>
    );
}
