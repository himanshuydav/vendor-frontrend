import React, { useEffect, useState } from 'react'
import { vendorList } from '../../../utils/services';
import ExcuitveTables from '../../../component/common/ExcuitveTables';
import ChartManeger from "../../../component/common/ChartManeger";
import InvoiceList from '../../../component/common/InvoiceList';
import { Helmet } from 'react-helmet';

const ExecutiveHome = () => {
    const [search,setSearch] =useState("")
    const [vendorLists,setVenderList] =useState([]);
    const [loading,setLoading] =useState(false);
    const [invoiceList,setInvoiceList] =useState([]);
    const [chartData,setChartData] =useState()

    const handlePendingList =async () =>{
        try {
          setLoading(true)
          const  result = await vendorList();
          setLoading(false)
          const PendingList = result.res.list.filter((item)=>item.Status ===1)
          setVenderList(PendingList.reverse())
          setInvoiceList(result.res.InvoiceList[0].lines)
          setChartData(result.res.InvoiceList[0].body)
        } catch (error) {
          console.log(error)
        }
        
    }

    console.log(chartData,"check")
    
 

    useEffect(()=>{
        handlePendingList()
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
              <h4 className="">Purchase Contract By Status </h4>
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
              <h4 className="text">Bill By Status </h4>
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
             <ExcuitveTables search={search} excutiveLists={vendorLists} loading={loading}  />
          </div>
        </div>
      </div>

      <div className="card mt-4">
      <div className="card-body">
        <h3 className="card-title">Bills</h3>

        <div className="form-group row">
          <InvoiceList search={search}  invoiceList={invoiceList}  loading={loading} />
        </div>
      </div>
    </div>
      
    </div>
   )
}

export default ExecutiveHome
