import React from "react";
import { Route, Routes } from "react-router-dom";
import ExcuvtiveDashboard from "../../../pages/staff/executive/ExcuvtiveDashboard";
import VendorView from "../../common/VendorView";
import Contractpage from "../../../pages/Contractpage";
import CreateInvoice from "../../../pages/vendor/CreateInvoice";
import ManegerHome from "../../../pages/staff/admin-manger/ManegerHome";
import InvoiceAllList from "../../../pages/vendor/InvoiceAllList";
import ViewInvoice from "../../common/ViewInvoice";
import EditVendor from "../../common/EditVendor";
import EditBill from "../../common/EditBill";
import ReportGenration from "../../../pages/superadmin/ReportGenration";

const ManagerMainBar = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ManegerHome />} />
        <Route path="/view/:id" element={<VendorView />} />
        <Route path="/edit-contract/:id" element={<EditVendor />} />
        <Route path="/contract-listing" element={<ExcuvtiveDashboard />} />
        <Route path="/add-manager-contract" element={<Contractpage />} />
        <Route path="/add-invoice/:id" element={<CreateInvoice />} />
        <Route path="/invoice-list" element={<InvoiceAllList />} />
        <Route path="/view-invoice/:id" element={<ViewInvoice />} />
        <Route path="/edit-invoice/:id" element={<EditBill />} />
        <Route path="/report" element={<ReportGenration/>} />
      </Routes>
    </div>
  );
};

export default ManagerMainBar;
