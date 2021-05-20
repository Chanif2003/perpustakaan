import React from "react";

export default function History() {
    return (
        <div>
            <Navs />
        </div>
    );
}

const Navs = () => {
    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">
                    Peminajamn
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Pengembalian
                </li>
            </ol>
        </nav>
    );
};
