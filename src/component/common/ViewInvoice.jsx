import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL, invoiceView } from "../../utils/services";
import streamlogo from "../../assets/images/streamlogo.png"
import downloadicon from "../../assets/images/download.png"
import Spinner from "./Spinner";
import { Helmet } from "react-helmet";
import { ModalContext } from "../../Context";
import ApproveViewBill from "../../modals/ApproveViewBill";
import RejectLevelViewBill from "../../modals/RejectLevelViewBill";
import moment from "moment";

const ViewInvoice = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [ViewItem, setViewItem] = useState({});
    const modalContext = useContext(ModalContext);
    const [viewStatus, setViewStatus] = useState();
    const location = useLocation();
    const { handleModalData } = modalContext;
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleView = async (id) => {
        setLoading(true)
        const result = await invoiceView(id);
        setLoading(false)
        console.log(result);
        setViewItem(result.res);
    };

    const handleApprove = () => {
        const ApproveModal = <ApproveViewBill id={id} />
        handleModalData(ApproveModal, "md");
    }

    const handleRejectModal = () => {
        const reject = <RejectLevelViewBill id={id} />
        handleModalData(reject, "md");
    }

    useEffect(() => {
        if (id) {
            handleView(id);
        }
    }, [id]);

    useEffect(() => {
        if (location?.state && location?.state?.Status) {
            setViewStatus(location.state.Status)
        }

    }, [location])

    const handleFinanceInvoiceCreation = () => {
        navigate(`/financr-invoice-creation/${id}`)
    }

    //   const handleRejectModal = (item) => {
    //     const Reactpeople = <RejectLeveltwo item={item} handleInvoiceList={handlePendingList}  />;
    //     handleModalData(Reactpeople, "md");
    //   };



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

                            <div className='view-title '>
                                <h3>Bill</h3>
                            </div>
                            <div className="card-body d-flex justify-content-between">
                                <div className='view-address'>
                                    <h4>Bill To:</h4>
                                    <p>JSTREAMS SOLUTION PVT LIMITED,<br />
                                        <span>Address: </span>Unitech Cyber Park,  Unit No.- 1005 , 10th Floor, Tower C,
                                        Sector 39, Gurugram, Haryana,
                                        Pincode: 122003
                                    </p>
                                </div>
                                <div className='view-bill-details'>
                                    <div className='d-flex justify-content-between'>
                                        <h5 className='px-3'>Bill#:</h5>
                                        <p>{ViewItem?.Id}</p>
                                    </div>

                                    <div className='d-flex justify-content-between'>
                                        <h5 className='px-3'>Reference No:</h5>
                                        <p> {ViewItem?.RefNo ? ViewItem.RefNo : 'N/A'}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <h5 className='px-3'>Date:</h5>
                                        <p> {moment(ViewItem?.CreatedDate).format('D/MM/YYYY')?.slice(0, 10)}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <h5 className='px-3'>Due Date:</h5>
                                        <p> {moment(ViewItem?.DueDate).format('D/MM/YYYY')?.slice(0, 10)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className='view-address mb-2'>
                                    <h4>Item Description</h4>
                                </div>
                                <div className='view-table mb-4'>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Item</th>
                                                <th className="text-end">Rate</th>
                                                <th className="text-end">Quantity</th>
                                                <th className="text-end">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody> 

                                            {ViewItem?.lineItems?.map((row, index) => (
                                                <tr key={index}>
                                                    <td className="text-left">{row.ItemName}</td>
                                                    <td className="text-end">INR {row?.Rate?.toFixed(2)}</td>
                                                    <td className="text-end"> {row?.Quantity?.toFixed(2)}</td>
                                                    <td className="text-end">INR {row?.Amount?.toFixed(2)}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>

                                </div> <div className='view-address mb-2'>
                                    <h4>File</h4>
                                </div>
                                <div className='view-table'>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="text-left">File Name</th>
                                                <th className="text-center">File Type</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {ViewItem?.files?.map((row, index) => (
                                                <tr key={index}>
                                                    <td className="text-left">{row.FileName}</td>
                                                    <td className="text-center">Pdf</td>
                                                    <td className="text-center">
                                                        <a
                                                            href={`${BASE_URL}/file/invoice/${row.FileId}`}
                                                        >
                                                            <img src={downloadicon} alt="" className='tableimg' />

                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                                <div className='view-footer d-flex justify-content-end'>
                                    <div>
                                        <div className='view-footer-detail d-flex justify-content-between mt-3'>
                                            <h5 className='px-3'>Legal Name:</h5>
                                            <p>{ViewItem?.VendorName} </p>
                                        </div>
                                        <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                                            <h5 className='px-3'>Purchase Contract:</h5>
                                            <p> {ViewItem?.DocumentNo}</p>
                                        </div>
                                        <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                                            <h5 className='px-3'>Sub Total:</h5>
                                            <p>INR {ViewItem?.InvoiceTotal?.toFixed(2)}</p>
                                        </div>
                                        {ViewItem?.Cgst && (
                                            <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                                                <h5 className='px-3'>CGST%:</h5>
                                                <p> {ViewItem?.Cgst}</p>
                                            </div>
                                        )}
                                        {ViewItem?.Sgst && (
                                            <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                                                <h5 className='px-3'>SGST%:</h5>
                                                <p> {ViewItem?.Sgst}</p>
                                            </div>
                                        )}
                                        {ViewItem?.UTgst && (
                                            <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                                                <h5 className='px-3'>UTGST%:</h5>
                                                <p>{ViewItem?.UTgst}</p>
                                            </div>
                                        )}
                                        {ViewItem?.Igst && (
                                            <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                                                <h5 className='px-3'>IGST%:</h5>
                                                <p> {ViewItem?.Igst}</p>
                                            </div>
                                        )}
                                        <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                                            <h5 className='px-3'>GST Total:</h5>
                                            <p> {ViewItem?.TaxSubtotal && "INR"} {ViewItem?.TaxSubtotal?.toFixed(2)}</p>
                                        </div>
                                        {ViewItem?.TDSAmount && (
                                            <div className='view-footer-detail d-flex justify-content-between mt-2 '>
                                                <h5 className='px-3'>TDS Amount:</h5>
                                                <p> {ViewItem?.TDSAmount}</p>
                                            </div>
                                        )}

                                    </div>

                                </div>

                            </div>
                            <div className='d-flex justify-content-end '>
                                <div className='view-total-amount  d-flex justify-content-between mt-1 align-items-center'>
                                    <h5 className='px-3'>Total</h5>
                                    <p>{ViewItem?.Total && "INR"} {ViewItem?.Total?.toFixed(2)}</p>
                                </div>
                            </div>
                            {
                                user?.roles[0].RoleName === "Admin Manager" && viewStatus === 1 &&
                                <div className="d-flex justify-content-end mt-4 me-2">
                                    <button className="btn btn-success me-3" onClick={handleApprove} >Approve</button>
                                    <button className="btn btn-danger" onClick={handleRejectModal} >Reject</button>
                                </div>
                            }
                            {
                                user?.roles[0].RoleName === "VP Operations" && viewStatus === 4 &&
                                <div className="d-flex justify-content-end mt-4 me-2">
                                    <button className="btn btn-success me-3" onClick={handleApprove} >Approve</button>
                                    <button className="btn btn-danger" onClick={handleRejectModal} >Reject</button>
                                </div>
                            }
                            {
                                user?.roles[0].RoleName === "Finance" && viewStatus === 5 &&
                                <div className="d-flex justify-content-end mt-4 me-2">
                                    <button className="btn btn-success me-3" onClick={handleFinanceInvoiceCreation} >Add TDS </button>
                                    <button className="btn btn-danger" onClick={handleRejectModal} >Reject</button>
                                </div>
                            }

                            <div className="card-body"></div>
                        </div>
                    </>
            }
        </>
    )
}

export default ViewInvoice;