import React, { useState } from "react";
import Header from "../layout/Header";
import VpMainBar from "./VpMainBar";
import VpSidenav from "./VpSidenav";


const AdminVpOpration = () => {
  const [togglerBar, setTogglerBar] = useState(true);

  return (
    <div>
      <Header setTogglerBar={setTogglerBar} togglerBar={togglerBar} />
      <div className="Layout d-flex ">
        <div className="side-nav">
         <VpSidenav />
        </div>
        <div className={togglerBar ? "page-container" : "page-container-full"}>
          <VpMainBar />
        </div>
      </div>
    </div>
  );
};

export default AdminVpOpration;
