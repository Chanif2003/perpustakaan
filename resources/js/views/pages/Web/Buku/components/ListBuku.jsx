import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
const baseUrl = require("../../../../../constant/constant").base_url;
const JsBarcode = require("jsbarcode");
import ComponentListBuku from "./ComponentItemBuku";
export default function ListBuku(props) {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);

    const [search, setSearch] = useState(null);

    useEffect(() => {
        getListData();
    }, [offset]);
    useEffect(() => {
        if (props.search != null) {
            setSearch(props.search);
        }
        getListData();
    }, [props.search, search]);
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1);
    };
    const getListData = async () => {
        const params = search != null ? "/" + search : "";
        const get = await axios.get(baseUrl + "api/getdataBuku" + params);
        // setListdata(get.data);

        // ///////////////////////////////////////////////
        const data = get.data;
        const slice = data.slice(offset, offset + perPage);
        const postData = slice.map((item, i) => {
            const prps = {
                img: baseUrl + "img/Buku/" + item.image,
                title: item.judul_buku,
                id: item.kode_buku,
            };
            return (
                <div className="el__ col-lg-4 col-md-12 mb-3" key={i}>
                    <ComponentListBuku {...prps} />
                </div>
            );
        });
        setData(postData);
        setPageCount(Math.ceil(data.length / perPage));
    };
    return (
        <div>
            <div className="row">{data}</div>
        </div>
    );
}
