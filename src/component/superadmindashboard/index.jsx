import React, { useState } from "react";
import Header from "../staffdashboard/layout/Header";
import SuperAdminMainBar from "./SuperAdminMainBar";
import SuperAdminSidenav from "./SuperAdminSidenav";

const SuperAdminDashBoard = () => {
  const [togglerBar, setTogglerBar] = useState(true);
  return (
    <div>
      <Header setTogglerBar={setTogglerBar} togglerBar={togglerBar} />
      <div className="Layout d-flex ">
        <div className="side-nav">
         <SuperAdminSidenav />
        </div>

        <div className={togglerBar ? "page-container" : "page-container-full"}>
          <SuperAdminMainBar />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashBoard;
