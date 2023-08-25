import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VendorDashBoard from '../../../pages/vendor/VendorDashBoard'
import VendorView from '../../common/VendorView'
import CreateInvoice from '../../../pages/vendor/CreateInvoice'
import InvoiceAllList from '../../../pages/vendor/InvoiceAllList'
import ViewInvoice from '../../common/ViewInvoice'
import VendorContractlist from '../../../pages/vendor/VendorContractlist'
import EditBill from '../../common/EditBill'


const VendorMainBar = () => {
  return (
    <div>
      <Routes>
        <Route path="/vendor-dashboard" element={<VendorDashBoard />} />
        <Route path="/veiw/:id" element={<VendorView />} />
        <Route path="/contract-list" element={<VendorContractlist />} />
        <Route path="/add-invoice/:id" element={<CreateInvoice />} />
        <Route path="/vendor-create-invoice" element={<CreateInvoice />} />
        <Route path="/invoice-list" element={<InvoiceAllList />} />
        <Route path="/view-invoice/:id" element={<ViewInvoice />} />
        <Route path="/edit-invoice/:id" element={<EditBill />} />
      </Routes>

    </div>
  )
}

export default VendorMainBar
