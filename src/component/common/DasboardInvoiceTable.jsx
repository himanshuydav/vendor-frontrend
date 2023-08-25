import React, { useContext, useEffect, useMemo, useState } from "react";
import { vendorList } from "../../utils/services";
import Icon from "@mdi/react";
import {
  mdiCheckboxMarkedCircleOutline,
  mdiCloseCircleOutline,
  mdiEye,
} from "@mdi/js";
import Spinner from "./Spinner";
import { ModalContext } from "../../Context";
import RejectInvoice from "../../modals/RejectInvoice";
import ApprovalInvoice from "../../modals/ApprovalInvoice";
import { useNavigate } from "react-router-dom";

import eyeIcon from "../../assets/images/eye.png";

import DashboardTable from "./DashboardTable";
import FinancePendingStatus from "../../assets/images/FinancePendingStatus";
import PaymentIcon from "../../assets/images/PaymentIcon";
import VpPendingIcon from "../../assets/images/VpPendingIcon";
import { RejectedIcon } from "../../assets/images/RejectedIcon";
import AdmpIcons from "../../assets/images/AdmpIcons";
import editicon from "../../assets/images/edit2.png"

const DasboardInvoiceTable = () => {
  const [invoiceList, InvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const modalContext = useContext(ModalContext);
  const { handleModalData } = modalContext;

  const handleAproveModal = (item) => {
    const approval_invoice = (
      <ApprovalInvoice item={item} handleInvoiceList={handleInvoiceList} />
    );
    handleModalData(approval_invoice, "md");
  };

  const handleRejectModal = (item) => {
    const Reactpeople = (
      <RejectInvoice item={item} handleInvoiceList={handleInvoiceList} />
    );
    handleModalData(Reactpeople, "md");
  };

  const handleInvoiceList = async () => {
    setLoading(true);
    const result = await vendorList();
    setLoading(false);
    InvoiceList(result.res.InvoiceList[0].lines);
    // console.log(result.res.InvoiceList)
  };


  useEffect(() => {
    handleInvoiceList();
  }, []);

  const handleViewInvoice = (id) => {
    navigate(`/view-invoice/${id}`);
  };
  

  const handleEditInvoice = (id) => {
    navigate(`/edit-invoice/${id}`);
  };




  const FeedsColumns = useMemo(
    () => [
      // {
      //   Header: "#",
      //   accessor: "sno",
      //   Cell: ({ row }) => {
      //     return row.index + 1;
      //   },
      // },
      {
        Header: "Bill No",
        accessor: "DocumentNo",
      },

      {
        Header: "Purchase Contract",
        accessor: "ContractDocId",
      },

      {
        Header: "Vendor Name",
        accessor: "LegalName",
      },
     

      
    
      {
        Header: "Amount",
        accessor: "InvoiceTotal",
        Cell: ({ row }) => {
          return <>INR {row?.original?.InvoiceTotal?.toFixed(2)} </>;
        },
      },
      {
        Header: "Status",
        accessor: "Name",
        Cell: ({ row }) => {
          return (
           <>
             {row.original.Name ==="Payment Pending" && <PaymentIcon/>}
             {row.original.Name ==="VP Pending" && <VpPendingIcon />}
             {row.original.Name ==="Finance Pending" && <FinancePendingStatus />}
             {
              row.original.Name ==="Rejected" && <RejectedIcon />
             }
             {
              row.original.Name==="Admin Manager Pending" &&   <AdmpIcons />
             }
           
           </>
          );
        },
      },
      {
        Header: "Action",
        accessor: (data) => {
          return (
            <>
              <div className="cursor-pointer d-flex align-items-center">
                <img
                  src={eyeIcon}
                  alt=""
                  style={{ marginRight: "6px" }}
                  onClick={() => handleViewInvoice(data.id)}
                />

                {user?.roles[0].RoleName === "Admin Manager" &&
                  data.Status === 1 && (
                    <>
                      <button
                        className="ms-1 aprove-btn"
                        onClick={() => handleAproveModal(data)}
                      >
                        <Icon path={mdiCheckboxMarkedCircleOutline} size={1} />
                      </button>
                      <button
                        className="ms-1 delete-btn"
                        onClick={() => handleRejectModal(data)}
                      >
                        <Icon path={mdiCloseCircleOutline} size={1} />{" "}
                      </button>
                    </>
                  )}
                  {
                    data.Status ===3 &&(
                      <>
                      <div onClick={() => handleEditInvoice(data.id)} className="ms-2">
                        <img src={editicon} alt="" />
                      </div>
                      </>
                    )
                  }

              </div>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <div>
       {loading ? (
              <Spinner />
            ) : (
              <>
                <DashboardTable columns={FeedsColumns} data={invoiceList} />
              </>
            )}
    </div>
  );
};

export default DasboardInvoiceTable;