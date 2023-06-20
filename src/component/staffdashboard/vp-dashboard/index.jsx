import React, { useState } from "react";
import Header from "../layout/Header";
import AddminManagerSideBar from "./AddminManagerSidenav";
import ManagerMainBar from "./ManagerMainBar";

const AdminVpOpration = () => {
  const [togglerBar, setTogglerBar] = useState(true);

  return (
    <div>
      <Header setTogglerBar={setTogglerBar} togglerBar={togglerBar} />
      <div className="Layout d-flex ">
        <div className="side-nav">
          <AddminManagerSideBar />
        </div>

        <div className={togglerBar ? "page-container" : "page-container-full"}>
          <ManagerMainBar />
        </div>
      </div>
    </div>
  );
};

export default AdminVpOpration;
