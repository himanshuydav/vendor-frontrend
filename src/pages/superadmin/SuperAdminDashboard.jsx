import React, { useContext, useEffect, useMemo, useState } from 'react'
import { payMentList } from '../../utils/services';
import DashboardTable from '../../component/common/DashboardTable';
import PaymentIcon from '../../assets/images/PaymentIcon';
import { ModalContext } from '../../Context';
import PaymentModal from '../../modals/PaymentModal';
import payment from "../../assets/images/payment.png";
import fullypaid from "../../assets/images/fullypaid.png"
import partiallyicon from "../../assets/images/partially.png"
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import eye from "../../assets/images/eye.png";
import Table from '../../component/common/Table';
import ListingIcon from "../../assets/images/listingIcon.png"


const SuperAdminDashboard = () => {
     const [loading,setLoading] =useState(false);
     const [payementItems,setPayementItems] =useState([]);
     const modalContext = useContext(ModalContext);
     const { handleModalData } = modalContext;
     const navigate = useNavigate();

     const payementhandel =async()=>{
       const result  = await payMentList();
       console.log(result.res.paymentList,"check");
       setPayementItems(result.res.paymentList)
     }

     const handelpayNow =(item) =>{
            const Reactpeople =<PaymentModal item={item} payementhandel={payementhandel} />;
            handleModalData(Reactpeople, "md");
     }

     
  const handleView = (id) => {
    //  console.log(id)
    navigate(`/view-payment/${id?.InvoiceId}`);
  };

  const handlePaymentDetails = (id) => {
    navigate(`/payment-details/${id?.PaymentId}`);
  };


     const FeedsColumns = useMemo(
        () => [
          // {
          //   Header: "Payment ID",
          //   accessor: "PaymentId",
          
          // }, 
          
          {
            Header: "Bill No",
            accessor: "InvoiceId",
           
          },    
          {
            Header: "Grand Total",
            accessor: "GrandTotal",
            Cell: ({ row }) => {
                return (
                  <>
                    INR {row?.original?.GrandTotal?.toFixed(2) }
             
                   
                  </>
                );
              },
     
          },
          
          {
            Header: "TDS Amount",
            accessor: "TDSAmount",
            Cell: ({ row }) => {
              return (
                <>
                 INR {row?.original?.TDSAmount?.toFixed(2) }
           
                 
                </>
              );
            },
          
          },
            {
            Header: "Payment Amount ",
            accessor: "Total",
            Cell: ({ row }) => {
                return (
                  <>
                    INR {row?.original?.Total?.toFixed(2) }
             
                   
                  </>
                );
              },

          },

          
         
          
          {
            Header: <div className='text-center pe-5'>Status</div>,
            accessor: "StatusName",
            Cell: ({ row }) => {
                return (
                  <>
                    {row.original.StatusName === "Payment Pending" && <PaymentIcon />}
                    {row.original.StatusName === "Fully Paid" &&  <img src={fullypaid} alt="" />}
                    {row.original.StatusName === "Partially Paid" &&  <img src={partiallyicon} alt="" />}
                   
                  </>
                );
              },
          
          },
          {
            Header: "Action",
            accessor:((item)=>{
                return (
                    <>
                    <div className='d-flex '>
                    <img src={ListingIcon} alt="" className='cursor-pointer me-1' onClick={()=>handlePaymentDetails(item)}  />
                    {/* <img src={eye} alt="" onClick={()=>handleView(item)} className='cursor-pointer' /> */}
                    
                    {item.StatusName !== "Fully Paid" &&
                     <div className='d-flex justify-content-center ms-1'>
                     <img src={payment} alt="" onClick={()=>handelpayNow(item)} className='cursor-pointer' />
                    </div> 
                   }   
                      
                    </div>
                                              
                   </>
                );
            })

          },
         
        ],
        []
      );




     useEffect(()=>{
        payementhandel()
     },[])

     return (
     <>
          <Helmet>
              <title>Vendor Portal || Home</title>
          </Helmet>
          <div className="card mt-4">
          <div className="card-body">
          <h3 className="card-title">Payment</h3>

          <div className="form-group row">
            <Table columns={FeedsColumns} data={payementItems} />
             
          </div>
        </div>
      </div>   
     
     </>

  )
}

export default SuperAdminDashboard
