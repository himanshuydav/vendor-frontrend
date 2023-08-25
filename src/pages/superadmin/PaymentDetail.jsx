import React, { useContext, useEffect, useMemo, useState } from 'react'
import { PaymentGetById, payMentList } from '../../utils/services';
import PaymentIcon from '../../assets/images/PaymentIcon';
import { ModalContext } from '../../Context';
import PaymentModal from '../../modals/PaymentModal';
import payment from "../../assets/images/payment.png";
import fullypaid from "../../assets/images/fullypaid.png"
import partiallyicon from "../../assets/images/partially.png"
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import eye from "../../assets/images/eye.png";
import Table from '../../component/common/Table';
import Spinner from '../../component/common/Spinner';
import moment from 'moment';

const PaymentDetail = () => {
    const [loading,setLoading] =useState(false);
    const [payementItems,setPayementItems] =useState([]);
    const modalContext = useContext(ModalContext);
    const { handleModalData } = modalContext;
    const { id } = useParams();
    const navigate = useNavigate();

    const payementhandel =async(id)=>{
      setLoading(true) 
      const result  = await PaymentGetById(id);
      console.log(result.res,"check");
      setLoading(false) 
      setPayementItems(result.res.paymentInfo)
    }

    const handelpayNow =(item) =>{
           const Reactpeople =<PaymentModal item={item} payementhandel={payementhandel} />;
           handleModalData(Reactpeople, "md");
    }

    
 const handleView = (id) => {
    console.log(id)
    if(id?.PaymentTransactionId){
      navigate(`/view-payment/${id?.PaymentTransactionId}`);
    }
  
 };




 const FeedsColumns = useMemo(
  () => [
    {
      Header: "Transaction ID",
      accessor: "TransactionId",
      Cell: ({ row }) => {
        return (
          <>
          {
            row?.original?.TransactionId ?
            row?.original?.TransactionId
            :
            "N/A"
            
          }
          
           
          </>
        );
      },
    
    },
      {
      Header: "Paid Amount ",
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
      Header: "Paid to Vendor ",
      accessor: "TotalPaidAmount",
      Cell: ({ row }) => {
          return (
            <>
              INR {row?.original?.TotalPaidAmount?.toFixed(2) }
       
             
            </>
          );
        },

    },
    {
      Header: "Payment Date",
      accessor: "CreatedAt",
      Cell: ({ row }) => {
          return (
            <>
              {moment(row?.original?.CreatedAt).format()?.slice(0, 10)}    
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
              <img src={eye} alt="" onClick={()=>handleView(item)} className='cursor-pointer' />
              
              {/* {item.StatusName !== "Fully Paid" &&
               <div className='d-flex justify-content-center ms-1'>
               <img src={payment} alt="" onClick={()=>handelpayNow(item)} className='cursor-pointer' />
              </div> 
             }    */}
                
              </div>
                                        
             </>
          );
      })

    },
   
  ],
  []
);




    useEffect(()=>{
      if(id){
        payementhandel(id)
      }
      
    },[id])


  return (
    <div>
          <Helmet>
              <title>Vendor Portal || payment details</title>
          </Helmet>
          <div className="card mt-4">
          <div className="card-body">
          <h3 className="card-title">Payment Details</h3>
          {
            loading ? <Spinner />
            :
            <>
                <div className="form-group row">
                    <Table columns={FeedsColumns} data={payementItems} />
                    
                </div>
            </>
          }

          
        </div>
      </div>   
    </div>
  )
}

export default PaymentDetail