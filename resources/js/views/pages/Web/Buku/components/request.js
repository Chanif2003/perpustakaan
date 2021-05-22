import axios from "axios";
import React from "react";
import ECard from "../../../../../components/Card/Ecard";
import { base_url } from "../../../../../constant/constant";

export const getDataKategori = async (respon, error) => {
    const getData = await axios
        .get(base_url + "api/getDataKategoriBuku")
        .catch((e) => {
            error(e);
        });
    respon(getData);
};
