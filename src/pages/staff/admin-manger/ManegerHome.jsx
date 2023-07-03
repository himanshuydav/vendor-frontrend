import React, { useEffect, useState } from "react";
import { vendorList } from "../../../utils/services";
import ExcuitveTables from "../../../component/common/ExcuitveTables";

const ManegerHome = () => {
  const [search, setSearch] = useState("");
  const [vendorLists, setVenderList] = useState([]);

  const handleVendorList = async () => {
    try {
      const result = await vendorList();
      const PendingList = result.res.list.filter((item)=>item.Status ===1)
      setVenderList(PendingList.slice(0,10))
    } catch (error) {
      console.log(error);
    }
  };

  const handleVendorSort = async (e) => {
    const result = await vendorList();
    const PendingList = result.res.list.filter((item)=>item.Status ===1)
    setVenderList(PendingList.slice(0,e))
  };

  useEffect(() => {
    handleVendorList();
  }, []);

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
             <ExcuitveTables search={search} excutiveLists={vendorLists}  />
     
          </div>
        </div>
      </div>

  </div>
  );
};

export default ManegerHome;
