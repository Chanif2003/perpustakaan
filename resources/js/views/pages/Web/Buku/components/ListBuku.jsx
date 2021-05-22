import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
const baseUrl = require("../../../../../constant/constant").base_url;
const JsBarcode = require("jsbarcode");
export default function ListBuku() {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);

    const [search, setSearch] = useState(null);

    useEffect(() => {
        getListData();
    }, [offset]);
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
        const postData = slice.map((item, i) => (
            <div className="el__ col-md-6" key={i}>
                {item.judul_buku}
            </div>
        ));
        setData(postData);
        setPageCount(Math.ceil(data.length / perPage));
    };
    return <div>{data}</div>;
}
