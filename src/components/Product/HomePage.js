import React from "react";
import Content from "../Layout/Content";
import SideBar from "../Layout/SideBar";
const HomePage = () => {
    return(
        <div className="container d-md-flex align-items-stretch">        
            <Content />  
            <SideBar />
        </div>
    )
}

export default HomePage;