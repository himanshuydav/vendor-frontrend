import React from "react";
import { Route, Routes } from "react-router-dom";
import VendorView from "../../common/VendorView";
import Contractpage from "../../../pages/Contractpage";
import CreateInvoice from "../../../pages/vendor/CreateInvoice";
import VpDashBoard from "../../../pages/staff/vp/VpDashBoard";
import VpListing from "../../../pages/staff/vp/VpListing";
import InvoiceAllvp from "../../../pages/staff/vp/InvoiceAllvp";
import ViewInvoice from "../../common/ViewInvoice";
import ReportGenration from "../../../pages/superadmin/ReportGenration";

const VpMainBar = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<VpDashBoard />} />
        <Route path="/view/:id" element={<VendorView />} />
        <Route path="/contract-listing" element={<VpListing />} />
        <Route path="/add-manager-contract" element={<Contractpage />} />
        <Route path="/add-invoice/:id" element={<CreateInvoice/>} />
        <Route path="/invoice-listing" element={<InvoiceAllvp />} />
        <Route path="/view-invoice/:id" element={<ViewInvoice />} />
        <Route path="/report" element={<ReportGenration/>} />
      </Routes>
    </div>
  );
};

export default VpMainBar;
