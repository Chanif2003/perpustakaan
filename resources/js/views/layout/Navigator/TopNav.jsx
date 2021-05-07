import React, { Component } from "react";

const TopNav = () => {
    return (
        <header className="TopNav">
            <div className="Item-left">
                <label style={{margin:0}} htmlFor="nav-toggle">
                    <i className="las la-bars"></i>
                </label>
            </div>
            <div className="Item-right">
                {/* <img
                    src="http://egooktafanda.com/images/me.jpg"
                    className="Img-Item-right"
                /> */}
               <div style={{
                   width:'100%',
                   height:'100%',
                   display:'flex',
                   justifyContent:'center',
                   alignItems:'center'
               }}>
               <strong>Admin</strong>
               </div>
            </div>
        </header>
    );
};

export default TopNav;
