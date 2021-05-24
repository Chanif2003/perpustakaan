import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ECard from "../../../../../components/Card/Ecard";
import { getDataKategori } from "./request";
function Kategori(props) {
    const [kategori, setKategori] = useState([]);
    useEffect(() => {
        getDataKategori(
            (data) => {
                setKategori(data.data);
            },
            (e) => {
                console.log(e);
            }
        );
        console.log(props);
    }, []);
    return (
        <div class="list-group mt-0">
            <a
                onClick={() => {
                    props.ReduxSearch("all");
                }}
                class="list-group-item list-group-item-action "
            >
                All
            </a>
            {kategori.length > 0 &&
                kategori.map((it, i) => (
                    <a
                        key={i}
                        onClick={() => {
                            props.ReduxSearch(it.Kategori);
                        }}
                        class="list-group-item list-group-item-action "
                    >
                        {it.Kategori}
                    </a>
                ))}
        </div>
    );
}
const mapRedux = (store) => {
    return {
        ReduxSearch: store.kategori,
    };
};
const hadData = (dispatch) => {
    return {
        ReduxSearch: (data) =>
            dispatch({
                type: "KATEGORI",
                data: data,
            }),
    };
};
export default connect(mapRedux, hadData)(Kategori);
