import React, { useContext, useEffect, useState } from "react";
import { BASE_URL, vendorView } from "../../utils/services";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import Spinner from "./Spinner";
import { Helmet } from "react-helmet";
import downloadicon from "../../assets/images/download.png"
import Approve from "../../modals/Approve";
import { ModalContext } from "../../Context";
import ViewApprove from "../../modals/ViewApprove";
import RejectLevelView from "../../modals/RejectLevelView";

const VendorView = () => {
  const [VendorItem, setVendorItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [viewStatus, setViewStatus] = useState()
  const navigate = useNavigate();
  const modalContext = useContext(ModalContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const { handleModalData } = modalContext;
  const location = useLocation();
  const Status = location?.state && location?.state;
  console.log(Status, "Check")

  const { id } = useParams();

  const handleVendorView = async (id) => {
    setLoading(true)
    const result = await vendorView(id);
    setLoading(false)
    setVendorItems(result.res);
  };

  useEffect(() => {
    if (id) {
      handleVendorView(id);
    }
  }, [id]);

  useEffect(() => {
    if (location?.state && location?.state?.Status) {
      setViewStatus(location.state.Status)
    }

  }, [location])

  const handleAproveModal = () => {
    const ApproveModal = (
      <ViewApprove id={id} />
    );
    handleModalData(ApproveModal, "md");
  };

  const handleRejectModal = () => {
    const ApproveModal = <RejectLevelView id={id} />;
    handleModalData(ApproveModal, "md");
  }


  console.log(VendorItem, "Check data")
  return (
    <>
      <Helmet>
        <title>Vendor Portal || View Purchase Contract</title>
      </Helmet>
      <button onClick={() => navigate(-1)} className="back-btn">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5881 6.60984C10.6496 6.67065 10.6984 6.74291 10.7317 6.82248C10.7651 6.90204 10.7822 6.98734 10.7822 7.07349C10.7822 7.15964 10.7651 7.24494 10.7317 7.32451C10.6984 7.40407 10.6496 7.47633 10.5881 7.53714L7.75673 10.3458L15.8401 10.3458C16.0151 10.3458 16.183 10.4147 16.3067 10.5375C16.4305 10.6602 16.5 10.8267 16.5 11.0003C16.5 11.1739 16.4305 11.3404 16.3067 11.4632C16.183 11.5859 16.0151 11.6549 15.8401 11.6549L7.75673 11.6549L10.5881 14.4646C10.7121 14.5876 10.7817 14.7544 10.7817 14.9283C10.7817 15.1022 10.7121 15.269 10.5881 15.3919C10.4642 15.5149 10.296 15.584 10.1207 15.584C9.9454 15.584 9.77727 15.5149 9.6533 15.3919L5.69408 11.4645C5.63256 11.4037 5.58375 11.3315 5.55045 11.2519C5.51714 11.1723 5.5 11.087 5.5 11.0009C5.5 10.9147 5.51714 10.8294 5.55045 10.7499C5.58375 10.6703 5.63256 10.598 5.69408 10.5372L9.6533 6.60984C9.7146 6.54882 9.78745 6.5004 9.86766 6.46736C9.94787 6.43433 10.0339 6.41732 10.1207 6.41732C10.2076 6.41732 10.2936 6.43433 10.3738 6.46736C10.454 6.5004 10.5268 6.54882 10.5881 6.60984Z" fill="black" />
          <circle cx="11" cy="11" r="10.5" stroke="black" />
        </svg>
      </button>
      <div className="card border-secondary mt-4">
        {
          loading ? <Spinner />
            :
            <>
              <div>
                <div className="card">
                  <div className="perchase-title">
                    <p>Purchase Contract - {VendorItem?.DocumentNo}</p>
                  </div>

                  <hr className='m-0' />
                  <div className="card-body">
                    <div className="row">

                      <div className="col-md-6 d-flex mb-3">
                        <h6 className="col-md-4">Vendor</h6>
                        <span className="col-md-2">:</span>
                        <div className="col-md-6">{VendorItem?.VendorName}</div>
                      </div>

                      <div className="col-md-6 d-flex mb-3">
                        <h6 className="col-md-4">Purchase Contract</h6>
                        <span className="col-md-2">:</span>
                        <div className="col-md-4">{VendorItem?.ContractId}</div>
                      </div>

                      <div className="col-md-6 d-flex mb-3">
                        <h6 className="col-md-4">Terms</h6>
                        <span className="col-md-2">:</span>
                        <span className="col-md-4">{VendorItem?.Term}</span>
                      </div>

                      <div className="col-md-6 d-flex mb-3">
                        <h6 className="col-md-4">Status</h6>
                        <span className="col-md-2">:</span>
                        <span className="col-md-4">{VendorItem?.StatusName}</span>
                      </div>

                      <div className="col-md-6 d-flex mb-3">
                        <h6 className="col-md-4">Subsidiary</h6>
                        <span className="col-md-2">:</span>
                        <span className="col-md-4">{VendorItem?.Subsidiary}</span>
                      </div>

                      <div className="col-md-6 d-flex mb-3">
                        <h6 className="col-md-4">Rejection Reason</h6>
                        <span className="col-md-2">:</span>
                        <span className="col-md-4">{VendorItem?.RejectionReason ? VendorItem.RejectionReason : 'N/A'}</span>
                      </div>

                      <div className="col-md-6 d-flex mb-3">
                        <h6 className="col-md-4">Start Date</h6>
                        <span className="col-md-2">:</span>
                        <span className="col-md-4">{moment(VendorItem?.StartDate).format()?.slice(0, 10)}</span>
                      </div>

                      <div className="col-md-6 d-flex mb-3">
                        <h6 className="col-md-4">Created At</h6>
                        <span className="col-md-2">:</span>
                        <span className="col-md-4">{moment(VendorItem?.CreatedAt).format()?.slice(0, 10)}</span>
                      </div>

                      <div className="col-md-6 d-flex mb-3">
                        <h6 className="col-md-4">End Date</h6>
                        <span className="col-md-2">:</span>
                        <span className="col-md-4">{moment(VendorItem?.EndDate).format()?.slice(0, 10)}</span>
                      </div>

                      <div className="col-md-6 d-flex mb-3">
                        <h6 className="col-md-4">Total</h6>
                        <span className="col-md-2">:</span>
                        <span className="col-md-4">{`INR ${VendorItem?.ContractTotal?.toFixed(2)}`}</span>
                      </div>

                    </div>

                    <div className='perchase-terms-tabel mt-3'>
                      <h3 className='perchase-term mb-2'>Item Description</h3>
                      <table className="table  table-striped">
                        <thead>
                          <tr>

                            <th className="text-right">Item</th>
                            <th className="text-left">Rate</th>
                            <th className="text-left">Quantity</th>
                            <th className="text-left">Amount</th>
                          </tr>
                        </thead>
                        <tbody>

                          {VendorItem?.lineItems?.map((row, index) => (
                            <tr key={index}>
                              <td className="text-right">{row.ItemName}</td>
                              <td className="text-left">INR {row?.Rate?.toFixed(2)}</td>
                              <td className="text-left">{row?.Quantity?.toFixed(2)}</td>
                              <td className="text-left">INR {row?.Amount?.toFixed(2)}</td>
                            </tr>
                          ))}

                        </tbody>
                      </table>

                    </div>

                    <div className='perchase-terms-tabel mt-4'>
                      <h3 className='perchase-term mb-2'>File Attachment</h3>
                      <table className="table  table-striped">
                        <thead>
                          <tr>
                            <th className="text-left">File Name</th>
                            <th className="text-left">File Type</th>
                            <th className="text-left">Time</th>
                            <th className="text-left">Action</th>
                          </tr>
                        </thead>
                        <tbody>


                          {VendorItem?.files?.map((row, index) => (
                            <tr key={index}>
                              <td className="text-left">{row.FileName}</td>
                              <td className="text-left">Pdf</td>
                              <td className="text-left">12 Jan 2023, 11:49:42 am</td>
                              <td className="text-left">
                                <a
                                  href={`${BASE_URL}/file/contract/${row.FileId}`}
                                >
                                  <img src={downloadicon} alt="" className='tableimg' />
                                  {/* <Icon path={mdiDownloadBox} size={1} /> */}
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {
                      user?.roles[0].RoleName === "Admin Manager" && viewStatus === 1 &&
                      <div className="d-flex justify-content-end mt-4">
                        <button className="btn btn-success me-3" onClick={handleAproveModal}>Approve</button>
                        <button className="btn btn-danger" onClick={handleRejectModal} >Reject</button>
                      </div>
                    }
                    {
                      user?.roles[0].RoleName === "VP Operations" && viewStatus === 4 &&
                      <div className="d-flex justify-content-end mt-4">
                        <button className="btn btn-success me-3" onClick={handleAproveModal}>Approve</button>
                        <button className="btn btn-danger" onClick={handleRejectModal} >Reject</button>
                      </div>
                    }

                  </div>
                </div>
              </div>
            </>
        }
      </div>
    </>
  );
};

export default VendorView;
