import React from "react";
import { Route, Routes } from "react-router-dom";
import ExcuvtiveDashboard from "../../../pages/staff/executive/ExcuvtiveDashboard";
import VendorView from "../../common/VendorView";
import Contractpage from "../../../pages/Contractpage";
import CreateInvoice from "../../../pages/vendor/CreateInvoice";
import ExecutiveHome from "../../../pages/staff/executive/ExecutiveHome";
import InvoiceAllList from "../../../pages/vendor/InvoiceAllList";
import ViewInvoice from "../../common/ViewInvoice";
import EditVendor from "../../common/EditVendor";

const MainWrapper = () => {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<ExecutiveHome />} />
        <Route path="/view/:id" element={<VendorView />} />
        <Route path="/contract-listing" element={<ExcuvtiveDashboard />} />
        <Route path="/add-excutive-contract" element={<Contractpage />} />
        <Route path="/add-invoice/:id" element={<CreateInvoice />} />
        <Route path="/invoice-list" element={<InvoiceAllList />} />
        <Route path="/view-invoice/:id" element={<ViewInvoice />} />
        <Route path="/edit-contract/:id" element={<EditVendor />} />
      </Routes>
    </div>
  );
};

export default MainWrapper;
