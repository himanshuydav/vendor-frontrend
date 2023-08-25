import React, { useEffect, useState } from 'react'
import { vendorList } from '../../utils/services';
import VendorListTable from '../../component/common/VendorListTable';
import { toast } from 'react-toastify';
import InvoiceList from '../../component/common/InvoiceList';
import DashboardVendorContractTable from '../../component/common/DashboardVendorContractTable';
import DasboardInvoiceTable from '../../component/common/DasboardInvoiceTable';
import { Helmet } from 'react-helmet';


const VendorDashBoard = () => {
    const [search] =useState("")
    const [vendorLists,setVenderList] =useState([]);
    const [invoiceList,setInvoiceList] =useState([])
    const [loading,setLoading] =useState(false)

    const handleVendorList =async () =>{       
        try {
          setLoading(true)
          const  result = await vendorList();
          setLoading(false)
          const approvedList = result.res.list.filter((item)=>item.Name === "Approved"  )
          setVenderList(approvedList);
          setInvoiceList(result.res.InvoiceList[0].lines)
        } catch (error) {
          toast.error(" 500 server error please login Again")
        }
     }

    useEffect(()=>{
        handleVendorList()
    },[])

  return (
    <div>
      <Helmet>
        <title>Vendor Portal || Home</title>
      </Helmet>
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Purchase Contracts</h3>

        <div className="form-group row">
          {/* <VendorListTable search={search}  vendorLists={vendorLists} setVenderList={setVenderList} loading={loading} /> */}
          <DashboardVendorContractTable  vendorLists={vendorLists} setVenderList={setVenderList} loading={loading}/>
        </div>
      </div>
    </div>

    <div className="card mt-4">
      <div className="card-body">
        <h3 className="card-title">Bills</h3>
        <div className="form-group row">
          <DasboardInvoiceTable invoiceList={invoiceList}  loading={loading} />
        </div>
      </div>
    </div>

  </div>
  )
}

export default VendorDashBoard