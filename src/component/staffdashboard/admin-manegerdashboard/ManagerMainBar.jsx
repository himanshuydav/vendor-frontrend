import React from "react";
import { Route, Routes } from "react-router-dom";
import ExcuvtiveDashboard from "../../../pages/staff/executive/ExcuvtiveDashboard";
import VendorView from "../../common/VendorView";
import Contractpage from "../../../pages/Contractpage";

const ManagerMainBar = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin-manager-dashboard" element={<ExcuvtiveDashboard />} />
        <Route path="/manager-view/:id" element={<VendorView />} />
        <Route path="/contract-list" element={<ExcuvtiveDashboard />} />
        <Route path="/add-manager-contract" element={<Contractpage />} />
      </Routes>
    </div>
  );
};

export default ManagerMainBar;
