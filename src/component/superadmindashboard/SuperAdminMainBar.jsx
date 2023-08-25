import React from "react";
import { Route, Routes } from "react-router-dom";
import ViewInvoice from "../common/ViewInvoice";
import ApprovalFlow from "../../pages/superadmin/ApprovalFlow";
import SuperadminContractlist from "../../pages/superadmin/SuperadminContractlist";
import VendorView from "../common/VendorView";
import SuperAdminBillList from "../../pages/superadmin/SuperAdminBillList";
import SuperAdminDashboard from "../../pages/superadmin/SuperAdminDashboard";
import ViewPayment from "../common/ViewPayment";
import ReportGenration from "../../pages/superadmin/ReportGenration";
import PaymentDetail from "../../pages/superadmin/PaymentDetail";



const SuperAdminMainBar = () => {


  return (
    <div>
      <Routes>
        <Route path="/" element={<SuperAdminDashboard/>} />
        <Route path="/payment-details/:id" element={<PaymentDetail />} />
        <Route path="/view/:id" element={<VendorView />} />
        <Route path="/contract-listing" element={<SuperadminContractlist />} />
        <Route path="/view-invoice/:id" element={<ViewInvoice />} />
        <Route path="/invoice-list" element={<SuperAdminBillList />} />
        <Route path="/approval-flow" element={<ApprovalFlow/>} />
        <Route path="/view-payment/:id" element={<ViewPayment/>} />
        <Route path="/report" element={<ReportGenration/>} />
        {/* <Route path="/approval-flow" element={<ApprovalFlowTwo/>} /> */}
      </Routes>
    </div>
  );
};

export default SuperAdminMainBar;
