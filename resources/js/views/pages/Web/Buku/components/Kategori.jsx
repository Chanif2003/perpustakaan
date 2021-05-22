import React, { useEffect, useState } from "react";
import ECard from "../../../../../components/Card/Ecard";
import { getDataKategori } from "./request";
export default function Kategori() {
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
    }, []);
    return (
        <div class="list-group mt-0">
            {kategori.length > 0 &&
                kategori.map((it, i) => (
                    <a key={i} href="#" class="list-group-item list-group-item-action ">
                        Cras justo odio
                    </a>
                ))}
        </div>
    );
}
