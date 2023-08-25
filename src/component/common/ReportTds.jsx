import React, { useMemo, useState } from "react";
import { reportGenration } from "../../utils/services";
import Table from "../../component/common/Table";
import Spinner from "../../component/common/Spinner";
import exportIcon from "../../assets/images/export2.png"
import moment from "moment";

const ReportTds = () => {
  const [vendorName, setVendorName] = useState("");
  const [contractId, setContractId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [reportgentList,setReportList] =useState([])
  const [loading,setLoading] =useState(false);
  const [totalTds,setTotalTds] =useState('')
  const [totalAmount,setTotalAmount] =useState('')
  const [totalPaid,setTotalPaid] =useState('')

  const handleStartDateChange = (event) => {
    setFromDate(event.target.value);
    setToDate(event.target.value)
    console.log(event.target.value);
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const result = await reportGenration({
      "transactionId": 1,
      "InvoiceId":contractId,
      "Vendor":vendorName,
      "FromDate":fromDate,
      "ToDate": toDate,
      "Status":status
    });
    setLoading(false)
    setReportList(result.res.list);
     const TataltdsAmount =result.res.list.reduce((total, obj) => total + obj.TDSAmount, 0);
     const TatalGrandAmount =result.res.list.reduce((total, obj) => total + obj.Total, 0);
     const TatalPaidAmount =result.res.list.reduce((total, obj) => total + obj.AmountPaid, 0);
     setTotalTds(TataltdsAmount);
     setTotalAmount(TatalGrandAmount);
     setTotalPaid(TatalPaidAmount);
    // .reduce((total, num) => total + num, 0);
    console.log(result.res.list,"total tds") ;
  };



   const handleExport =()=>{
     
    const csvData = [
      ['Total TDS Amount','Total Amount','Total Amount Paid'],
      [totalTds,totalAmount,totalPaid],
      ['Total TDS Amount2','Total Amount2','Total Amount Paid2'],
      [totalTds,totalAmount,totalPaid]
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Tds.csv';
    link.click();
    URL.revokeObjectURL(url);

  }








  return (
    <div>
      <div className="card">
        <div className="card-body py-3">
           <div className="">

           </div>

         </div>
         <div className="card-body d-flex align-items-center justify-content-around py-3">
         
            <div className="">
               <p>Bill ID</p>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Bill ID"
                value={contractId}
                onChange={(e) => setContractId(e.target.value)}
              />
            </div>
            <div className="">
              <p>Transaction Status</p>
              <select
                class="form-select"
                aria-label="Default select example"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option selected value="">Select Status</option>
                <option value="Payment Pending">Payment Pending</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Fully Paid">Fully Paid</option>
              </select>
            </div>
            <div className="">
              <p>From Date</p>
              <input
                type="date"
                className="form-control"
                id="fromDate"
                value={fromDate}
                onChange={(e)=>setFromDate(e.target.value)}
              />
            </div>
            <div className="">
              <p>To Date</p>
              <input
                type="date"
                className="form-control"
                id="toDate"
                value={toDate}
                onChange={(e)=>setToDate(e.target.value)}
              />
            </div>
         
            <div className="">
              <button className="btn btn-success" onClick={handleSubmit}>
                Search
              </button>
            </div>
  
        </div>
        <hr className="m-0" />

        <div className="card-body">

          <div>
            {loading ? (
              <Spinner />
            ) : (
              <>
               <div className="card-body">
                {
                 reportgentList.length >0 ? 
                 <div className='perchase-terms-tabel mt-4'>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                   <h3 className='perchase-term '>Payment</h3>
                   <button className="exportbtn d-flex align-items-center " onClick={handleExport}><img src={exportIcon} alt="" className="me-1" /> Export </button>
                  </div>
                
                    <table className="table  table-striped">
                      <thead>
                        <tr>
                          <th className="text-left">Total TDS Amount</th>
                          <th className="text-left">Total Amount</th>
                          <th className="text-left">Total Amount Paid</th>
                        </tr>
                      </thead>
                      <tbody>
                                 
                          <tr >                            
                            <td className="text-left">INR {totalTds?.toFixed(2)}</td>
                            <td className="text-left">INR {totalAmount?.toFixed(2)}</td>
                            <td className="text-left">INR {totalPaid?.toFixed(2)}</td>                     
                          </tr>
                  
                     
                      </tbody>
                    </table>
               </div>
               :
                <><h3 className="text-center">No Data Found</h3> </>
                }
                 
                 </div>
              </>
            )}
          </div>
  
        </div>
      </div>
    </div>
  );
};

export default ReportTds;
