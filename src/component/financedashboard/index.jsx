import React, { useState } from "react";
import Header from "../staffdashboard/layout/Header";
import FinanceSideBar from "./FinanceSidenav";
import FinanceMainBar from "./FinanceMainBar";

const FinanceDashBoard = () => {
  const [togglerBar, setTogglerBar] = useState(true);
  return (
    <div>
      <Header setTogglerBar={setTogglerBar} togglerBar={togglerBar} />
      <div className="Layout d-flex ">
        <div className="side-nav">
         <FinanceSideBar />
        </div>

        <div className={togglerBar ? "page-container" : "page-container-full"}>
          <FinanceMainBar />
        </div>
      </div>
    </div>
  );
};

export default FinanceDashBoard;
