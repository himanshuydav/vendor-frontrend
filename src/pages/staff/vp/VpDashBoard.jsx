import React, { useEffect, useState } from 'react'
import { vendorList } from '../../../utils/services';
import VpTables from '../../../component/common/VpTables';
import ChartManeger from '../../../component/common/ChartManeger';
import InvoiceListVp from '../../../component/common/InvoiceListVp';
import { Helmet } from 'react-helmet';

const VpDashBoard = () => {
    const [search,setSearch] =useState("")
    const [vendorLists,setVenderList] =useState([]);
    const [loading,setLoading] =useState(false);
    const [loadingtwo,setLoadingtwo] =useState(false);
    const [invoiceList,setInvoiceList] =useState([])
    

    const handleVendorList =async () =>{
        try {
          setLoading(true)
          const  result = await vendorList();
          setLoading(false)
          const PendingList = result.res.list.filter((item)=>item.Status ===4).reverse();
          setVenderList(PendingList);
          // setInvoiceList(result.res.InvoiceList)
        } catch (error) {
          console.log(error)
        }      
    }
    
    const handleVendorSort =async (e) =>{
        const  result = await vendorList();
        const PendingList = result.res.list.filter((item)=>item.Status ===4)
        setVenderList(PendingList.slice(0,e))
    }

    const handleInvoiceList =async () =>{
      try {
        setLoadingtwo(true)
        const  result = await vendorList(); 
        const PendingList = result.res.InvoiceList[0].lines.filter((item)=>item.Status ===4)
        setLoadingtwo(false)
        setInvoiceList(PendingList)
      } catch (error) {
        console.log(error)
      }      
  }



    useEffect(()=>{
        handleVendorList()
        handleInvoiceList()
    },[])

  return (
    <div>
      <Helmet>
        <title>Vendor Portal || Home</title>
      </Helmet>
        <div className="row">
        <div className="col-6">
          <div className="card mb-4">
            <div className="card-body chart-details ">
              <h4 className=" ">Purchase Contract By Status </h4>
              <div className="d-flex align-items-center justify-content-evenly">
                <ChartManeger />
                <div>
                  <div className="chart-label mb-2 d-flex align-items-center">
                    <div className="approved-pending-indicator me-2"></div>
                    <p>Admin Manager Pending </p>
                  </div>
                  <div className="chart-label d-flex align-items-center mb-2">
                    <div className="approved-indicator me-2"></div>{" "}
                    <p> VP Pending </p>
                  </div>
                  <div className="chart-label d-flex align-items-center">
                    <div className="approved me-2"></div> <p> Approved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card mb-4">
            <div className="card-body chart-details ">
              <h4 className=""> Bill By Status </h4>
              <div className="d-flex align-items-center justify-content-evenly">
                <ChartManeger />
                <div>
                  <div className="chart-label mb-2 d-flex align-items-center">
                    <div className="approved-pending-indicator me-2"></div>
                    <p>Admin Manager Pending </p>
                  </div>
                  <div className="chart-label d-flex align-items-center mb-2">
                    <div className="approved-indicator me-2"></div>{" "}
                    <p> VP Pending </p>
                  </div>
                  <div className="chart-label d-flex align-items-center">
                    <div className="approved me-2"></div> <p> Approved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="card">
        <div className="card-body">
          <h3 className="card-title">Purchase Contracts</h3>

          <div className="form-group row">
             <VpTables search={search} excutiveLists={vendorLists} handleVendorSort={handleVendorSort}  loading={loading} handleVendorList={handleVendorList}   />
          </div>
          
        </div>
      </div>
      <div className="card mt-4">
         <div className="card-body">
          <h3 className="card-title">Bills</h3>

          <div className="form-group row">
            <InvoiceListVp   invoiceList={invoiceList}  loading={loadingtwo} handleInvoiceList={handleInvoiceList}   />
          </div>
        </div>
    </div>
       
    </div>
  )
}

export default VpDashBoard
