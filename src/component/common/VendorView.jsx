import React, { useEffect, useState } from "react";
import { vendorView } from "../../utils/services";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import Icon from '@mdi/react';
import { mdiDownloadBox } from '@mdi/js';

const VendorView = () => {
    const [VendorItem,setVendorItems] =useState({})
    const { id } = useParams();

      const handleVendorView =async(id)=>{
           const result = await vendorView(id)
           setVendorItems(result.res)

      }


      useEffect(()=>{
        if(id){
            handleVendorView(id)
        }
      },[id])

     return (
      <>
      <div className="card border-secondary mt-4">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-4">
              <h6 className="d-inline">Vendor :</h6>
              <span className="mx-2">{VendorItem?.VendorName}</span>
            </div>

            <div className="col-md-4">
              <h6 className="d-inline">Start Date :</h6>
              <span className="mx-2">{moment(VendorItem?.StartDate).format()?.slice(0,10)}</span>
            </div>

            <div className="col-md-4">
              <h6 className="d-inline">Terms :</h6>
              <span className="mx-2">{VendorItem?.Term}</span>
            </div>
          </div>

           <div className="row mb-5">
             <div className="col-md-4">
              <h6 className="d-inline">Document No :</h6>
              <span className="mx-2">{VendorItem?.DocumentNo}</span>
             </div>

            <div className="col-md-4">
              <h6 className="d-inline">End Date :</h6>
              <span className="mx-2">{moment(VendorItem?.StartDate).format()?.slice(0,10)}</span>
            </div>

            <div className="col-md-4">
              <h6 className="d-inline">Subsidiary :</h6>
              <span className="mx-2">{VendorItem?.Subsidiary}</span>
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <div className="table-responsive">
              <h5 className="mb-4">Line Information</h5>

              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Base Rate</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {VendorItem?.lineItems?.map((row, index) => (
                          <tr key={index}>
                            <td>{row.ItemName}</td>
                            <td>{row.Rate}</td>
                            <td>{row.Quantity}</td>
                            <td>{row.Amount}</td>
                          </tr>
                        ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-12">
            <div className="table-responsive">
              <h5 className="mb-4">File Attachment</h5>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {VendorItem?.files?.map((row, index) => (
                          <tr key={index}>
                            <td>{row.FileName}</td>
                            <td><Icon path={mdiDownloadBox} size={1} /></td>
                            

                          </tr>
                        ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorView;
