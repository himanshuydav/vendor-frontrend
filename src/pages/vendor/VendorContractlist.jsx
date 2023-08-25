import React, { useContext, useEffect, useMemo, useState } from "react";
import { vendorList } from "../../utils/services";
import Table from "../../component/common/Table";
import eyeIcon from "../../assets/images/eye.png";
import invoiceIcon from "../../assets/images/invoiceIcon.png";
import contractlisticon from "../../assets/images/contractlisticon.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Spinner from "../../component/common/Spinner";
import ApprovedIcon from "../../assets/images/ApprovedIcon";
import { RejectedIcon } from "../../assets/images/RejectedIcon";
import { Helmet } from "react-helmet";
import { ModalContext } from "../../Context";

const VendorContractlist = () => {
  const [invoiceList, InvoiceList] = useState([]);
  const [loading, setLoading] = useState(false)
  const modalContext = useContext(ModalContext);
  const { handleModalData } = modalContext;
  const navigate = useNavigate()



  const handleViewVendorDetails = (id) => {
    navigate(`/veiw/${id}`);
  }

  const handleInvoiceClick = (item) => {
    console.log(item, "check")
    if (item?.Difference === 0) {
      const ApproveModal = <><h1 className="text-center"> This Purchase Contract is Fully Billed</h1></>
      handleModalData(ApproveModal, "md");
    }
    else {
      navigate(`/add-invoice/${item.id}`);
    }
  };

  const handleVendorList = async () => {
    try {
      setLoading(true)
      const result = await vendorList();
      const approvedList = result.res.list.filter((item) => item.Name === "Approved" || item.Name === "Rejected").reverse()
      InvoiceList(approvedList);
      setLoading(false)
    } catch (error) {
      console.log(error);
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
          return (
            <>
              {row.original.Name === "Approved" && <ApprovedIcon />}
              {row.original.Name === "Rejected" && <RejectedIcon />}
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
                  data?.Name === "Approved" && <img src={invoiceIcon} alt="" style={{ marginRight: "6px" }} onClick={() => handleInvoiceClick(data)} />
                }
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    handleVendorList();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Vendor Portal || Purchase Contracts</title>
      </Helmet>

      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Purchase Contracts</h3>
          {
            loading ?
              <Spinner />
              :
              <Table columns={FeedsColumns} data={invoiceList} />
          }

        </div>
      </div>
    </div>
  );
};

export default VendorContractlist;
