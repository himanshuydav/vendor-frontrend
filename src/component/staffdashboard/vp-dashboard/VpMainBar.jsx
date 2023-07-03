import React from "react";
import { Route, Routes } from "react-router-dom";
import ExcuvtiveDashboard from "../../../pages/staff/executive/ExcuvtiveDashboard";
import VendorView from "../../common/VendorView";
import Contractpage from "../../../pages/Contractpage";
import CreateInvoice from "../../../pages/vendor/CreateInvoice";
import ApprovalFlow from "../../../pages/superadmin/ApprovalFlow";
import VpDashBoard from "../../../pages/staff/vp/VpDashBoard";
import VpListing from "../../../pages/staff/vp/VpListing";

const VpMainBar = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<VpDashBoard />} />
        <Route path="/manager-view/:id" element={<VendorView />} />
        <Route path="/contract-list" element={<VpListing />} />
        <Route path="/add-manager-contract" element={<Contractpage />} />
        <Route path="/add-invoice/:id" element={<CreateInvoice/>} />
        {/* <Route path="/approval-flow" element={<ApprovalFlow/>} /> */}
      </Routes>
    </div>
  );
};

export default VpMainBar;
