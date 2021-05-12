import React from "react";
import axios from "axios";
import { base_url } from "../constant/constant";
import Swal from "sweetalert2";

const swal = () => {
    Swal.fire({
        title: "Please Wait !",
        html: "Loading....",
        didOpen: () => {
            Swal.showLoading();
        },
    });
};

export const postAxios = (
    url,
    event,
    cases = null,
    reload = false,
    debug = false
) => {
    swal();
    const formData = new FormData(event.target);
    formData.append("case", cases);
    event.preventDefault();
    axios.post(base_url + url, formData).then((res) => {
        Swal.close();
        if (debug == true) {
            console.log(res.data);
        } else {
            if (res.data.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: "Good Job",
                    text: "Berhasil",
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (reload) {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops..!",
                    text: res.data.msg,
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (reload) {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    }
                });
            }
        }
    });
};

export const postAxiosFromData = (url, data, reload = false, debug = false) => {
    swal();
    axios.post(base_url + url, data).then((res) => {
        Swal.close();
        if (debug == true) {
            console.log(res.data);
        } else {
            if (res.data.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: "Good Job",
                    text: "Berhasil",
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (reload) {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops..!",
                    text: res.data.msg,
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (reload) {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    }
                });
            }
        }
    });
};

export const postAxiosFromDataCallBack = (
    url,
    data,
    callBack,
    debug = false
) => {
    swal();
    axios.post(base_url + url, data).then((res) => {
        Swal.close();
        if (debug == true) {
            console.log(res.data);
        } else {
            callBack(res.data);
        }
    });
};

export const genDelete = (url, post, response) => {
    Swal.fire({
        text: "Yakin Akan Menghapus Data?",
        showCancelButton: true,
        confirmButtonText: `Ya`,
    }).then((result) => {
        if (result.isConfirmed) {
            swal();
            try {
                const del = axios.post(base_url + url, post).then((res) => {
                    Swal.close();
                    response(res);
                });
            } catch (e) {}
        }
    });
};
