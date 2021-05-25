import React from "react";
import { base_url } from "../../../../constant/constant";
import "./style.scss";
export default function Home() {
    return (
        <div className="root-home">
            <img
                src={`${base_url}img/images/bg.jpg`}
                width="100%"
                height="500px"
            />
            <div className="cover-data">
                <div className="lefts">
                    <div
                        style={{
                            height: 150,
                        }}
                    ></div>
                    <h1>SMK N 1 Benai</h1>
                    <h5>Sistem Perpustakaan</h5>
                </div>
                <div className="rights">
                    <div className="container-img">
                        <img
                            src={`${base_url}img/images/book.svg`}
                            width="100%"
                            height="500px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
