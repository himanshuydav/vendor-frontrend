import React, { useContext, useMemo } from "react";
import eyeIcon from "../../assets/images/eye.png";
import invoiceIcon from "../../assets/images/invoiceIcon.png";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import Spinner from "../../component/common/Spinner";
import DashboardTable from "./DashboardTable";
import ApprovedIcon from "../../assets/images/ApprovedIcon";
import { RejectedIcon } from "../../assets/images/RejectedIcon";
import { ModalContext } from "../../Context";

const DashboardVendorContractTable = ({vendorLists,loading}) => {
const navigate = useNavigate()
const modalContext = useContext(ModalContext);
const { handleModalData } = modalContext;

const handleViewVendorDetails =(id) =>{
    navigate(`/veiw/${id}`);
}

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
          return( 
          <>
           {row.original.Name === "Approved" && <ApprovedIcon /> }
           {row.original.Name === "Rejected" && <RejectedIcon /> }
          </>
          );
        },
      },
      {
        Header: "Action",
        accessor: (data) => {
          return (
            <>
              <div className="cursor-pointer">
                <img src={eyeIcon} alt="" style={{ marginRight: "6px" }} onClick={() => handleViewVendorDetails(data.id)} />
                {
                 data?.Name === "Approved" && <img src={invoiceIcon} alt="" style={{ marginRight: "6px" }}  onClick={() => handleInvoiceClick(data)} />
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
         {
            loading ? 
            <Spinner />
            :
            <DashboardTable columns={FeedsColumns} data={vendorLists} />
          }
    </div>
  );
};

export default DashboardVendorContractTable;
