import React, { useEffect, useState } from "react";
import FinanceInvoice from "../../component/common/FinanceInvoice";
import { vendorList } from "../../utils/services";
import { Helmet } from "react-helmet";


const FinanceHome = () => {
    const [loading,setLoading] =useState(false);
    const [financeInvoiceList,setFinanceInvoiceList] =useState([])

    const handlePendingList =async () =>{
        try {
          setLoading(true)
          const  result = await vendorList();
          setLoading(false)
          const financefilterData =result.res.InvoiceList[0].lines.filter((item)=>item?.Name == 'Finance Pending')
          setFinanceInvoiceList(financefilterData)
          console.log(result,"Check")

        } catch (error) {
          console.log(error)
        }
        
    }
    console.log(financeInvoiceList,"Check data")
    

    useEffect(()=>{
        handlePendingList()
    },[])

  return (
    <div>
       <Helmet>
        <title>Vendor Portal || Home</title>
      </Helmet>
      <div className="card mt-4">
        <div className="card-body">
          <h3 className="card-title">Bills</h3>

          <div className="form-group row">
            <FinanceInvoice financeInvoiceList={financeInvoiceList} handlePendingList={handlePendingList} loading={loading}  />    
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceHome;
