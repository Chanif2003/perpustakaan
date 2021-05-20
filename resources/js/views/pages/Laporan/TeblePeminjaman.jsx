import React, { useState, useEffect } from "react";
import $ from "jquery";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
// import "datatables.net-dt/js/";
import ECard from "../../../components/Card/Ecard";
export default function TeblePeminjaman() {
    useEffect(() => {
        $(document).ready(function () {
            var table = $("#example").DataTable({
                responsive: true,
                bFilter: false
            });
            // Handle click on "Expand All" button
            $("#btn-show-all-children").on("click", function () {
                // Expand row details
                table
                    .rows(":not(.parent)")
                    .nodes()
                    .to$()
                    .find("td:first-child")
                    .trigger("click");
            });

            // Handle click on "Collapse All" button
            $("#btn-hide-all-children").on("click", function () {
                // Collapse row details
                table
                    .rows(".parent")
                    .nodes()
                    .to$()
                    .find("td:first-child")
                    .trigger("click");
            });
        });
    }, []);
    return (
        <div>
            <ECard className="mb-1"></ECard>
            <ECard>
                <table id="example" className="display" width="100%">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Kepala Desa</th>
                            <th>Nama Desa</th>
                            <th>Username</th>
                            <th>email</th>
                            <th>Lihat data</th>
                            <th>Edit</th>
                            <th>Hapus</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>aa aa aa aa aaa aa aaa aaa </td>
                            <td>aa aa aa aa aaa aa aaa aaa </td>
                            <td>aa aa aa aa aaa aa aaa aaa </td>
                            <td>aa aa aa aa aaa aa aaa aaa </td>
                            <td>aa aa aa aa aaa aa aaa aaa </td>
                            <td>aa aa aa aa aaa aa aaa aaa </td>
                            <td>aa aa aa aa aaa aa aaa aaa </td>
                            <td>aa aa aa aa aaa aa aaa aaa </td>
                        </tr>
                    </tbody>
                </table>
            </ECard>
        </div>
    );
}
