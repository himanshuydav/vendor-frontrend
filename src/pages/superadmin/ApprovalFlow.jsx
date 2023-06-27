import React, { useEffect, useState } from "react";
import { getNextRole, getRoles } from "../../utils/services";
import { toast } from "react-toastify";

const ApprovalFlow = () => {
  const [roles, setRoles] = useState([]);
  const [nextApprovallistzero, setNextApprovalListzero] = useState([]);
  const [nextApprovallistone, setNextApprovalListone] = useState([]);
  const [nextApprovallistTwo, setNextApprovalListTwo] = useState([]);
  const [nextApprovallistThree, setNextApprovalListThree] = useState([]);

  const handleRoleApi = async () => {
    const result = await getRoles();
    setRoles(result.res.roleList);
    console.log(result.res.roleList);
  };

  const handleSelect = async (e) => {
    try {
      const result = await getNextRole(e.target.value);
      setNextApprovalListzero(result.res);
      setNextApprovalListone([])
      setNextApprovalListTwo([])
      setNextApprovalListThree([])
      console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  };

  const handleSelectOne = async (e) => {
    try {
      const result = await getNextRole(e.target.value);
      setNextApprovalListone(result.res);
      setNextApprovalListTwo([])
      setNextApprovalListThree([])
      console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  };

  const handleSelectTwo = async (e) => {
    try {
      const result = await getNextRole(e.target.value);
      setNextApprovalListTwo(result.res);
      setNextApprovalListThree([])
      console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  };

  const handleSelectThree = async (e) => {
    try {
      const result = await getNextRole(e.target.value);
      setNextApprovalListThree(result.res);
      console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  };

  useEffect(() => {
    handleRoleApi();
  }, []);

  return (
    <div>
      <h1 className="text-center">Approval Flow </h1>

      <div className="mt-4">
        <div className="row">
          <div className="col-3 d-flex align-items-center justify-content-between">
            <div className="">
              <p className="mb-1">level 0</p>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => handleSelect(e)}
              >
                <option selected>Open this select menu</option>
                {roles?.map((items) => (
                  <option value={items?.Levels}>{items?.RoleName}</option>
                ))}
              </select>
            </div>
            <div className="">
               <span className="mdi mdi-arrow-right-bold"></span>
            </div>
          </div>

          <div className="col-3">
            <div>
              <p className="mb-1">level 1</p>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => handleSelectOne(e)}
              >
                {nextApprovallistzero?.map((item) => (
                  <option value={item?.Levels}>{item?.RoleName}</option>
                ))}
              </select>
            </div>
          </div>

          {nextApprovallistone.length > 0 && (
            <div className="col-3">
              <div>
                <p className="mb-1">level 2</p>
                <select class="form-select" aria-label="Default select example" onClick={(e)=>handleSelectTwo(e)}>
                  {nextApprovallistone?.map((item) => (
                    <option value={item?.Levels}>{item?.RoleName}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {nextApprovallistTwo.length > 0 && (
            <div className="col-3">
              <div>
                <p className="mb-1">level 3</p>
                <select class="form-select" aria-label="Default select example" onClick={(e)=>handleSelectThree(e)} >
                  {nextApprovallistTwo?.map((item) => (
                    <option value={item?.Levels}>{item?.RoleName}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
           {nextApprovallistThree.length > 0 && (
            <div className="col-3 mt-2">
              <div>
                <p className="mb-1">level 3</p>
                <select class="form-select" aria-label="Default select example">
                  {nextApprovallistThree?.map((item) => (
                    <option value={item?.Levels}>{item?.RoleName}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalFlow;
