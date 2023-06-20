import React, { useEffect, useState } from 'react'
import { vendorList } from '../../utils/services';
import VendorListTable from '../../component/common/VendorListTable';
import { toast } from 'react-toastify';

const VendorDashBoard = () => {
    const [search] =useState("")
    const [vendorLists,setVenderList] =useState([]);

    const handleVendorList =async () =>{       
        try {
          const  result = await vendorList();
          setVenderList(result.res.list.slice(0,4))
        } catch (error) {
          toast.error(" 500 server error please login Again")
        }
     }



    useEffect(()=>{
        handleVendorList()
    },[])


  return (
    <div>
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Contracts List</h3>

        <div className="form-group row">
          <VendorListTable search={search}  vendorLists={vendorLists} setVenderList={setVenderList} />
        </div>
      </div>
    </div>
  </div>
  )
}

export default VendorDashBoard