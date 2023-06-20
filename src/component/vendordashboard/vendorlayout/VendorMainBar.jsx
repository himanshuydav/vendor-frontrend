import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VenderHome from '../../../pages/vendor/VenderHome'
import VendorDashBoard from '../../../pages/vendor/VendorDashBoard'
import VendorView from '../../common/VendorView'
import CreateInvoice from '../../../pages/vendor/CreateInvoice'
import InvoiceListing from '../../../pages/vendor/InvoiceListing'

const VendorMainBar = () => {
  return (
    <div>
           <Routes>
               <Route path="/vendor-dashboard" element={<VendorDashBoard />} />
               <Route path="/contract-list" element={<VenderHome />} />
               <Route path="/vendor-dashboard/:id" element={<VendorView />} />
               <Route path="/vendor-create-invoice" element={<CreateInvoice />} />
               <Route path="/invoice-listing" element={<InvoiceListing />} />
           </Routes>
      
    </div>
  )
}

export default VendorMainBar
