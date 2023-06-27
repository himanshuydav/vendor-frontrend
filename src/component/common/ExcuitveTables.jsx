import React, { useContext } from "react";

import Icon from "@mdi/react";
import { mdiFileDocumentEditOutline, mdiReceiptText } from '@mdi/js';
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../Context";
import Approve from "../../modals/Approve";


const ExcuitveTables = ({search,excutiveLists}) => {
 const navigate = useNavigate()
 const user = JSON.parse(localStorage.getItem('user'))
 const modalContext = useContext(ModalContext);
 const { closeModal, handleModalData } = modalContext;


  const handleViewVendorDetails =(id) =>{
    navigate(`/excuitve-view/${id}`);
  }

  const handleInvoiceClick = (id) => {
    navigate(`/add-invoice/${id}`);
  }

  const handleAproveModal =() =>{
    const Addpeople = <Approve />
    handleModalData(Addpeople, "sm")
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
                         <Icon path={mdiFileDocumentEditOutline} size={1} style={{ marginRight: '6px' }} onClick={() => handleViewVendorDetails(item.id)} />
                          {
                          item?.Status === "2" && <Icon path={mdiReceiptText} size={1} style={{ marginRight: '6px', color: "black" }} onClick={() => handleInvoiceClick(item.id)} />

                          }

                        {
                          user?.roles[0].RoleName ==="Admin Manager"  && item.Status ===1
                          &&
                          <>
                         <button className="ms-1 aprove-btn" onClick={()=>handleAproveModal()} >Aprove</button>
                         <button className="ms-2 delete-btn" >reject</button>
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

export default ExcuitveTables;
