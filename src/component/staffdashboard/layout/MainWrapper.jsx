import React from "react";
import { Route, Routes } from "react-router-dom";
import ExcuvtiveDashboard from "../../../pages/staff/executive/ExcuvtiveDashboard";
import VendorView from "../../common/VendorView";
import Contractpage from "../../../pages/Contractpage";
import CreateInvoice from "../../../pages/vendor/CreateInvoice";

const MainWrapper = () => {
  return (
    <div>
      <Routes>
        <Route path="/staff-dashboard" element={<ExcuvtiveDashboard />} />
        <Route path="/excuitve-view/:id" element={<VendorView />} />
        <Route path="/contract-listing" element={<ExcuvtiveDashboard />} />
        <Route path="/add-excutive-contract" element={<Contractpage />} />
        <Route path="/add-invoice/:id" element={<CreateInvoice/>} />
      </Routes>
    </div>
  );
};

export default MainWrapper;
