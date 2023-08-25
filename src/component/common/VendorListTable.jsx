import React from "react";

import Icon from "@mdi/react";
import {mdiEye, mdiReceiptText} from "@mdi/js";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import moment from "moment";


const VendorListTable = ({search,vendorLists,loading}) => {
const navigate = useNavigate()



const handleViewVendorDetails =(id) =>{
    navigate(`/veiw/${id}`);
}

const handleInvoiceClick = (id) => {
  navigate(`/add-invoice/${id}`);
}


  return (
    <div>
       {
          loading ? <Spinner />
          :
          <table className="table  mt-2" id="MyTable">
          <thead className="table-heads">
            <tr>
              <th>#</th>
              <th className="text-center">Vendor Name</th>
              <th className="text-center">Document No</th>
              <th className="text-center">Start Date</th>
              <th className="text-center">End Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
         
          <tbody className="table-theme-1">
              {
                  vendorLists && vendorLists.filter((val) => {
                      if (search === "") {
                          return val;
                      }
                      else if (val && val.LegalName && val.LegalName.toLowerCase().includes(search.toLowerCase())) {
                          return val
                      }
                      else if (val && val.StartDate.substring(0, 10) && val.StartDate.substring(0, 10).toLowerCase().includes(search.toLowerCase())) {
                          return val
                      }
                      else if (val && val.EndDate.substring(0, 10) && val.EndDate.substring(0, 10).toLowerCase().includes(search.toLowerCase())) {
                          return val
                      }
                      else if (val && val.DocumentNo.substring(0, 10) && val.DocumentNo.substring(0, 10).toLowerCase().includes(search.toLowerCase())) {
                          return val
                      }
                      else if (val && val.Name.substring(0, 10) && val.Name.substring(0, 10).toLowerCase().includes(search.toLowerCase())) {
                        return val
                    }
                     
  
                  }).map((item,index)=>(
                        <tr key={index}>
                        <td>{ index + 1}</td>
                        <td className='text-center'>{item?.LegalName}</td>
                        <td className='text-center'>{item?.DocumentNo}</td>
                        <td className='text-left'> {moment(item.StartDate).format()?.slice(0, 10)}</td>
                        <td className='text-left'> {moment(item.EndDate).format()?.slice(0, 10)} </td>
                        <td className={`text-center ${item?.Name ==="Approved"? `text-success` :"text-danger"}`}>{item?.Name}</td>
                        <td style={{ textAlign: "center" }} >
                        <div className="cursor-pointer">
                        <Icon
                          path={mdiEye}
                          size={1}
                          style={{ marginRight: "6px" }}
                           onClick={() => handleViewVendorDetails(item.id)}
                          />
                          {
                           item?.Name === "Approved" && <Icon path={mdiReceiptText} size={1} style={{ marginRight: '6px', color: "black" }} onClick={() => handleInvoiceClick(item.id)} />
                          }
                        </div>
  
                      </td>
  
                    </tr>
  
                  ))
              }
  
              {
                vendorLists.length === 0 &&
                <tr>
                  <td colSpan="7" className="text-center">No data found</td>
                </tr>
              }
        
          </tbody>
        </table>   
        }
     
    </div>
  );
};

export default VendorListTable;
