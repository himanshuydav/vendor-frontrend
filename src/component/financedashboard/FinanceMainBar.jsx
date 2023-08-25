import React from "react";
import { Route, Routes } from "react-router-dom";
import FinanceHome from "../../pages/financepage/FinanceHome";
import ViewInvoice from "../common/ViewInvoice";
import FinanceInvoiceCreation from "../../pages/financepage/FinanceInvoiceCreation";
import FinanceInvoiceList from "../../pages/financepage/FinanceInvoiceList";



const FinanceMainBar = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FinanceHome />} />
        <Route path="/view-invoice/:id" element={<ViewInvoice />} />
        <Route path="/financr-invoice-creation/:id" element={<FinanceInvoiceCreation />} />
        <Route path="/invoice-list" element={<FinanceInvoiceList />} />
      </Routes>
    </div>
  );
};

export default FinanceMainBar;
