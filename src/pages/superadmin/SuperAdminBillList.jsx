import React, { useEffect, useMemo, useState } from 'react'
import PaymentIcon from '../../assets/images/PaymentIcon';
import VpPendingIcon from '../../assets/images/VpPendingIcon';
import FinancePendingStatus from '../../assets/images/FinancePendingStatus';
import { RejectedIcon } from '../../assets/images/RejectedIcon';
import AdmpIcons from '../../assets/images/AdmpIcons';
import eyeIcon from "../../assets/images/eye.png";
import { useNavigate } from 'react-router-dom';
import { vendorList } from '../../utils/services';
import Spinner from '../../component/common/Spinner';
import Table from '../../component/common/Table';
import { Helmet } from 'react-helmet';

const SuperAdminBillList = () => {
    const [loading,setLoading] =useState(false);
    const [superAdminContractList,setSuperAdminContractList] =useState([]);
    const navigate = useNavigate();
  
    const handleVendorList = async () => {
      try {
        setLoading(true);
        const result = await vendorList();
        setLoading(false);
        setSuperAdminContractList(result?.res?.InvoiceList[0].lines.reverse());
        console.log(result?.res?.list)
        
      } catch (error) {
        console.log(error);
      }
    };


    const handleViewInvoice = (id) => {
        navigate(`/view-invoice/${id}`);
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
            Header: <div className='ps-5'>Status</div>,
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
                  <div className="cursor-pointer">
                    <img
                      src={eyeIcon}
                      alt=""
                      style={{ marginRight: "6px" }}
                      onClick={() => handleViewInvoice(data.id)}
                    />
    
                  
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
   <>
      <Helmet>
      <title>Vendor Portal || Bill</title>
     </Helmet>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Bills</h3>
          <div>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Table columns={FeedsColumns} data={superAdminContractList} />
              </>
            )}
          </div>
        </div>
      </div>
   </>
  )
}

export default SuperAdminBillList