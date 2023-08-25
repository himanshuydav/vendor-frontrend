import React, {useState } from "react";
import { reportGenration } from "../../utils/services";
import Spinner from "../../component/common/Spinner";
import moment from "moment";
import exportIcon from "../../assets/images/export2.png"


const ReportContract = () => {
  const [vendorName, setVendorName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [reportgentList,setReportList] =useState([])
  const [loading,setLoading] =useState(false)

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    console.log(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const result = await reportGenration({
      transactionId: 3,
      Status: status,
      Vendor: vendorName,
      StartDate: startDate,
      EndDate: endDate,
      DocumentNo: "",
    });
    setLoading(false)
    setReportList(result.res.list)
    console.log(result);
    // Perform any necessary actions with the selected date range
  };

  const handleExport =()=>{
    const csvData = [
      ['Purchase Contract', 'LegalName', 'StartDate','EndDate','Status'],
      ...reportgentList.map(person => [person.DocumentNo, person.LegalName, person.StartDate,person.EndDate,person.StatusName])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'PurchaseContract.csv';
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
        <div className="card-body d-flex align-items-center justify-content-between py-3">
         
            <div className="">
               <p>Vendor Name</p>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Vendor Name"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
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
                <option value="Approved">Approved</option>
                <option value="Admin Manager Pending">
                  Admin Manager Pending
                </option>
                <option value="VP Pending">VP Pending</option>
              </select>
            </div>
            <div className="">
              <p>Start Date</p>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div className="">
              <p>End Date</p>
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
                min={startDate}
              />
            </div>
            <div className="">
              <button className="btn btn-success" onClick={handleSubmit}>
                Search
              </button>
            </div>
  
        </div>
        <hr className="m-0" />

     

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
                   <h3 className='perchase-term '>Purchase Contract</h3>
                   <button className="exportbtn d-flex align-items-center " onClick={handleExport}><img src={exportIcon} alt="" className="me-1" /> Export </button>
                  </div>
                
                    <table className="table  table-striped">
                      <thead>
                        <tr>
                   
                          <th className="text-right">Purchase Contract</th>
                          <th className="text-left">Vendor</th>
                          <th className="text-left">StartDate</th>
                          <th className="text-left">EndDate</th>
                          <th className="text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                   
                        
                      {reportgentList?.map((row, index) => (
                          <tr key={index}>
                            <td className="text-right">{row.DocumentNo}</td>
                            <td className="text-left">{row?.LegalName}</td>
                            <td className="text-left">{moment(row.StartDate).format()?.slice(0, 10)}</td>
                            <td className="text-left">{moment(row.EndDate).format()?.slice(0, 10)}</td>
                            <td className="text-left">{row?.StatusName}</td>
                          </tr>
                        ))}
                      
                     
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
  );
};

export default ReportContract;
