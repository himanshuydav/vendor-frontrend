import React, { useContext, useEffect, useMemo, useState } from "react";

import Icon from "@mdi/react";
import {
  mdiCheckboxMarkedCircleOutline,
  mdiCloseCircleOutline,
  mdiEye,
  mdiReceiptText,
} from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../Context";
import Approve from "../../modals/Approve";
import Spinner from "./Spinner";
import Reject from "../../modals/Reject";
import moment from "moment";
import DashboardTable from "./DashboardTable";
import PaymentIcon from "../../assets/images/PaymentIcon";
import VpPendingIcon from "../../assets/images/VpPendingIcon";
import FinancePendingStatus from "../../assets/images/FinancePendingStatus";
import { RejectedIcon } from "../../assets/images/RejectedIcon";
import AdmpIcons from "../../assets/images/AdmpIcons";
import eyeIcon from "../../assets/images/eye.png";
import Table from "./Table";
import ApprovedIcon from "../../assets/images/ApprovedIcon";
import { vendorList } from "../../utils/services";

import invoiceIcon from "../../assets/images/invoiceIcon.png"
import RejectedLevel from "../../modals/RejectedLevel";
import editcion from "../../assets/images/edit2.png";


const ExcutiveTableTwo = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const modalContext = useContext(ModalContext);
  const { handleModalData } = modalContext;

  const [vendorLists, setVenderList] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleVendorList = async () => {
    try {
      setLoading(true);
      const result = await vendorList();
      setLoading(false);
      setVenderList(result.res.list.reverse());
    } catch (error) {
      console.log(error);
    }
  };






  useEffect(() => {
    handleVendorList();
  }, []);


  const handleViewVendorDetails = (item) => {
    navigate(`/view/${item.id}`,{ state: item });
  };

  const handleEditVendor = (id) => {
    navigate(`/edit-contract/${id}`);
  };

  

  const handleInvoiceClick = (item) => {
    console.log(item,"check")
    if(item?.Difference === 0 ){
      const ApproveModal = <><h1 className="text-center"> This Purchase Contract is Fully Billed</h1></>
      handleModalData(ApproveModal, "md");
    }
    else{
      navigate(`/add-invoice/${item.id}`);
    }


    
  };

  const handleAproveModal = (item) => {
    const ApproveModal = (
      <Approve item={item} handleVendorList={handleVendorList} />
    );
    handleModalData(ApproveModal, "md");
  };

  const handleRejectModal = (item) => {
    const Reactpeople = <RejectedLevel item={item} handleVendorList={handleVendorList} />;
    handleModalData(Reactpeople, "md");
  };

  const FeedsColumns = useMemo(
    () => [

      {
        Header: "Purchase Contract",
        accessor: "DocumentNo",
      },

      {
        Header: "Vendor Name",
        accessor: "LegalName",
      },



      {
        Header: "Start Date",
        accessor: "StartDate",
        Cell: ({ row }) => {
          return <> {moment(row.original.StartDate).format()?.slice(0, 10)}</>;
        },
      },
      {
        Header: "End Date",
        accessor: "EndDate",
        Cell: ({ row }) => {
          return <> {moment(row.original.EndDate).format()?.slice(0, 10)}</>;
        },
      },
      {
        Header: "Status",
        accessor: "Name",
        Cell: ({ row }) => {
          return (
            <>
              {row.original.Name === "Payment Pending" && <PaymentIcon />}
              {row.original.Name === "Approved" && <ApprovedIcon />}
              {row.original.Name === "VP Pending" && <VpPendingIcon />}
              {row.original.Name === "Finance Pending" && (
                <FinancePendingStatus />
              )}
              {row.original.Name === "Rejected" && <RejectedIcon />}
              {row.original.Name === "Admin Manager Pending" && <AdmpIcons />}
            </>
          );
        },
      },
      {
        Header: "Action",
        accessor: (item) => {
          return (
            <>
              <div className="cursor-pointer d-flex " >
                <div>
                  <img
                    src={eyeIcon}
                    alt=""
                    style={{ marginRight: "6px" }}
                    onClick={() => handleViewVendorDetails(item)}
                  />

                </div>
                <div>
                  {item?.Status === 2 && (
                    <img
                    src={invoiceIcon}
                    alt=""
                    style={{ marginRight: "6px" }}
                    onClick={() => handleInvoiceClick(item)}
                    />


                  )}
                </div>


                <div className="d-flex align">
                  {user?.roles[0].RoleName === "Admin Manager" && item.Status === 1 && (
                    <>
                      <button
                        className="ms-1 aprove-btn"
                        onClick={() => handleAproveModal(item)}
                      >
                        <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="30.4469" height="30" rx="6" fill="#1AB859" />
                          <path d="M23.74 14.9591L21.8834 12.8438L22.1421 10.0436L19.3952 9.41969L17.9571 7L15.37 8.11093L12.7829 7L11.3448 9.41969L8.59791 10.036L8.85662 12.8362L7 14.9591L8.85662 17.0744L8.59791 19.8822L11.3448 20.5061L12.7829 22.9258L15.37 21.8073L17.9571 22.9182L19.3952 20.4985L22.1421 19.8746L21.8834 17.0744L23.74 14.9591ZM13.8482 18.7637L10.8045 15.72L11.8774 14.6471L13.8482 16.6103L18.8626 11.5959L19.9355 12.6764L13.8482 18.7637Z" fill="white" />
                        </svg>
                      </button>
                      <button
                        className="ms-1 delete-btn"
                        onClick={() => handleRejectModal(item)}
                      >
                        <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="30.4469" height="30" rx="6" fill="#FA0404" />
                          <path d="M19.3557 13.5801C20.5185 13.5801 21.6336 14.042 22.4559 14.8642C23.2781 15.6864 23.74 16.8016 23.74 17.9644C23.74 19.1272 23.2781 20.2424 22.4559 21.0646C21.6336 21.8868 20.5185 22.3487 19.3557 22.3487C18.1929 22.3487 17.0777 21.8868 16.2555 21.0646C15.4333 20.2424 14.9713 19.1272 14.9713 17.9644C14.9713 16.8016 15.4333 15.6864 16.2555 14.8642C17.0777 14.042 18.1929 13.5801 19.3557 13.5801ZM17.3819 15.9906C17.3072 16.0654 17.2652 16.1668 17.2652 16.2724C17.2652 16.3781 17.3072 16.4795 17.3819 16.5542L18.7921 17.9652L17.3835 19.373C17.3465 19.41 17.317 19.4539 17.297 19.5023C17.2769 19.5506 17.2665 19.6025 17.2665 19.6549C17.2665 19.7072 17.2767 19.7591 17.2968 19.8075C17.3168 19.8559 17.3461 19.8999 17.3831 19.9369C17.4201 19.974 17.4641 20.0034 17.5124 20.0235C17.5608 20.0436 17.6127 20.0539 17.665 20.054C17.7174 20.054 17.7693 20.0437 17.8177 20.0237C17.8661 20.0037 17.91 19.9743 17.9471 19.9373L19.3557 18.5288L20.7666 19.9389C20.8034 19.977 20.8474 20.0074 20.896 20.0283C20.9446 20.0491 20.9969 20.0601 21.0499 20.0606C21.1028 20.0611 21.1553 20.051 21.2042 20.0309C21.2532 20.0109 21.2977 19.9813 21.3352 19.9439C21.3726 19.9065 21.4022 19.862 21.4222 19.813C21.4423 19.764 21.4523 19.7115 21.4519 19.6586C21.4514 19.6057 21.4404 19.5534 21.4195 19.5047C21.3986 19.4561 21.3683 19.4121 21.3302 19.3754L19.92 17.9644L21.3318 16.5534C21.4044 16.4783 21.4446 16.3776 21.4437 16.2731C21.4428 16.1686 21.4008 16.0686 21.3269 15.9947C21.2531 15.9208 21.1531 15.8789 21.0486 15.878C20.9441 15.8771 20.8434 15.9172 20.7682 15.9898L19.3565 17.4008L17.9455 15.9898C17.8708 15.9151 17.7694 15.8732 17.6637 15.8732C17.558 15.8732 17.4567 15.9151 17.3819 15.9898V15.9906ZM14.1893 17.5658H7.59768L7.51637 17.5714C7.36631 17.592 7.22968 17.6689 7.13408 17.7864C7.03849 17.9039 6.99107 18.0533 7.00139 18.2044C7.01172 18.3556 7.07902 18.4971 7.18971 18.6005C7.30039 18.704 7.4462 18.7615 7.59768 18.7615H14.2348C14.1739 18.366 14.1586 17.9648 14.1893 17.5658ZM14.7577 15.5729H7.59768C7.4462 15.5729 7.30039 15.5153 7.18971 15.4119C7.07902 15.3085 7.01172 15.167 7.00139 15.0158C6.99107 14.8647 7.03849 14.7153 7.13408 14.5978C7.22968 14.4803 7.36631 14.4034 7.51637 14.3828L7.59768 14.3772H15.617C15.2753 14.733 14.9859 15.1356 14.7577 15.5729ZM22.345 11.1886H7.59768L7.51637 11.1942C7.36631 11.2148 7.22968 11.2917 7.13408 11.4092C7.03849 11.5267 6.99107 11.6761 7.00139 11.8272C7.01172 11.9783 7.07902 12.1199 7.18971 12.2233C7.30039 12.3267 7.4462 12.3843 7.59768 12.3843H22.345L22.4263 12.3788C22.5764 12.3581 22.713 12.2813 22.8086 12.1638C22.9042 12.0463 22.9516 11.8968 22.9413 11.7457C22.9309 11.5946 22.8636 11.453 22.753 11.3496C22.6423 11.2462 22.4965 11.1887 22.345 11.1886ZM22.345 8H7.59768L7.51637 8.00558C7.36631 8.02623 7.22968 8.10307 7.13408 8.22057C7.03849 8.33808 6.99107 8.48749 7.00139 8.63861C7.01172 8.78974 7.07902 8.93131 7.18971 9.03472C7.30039 9.13814 7.4462 9.19568 7.59768 9.19573H22.345L22.4263 9.19015C22.5764 9.1695 22.713 9.09266 22.8086 8.97515C22.9042 8.85765 22.9516 8.70824 22.9413 8.55711C22.9309 8.40599 22.8636 8.26442 22.753 8.161C22.6423 8.05759 22.4965 8.00005 22.345 8Z" fill="white" />
                        </svg>
                      </button>
                       <div onClick={() => handleEditVendor(item.id)} className=" ms-2">
                        <img src={editcion} alt="" />
                       </div>
                    </>
                  )}
                </div>
              </div>
            </>
          );
        },
      },
    ], []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Table columns={FeedsColumns} data={vendorLists} />
      )}
    </div>
  );
};

export default ExcutiveTableTwo;
