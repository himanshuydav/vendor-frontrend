import React, { useEffect, useMemo, useState } from 'react'
import { vendorList } from '../../utils/services';
import moment from 'moment/moment';
import PaymentIcon from '../../assets/images/PaymentIcon';
import VpPendingIcon from '../../assets/images/VpPendingIcon';
import FinancePendingStatus from '../../assets/images/FinancePendingStatus';
import { RejectedIcon } from '../../assets/images/RejectedIcon';
import AdmpIcons from '../../assets/images/AdmpIcons';
import ApprovedIcon from "../../assets/images/ApprovedIcon";
import Table from '../../component/common/Table';
import Spinner from '../../component/common/Spinner';
import eyeIcon from "../../assets/images/eye.png";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SuperadminContractlist = () => {
  const navigate = useNavigate();
  const [loading,setLoading] =useState(false);
  const [superAdminContractList,setSuperAdminContractList] =useState([])
  
  const handleVendorList = async () => {
    try {
      setLoading(true);
      const result = await vendorList();
      setLoading(false);
      setSuperAdminContractList(result?.res?.list.reverse());
      console.log(result?.res?.list)
      
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewVendorDetails = (id) => {
    navigate(`/view/${id}`);
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
        Header: <div className='ps-5'>Status</div>,
        accessor: "Name",
        Cell: ({ row }) => {
          return (
            <>
              {row.original.Name ==="Payment Pending" &&  <PaymentIcon />}
              {row.original.Name ==="Approved" &&  <ApprovedIcon />}
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
                  onClick={() => handleViewVendorDetails(item.id)}
                />

                </div>
               
                  
              </div>
            </>
          );
        },
      },
    ],[] );


  useEffect(() => {
    handleVendorList();
  }, []);
    
  return (
    <div>
      <Helmet>
            <title>Vendor Portal || Purchase Contract</title>
        </Helmet>
       <div className="card">
        <div className="card-body">
          <h3 className="card-title">Purchase Contracts</h3>
          {loading ? (
            <Spinner />
            ) : (
              <Table columns={FeedsColumns} data={superAdminContractList} />
            )}

          </div>
        </div>
    </div>
  )
}

export default SuperadminContractlist
