import React, { useEffect, useState } from "react";
import VendorListTable from "../../component/common/VendorListTable";
import { vendorList } from "../../utils/services";
import { PaginationControl } from "react-bootstrap-pagination-control";

const VenderHome = () => {
    const [search,setSearch] =useState("")
    const [vendorLists,setVenderList] =useState([]);
    const [loading,setLoading] =useState(false);
    const [perPage, setPerpage] = useState(10);
    const [totalItem,setTotalItem] =useState(0);
    const [page, setPage] = useState(1);

    const handleVendorList =async () =>{
        try {
          setLoading(true)
          const  result = await vendorList();
          setLoading(false)
          const approvedList = result.res.list.filter((item)=>item.Name === "Approved" || item.Name === "Rejected" ).reverse()
          setVenderList(approvedList.slice(0,10))
          setTotalItem(approvedList.length)
        } catch (error) {
          console.log(error)
        }
        
    }
    
    const handleVendorSort =async (e) =>{
        const  result = await vendorList();
        setVenderList(result.res.list.slice(0,e))
    }

    const handlePagination = async (page) => {
      setPage(page);
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const result = await vendorList();
      const slicedExcutiveLists = result.res.list.slice(startIndex, endIndex);
      const newList = slicedExcutiveLists.filter((item)=>item.Name === "Approved" || item.Name === "Rejected" ).reverse()
      setVenderList(newList);
    };




    useEffect(()=>{
        handleVendorList()
    },[])

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Contracts List</h3>

          <div className="form-group row">
            <div className="col-lg-3">
              <input  type="text" className="form-control" value={search}   placeholder="Search" onChange={(e)=>setSearch(e.target.value)}  />
            </div>

            <div className="col-lg-6"></div>

            <div className="col-lg-3" style={{ textAlign: "right" }}>
              <label>
                Show
                <select  onChange={(e)=>handleVendorSort(e.target.value)}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                entries
              </label>
            </div>

            <VendorListTable search={search} vendorLists={vendorLists} setVenderList={setVenderList} loading={loading} />

            <div className="mt-4">
              <PaginationControl
                page={page}
                between={4}
                total={totalItem}
                limit={10}
                changePage={(page) => {
                  handlePagination(page);
                }}
                ellipsis={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenderHome;
