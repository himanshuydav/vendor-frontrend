import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PaymentViewById, invoiceView } from "../../utils/services";
import streamlogo from "../../assets/images/streamlogo.png"
import Spinner from "./Spinner";
import { Helmet } from "react-helmet";
import moment from "moment";

const ViewPayment = () => {
    const { id } = useParams();
    const [loading,setLoading] =useState(false)
    const [ViewItem, setViewItem] = useState({});
    const navigate = useNavigate();

    const handleView = async (id) => {
        setLoading(true)
        const result = await PaymentViewById(id);
        setLoading(false)
        console.log(result);
        setViewItem(result.res.paymentInfo[0]);
    };

    useEffect(() => {
        if (id) {
            handleView(id);
        }
    }, [id]);

    return (
        <>
        <Helmet>
        <title>Vendor Portal || View Bill</title>
        </Helmet>
        {
            loading ? 
            <Spinner />
            :
            <>
              <button onClick={() => navigate(-1)} className="back-btn">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5881 6.60984C10.6496 6.67065 10.6984 6.74291 10.7317 6.82248C10.7651 6.90204 10.7822 6.98734 10.7822 7.07349C10.7822 7.15964 10.7651 7.24494 10.7317 7.32451C10.6984 7.40407 10.6496 7.47633 10.5881 7.53714L7.75673 10.3458L15.8401 10.3458C16.0151 10.3458 16.183 10.4147 16.3067 10.5375C16.4305 10.6602 16.5 10.8267 16.5 11.0003C16.5 11.1739 16.4305 11.3404 16.3067 11.4632C16.183 11.5859 16.0151 11.6549 15.8401 11.6549L7.75673 11.6549L10.5881 14.4646C10.7121 14.5876 10.7817 14.7544 10.7817 14.9283C10.7817 15.1022 10.7121 15.269 10.5881 15.3919C10.4642 15.5149 10.296 15.584 10.1207 15.584C9.9454 15.584 9.77727 15.5149 9.6533 15.3919L5.69408 11.4645C5.63256 11.4037 5.58375 11.3315 5.55045 11.2519C5.51714 11.1723 5.5 11.087 5.5 11.0009C5.5 10.9147 5.51714 10.8294 5.55045 10.7499C5.58375 10.6703 5.63256 10.598 5.69408 10.5372L9.6533 6.60984C9.7146 6.54882 9.78745 6.5004 9.86766 6.46736C9.94787 6.43433 10.0339 6.41732 10.1207 6.41732C10.2076 6.41732 10.2936 6.43433 10.3738 6.46736C10.454 6.5004 10.5268 6.54882 10.5881 6.60984Z" fill="black" />
                <circle cx="11" cy="11" r="10.5" stroke="black" />
                </svg>
             </button>
             <div className="card mt-4">
              {/* <div className="card-body">
            <div className='stream-logo'>
               <img src={streamlogo} alt="" />
            </div>
            
        </div> */}
        
        <div className='view-title'>
            <h3>BILL PAYMENT</h3>
        </div>
        <div className="card-body pb-2  d-flex justify-content-between">
                                <div className='view-address'>
                                    <h4>Bill To:</h4>
                                    <p>JSTREAMS SOLUTION PVT LIMITED,<br />
                                        <span>Address: </span>Unitech Cyber Park,  Unit No.- 1005 , 10th Floor, Tower C,
                                        Sector 39, Gurugram, Haryana,
                                        Pincode: 122003
                                    </p>
                                </div>
                                <div className='view-footer d-flex justify-content-end'>
                    <div className="view-footer-border">
                   
                    
                     <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                     <h5 className='px-3'> Billed Total:</h5>
                     <p>INR {ViewItem?.InvoiceTotal?.toFixed(2)}</p>
                     </div>
                  
                    <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                       <h5 className='px-3'>Tax Subtotal:</h5>
                       <p> {ViewItem?.TaxSubtotal &&"INR"} {ViewItem?.TaxSubtotal?.toFixed(2)}</p>
                    </div>
                    <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                     <h5 className='px-3'> Grand Total:</h5>
                     <p>INR {ViewItem?.GrandTotal?.toFixed(2)}</p>
                     </div>
                     <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                     <h5 className='px-3'> TDS Amount:</h5>
                     <p>INR {ViewItem?.TDSAmount?.toFixed(2)}</p>
                     </div>
                   
                     <div className='d-flex justify-content-end '>
                    <div className='view-total-amount  d-flex justify-content-between mt-1 align-items-center'>
                    <h5 className='px-3'>Total</h5>
                    <p>{ViewItem?.PayableAmount &&"INR"} {ViewItem?.PayableAmount?.toFixed(2)}</p>
                   </div>
                    </div>
                </div>
                
                   

            </div>
                               
                            </div>
               <div className="card-body ">
               <hr />
               <div className="row pt-2">
                <div className="col-3">
                    <div className='view-footer-detail d-flex align-items-center justify-content-between  '>
                       <h5 className=''>Transaction ID:</h5>
                       <p>{ViewItem?.TransactionId}</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className='view-footer-detail d-flex align-items-center justify-content-between  '>
                       <h5 className=''>Legal Name:</h5>
                       <p> {ViewItem?.LegalName}</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className='view-footer-detail d-flex align-items-center justify-content-between  '>
                       <h5 className=''>Amount Paid:</h5>
                       <p> {ViewItem?.AmountPaid &&"INR"} {ViewItem?.AmountPaid?.toFixed(2)}</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className='view-footer-detail d-flex align-items-center justify-content-between  '>
                       <h5 className=''>Payment Date:</h5>
                       <p> 
                       {moment(ViewItem?.CreatedAtt).format()?.slice(0, 10)} 
                       </p>
                    </div>
                </div>
                
            </div>
            <div className="row mt-3">
              <div className="col-3">
                    <div className='view-footer-detail d-flex align-items-center  justify-content-between '>
                       <h5 className=''>Bill#:</h5>
                       <p> {ViewItem?.InvoiceId}</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className='view-footer-detail  d-flex align-items-center justify-content-between '>
                       <h5 className=''>Reference Number:</h5>
                       <p> {ViewItem?.ReferenceNo ? ViewItem?.ReferenceNo :"N/A" } </p>
                    </div>
                </div>
               
                
               
                <div className="col-3">
                    <div className='view-footer-detail d-flex align-items-center justify-content-between '>
                       <h5 className=''>Due Date:</h5>
                       <p> {ViewItem?.DueDate ?moment(ViewItem?.DueDate).format()?.slice(0, 10) :"N/A" } </p>
                    </div>
                </div>
                <div className="col-3">
                    <div className='view-footer-detail d-flex align-items-center justify-content-between  '>
                       <h5 className=''>Status:</h5>
                       <p> {ViewItem?.StatusName}</p>
                    </div>
                </div>
            </div>
            <div className="row">
               
            </div>
       
        </div>
        <div className="card-body">
          

        </div>
         
   
         </div>
             
        </>
        }
          
        </>
    )

}

export default ViewPayment;
