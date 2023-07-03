import React, { useContext } from "react";

import Icon from "@mdi/react";
import { mdiEye, mdiReceiptText } from '@mdi/js';
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../Context";
import VpApporve from "../../modals/VpApporve";


const VpTables = ({search,excutiveLists,handleVendorSort}) => {
 const navigate = useNavigate()
 const user = JSON.parse(localStorage.getItem('user'))
 const modalContext = useContext(ModalContext);
 const { handleModalData } = modalContext;


  const handleViewVendorDetails =(id) =>{
    navigate(`/manager-view/${id}`);
  }

  const handleInvoiceClick = (id) => {
    navigate(`/add-invoice/${id}`);
  }

  const handleAproveModal =(item ) =>{
    const Addpeople = <VpApporve item={item} handleVendorSort={handleVendorSort}  />
    handleModalData(Addpeople, "md")
  }

  const handleRejectModal =(item ) =>{
    const Addpeople ="reject contract list"
    handleModalData(Addpeople, "md")
  }



  return (
    <div>
      
      <table className="table table-bordered table-striped mt-2" id="MyTable">
        <thead>
          <tr>
            <th>Sno.</th>
            <th className="text-center">Vendor Name</th>
            <th className="text-center">Document No</th>
            <th className="text-center">Start Date</th>
            <th className="text-center">End Date</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
            {
                excutiveLists && excutiveLists.filter((val) => {
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
                      <td className='text-center'>{item.StartDate.substring(0, 10)}</td>
                      <td className='text-center'>{item.EndDate.substring(0, 10)}</td>
                      <td className='text-center'>{item?.Name}</td>
                      <td style={{ textAlign: "center" }} >
                      <div className="cursor-pointer d-flex justify-content-center">
                         <Icon path={mdiEye} size={1} style={{ marginRight: '6px' }} onClick={() => handleViewVendorDetails(item.id)} />
                          {
                           item?.Status === 2 && <Icon path={mdiReceiptText} size={1} style={{ marginRight: '6px', color: "black" }} onClick={() => handleInvoiceClick(item.id)} />

                          }

                        {
                          user?.roles[0].RoleName ==="VP Operations"  && item.Status === 4
                          &&
                          <>
                         <button className="ms-1 aprove-btn" onClick={()=>handleAproveModal(item)} >Approve</button>
                         <button className="ms-2 delete-btn" onClick={()=>handleRejectModal()} >Reject</button>
                          </>
                        }
                                 
                      </div>

                    </td>

                  </tr>

                ))
            }

            {
              excutiveLists?.length === 0 &&
              <tr>
                <td colSpan="7" className="text-center">No data found</td>
              </tr>
            }
      
        </tbody>
      </table>
    </div>
  );
};

export default VpTables;
