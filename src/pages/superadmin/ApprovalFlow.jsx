import React, { useEffect, useState } from "react";
import { ApprovalFlowApi, getNextRole, getRoles } from "../../utils/services";
import { toast } from "react-toastify";

const ApprovalFlow = () => {
  const [roles, setRoles] = useState([]);
  const [nextApprovallistzero, setNextApprovalListzero] = useState([]);
  const [nextApprovallistone, setNextApprovalListone] = useState([]);
  const [nextApprovallistTwo, setNextApprovalListTwo] = useState([]);
  const [nextApprovallistThree, setNextApprovalListThree] = useState([]);
  const [nextApprovallistFour, setNextApprovalListFour] = useState([]);


  // store aprove data //

   const [zeroLevel,setZeroLevel] =useState();
   const [oneLevel,setOneLevel] =useState();
   const [twoLevel,settwoLevel] =useState();
   const [threeLevel,setThreeLevel] =useState();
   const [fourLevel,setfourLevel] =useState();

  // transation method //
  const [transactionId,setTransactionId] =useState(2)
  const user = JSON.parse(localStorage.getItem('user'));



  const handleRoleApi = async () => {
    const result = await getRoles();
    setRoles(result.res.roleList);
    console.log(result.res.roleList);
  };

  const handleSelect = async (e) => {
    setZeroLevel(e.target.value)
    

    try {
      const result = await getNextRole(e.target.value);
      if(result.res.length === 0){
        toast.success("not upper level found")
      }
      setNextApprovalListzero(result.res);
      setNextApprovalListone([])
      setNextApprovalListTwo([])
      setNextApprovalListThree([])
      setNextApprovalListFour([])
      console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  };

  const handleSelectOne = async (e) => {
    setOneLevel(e.target.value)

    try {
      const result = await getNextRole(e.target.value);
      setNextApprovalListone(result.res);
      setNextApprovalListTwo([])
      setNextApprovalListThree([])
      setNextApprovalListFour([])

      // data store //
      settwoLevel()
      setThreeLevel()
      setfourLevel()
      console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  };

  const handleSelectTwo = async (e) => {
    settwoLevel(e.target.value)
    try {
      const result = await getNextRole(e.target.value);
      setNextApprovalListTwo(result.res);
      setNextApprovalListThree([])
      setNextApprovalListFour([])
      setThreeLevel()
      setfourLevel()
      console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  };

  const handleSelectThree = async (e) => {
    setThreeLevel(e.target.value)
    setNextApprovalListFour([])
    setfourLevel()
    try {
      const result = await getNextRole(e.target.value);
  
      setNextApprovalListThree(result.res);
      console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  };

  const handleSelectFour = async(e) =>{
   
    setfourLevel(e.target.value)
    try {
      const result = await getNextRole(e.target.value);
      setNextApprovalListFour(result.res);
      console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  }

  useEffect(() => {
    handleRoleApi();
  }, []);


  
  const handleSubmit =async() =>{


    let data2 = [zeroLevel,oneLevel,twoLevel,threeLevel,fourLevel]
    let data3 =[oneLevel,twoLevel,threeLevel,fourLevel]
    let result = data2.filter(item => item !== undefined)
    let result2 = data3.filter(item => item !== undefined)
     console.log(result);
     console.log(result2);
     try {
     let  response = await ApprovalFlowApi({
        "recordId":transactionId,
        "level0":result,
        "level1":result2
      })
      toast.success("sucess full added flow")
      console.log(response,"Check")
     } catch (error) {   
     }
 
  }



  return (
    <div>
    
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Approval Flow</h3>

          <div className="form-group row">
           
          <div className="mt-4">
          <div className="row mb-4 flow-level">
          <div className="col-3">
              <p className="mb-1">Transaction</p>
              <select
                class="form-select"
                aria-label="Default select example"
                value={transactionId}
               onChange={(e)=>setTransactionId(e.target.value)}
              >
                <option selected>Open this select menu</option>
                  {
                    user?.transactions?.map((item)=>(
                      <option value={item?.id}>{item?.Name}</option>
                    ))
                   }           
              </select>

          </div>
        </div>
        <div className="row flow-level">
          <div className="col-5 ">
            <div className="">
              <p className="mb-1">Level 0</p>
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
  
              
         
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div>
              <span className="mdi mdi-arrow-right-bold"></span>
            </div>

          </div>

          <div className="col-5">
            <div>
              <p className="mb-1">Level 1</p>
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
            <>
           
            <div className="col-5 mt-3">
              <div>
                <p className="mb-1">Level 2</p>
                <select class="form-select" aria-label="Default select example" onClick={(e)=>handleSelectTwo(e)}>
                  {nextApprovallistone?.map((item) => (
                    <option value={item?.Levels}>{item?.RoleName}</option>
                  ))}
                </select>
              </div>
            </div>

            </>
          )}

          {nextApprovallistTwo.length > 0 && (
            <>
              <div className="col-2 d-flex justify-content-center align-items-center">
               <div>
                 <span className="mdi mdi-arrow-right-bold"></span>
               </div>
             </div>
             <div className="col-5 mt-3">
              <div>
                <p className="mb-1">Level 3</p>
                <select class="form-select" aria-label="Default select example" onClick={(e)=>handleSelectThree(e)} >
                  {nextApprovallistTwo?.map((item) => (
                    <option value={item?.Levels}>{item?.RoleName}</option>
                  ))}
                </select>
              </div>
            </div>        
            </>
       
          )}
           {nextApprovallistThree.length > 0 && (
            <div className="col-5 mt-3">
              <div>
                <p className="mb-1">Level 3</p>
                <select class="form-select" aria-label="Default select example">
                  {nextApprovallistThree?.map((item) => (
                    <option value={item?.Levels}>{item?.RoleName}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
           {nextApprovallistFour.length > 0 && (
            <div className="col-5 mt-3">
              <div>
                <p className="mb-1">Level 4</p>
                <select class="form-select" aria-label="Default select example" onClick={(e)=>handleSelectFour(e)}>
                  {nextApprovallistFour?.map((item) => (
                    <option value={item?.Levels}>{item?.RoleName}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

           <div className="row mt-4">
             <div className=" d-flex justify-content-end">
               <button className="submitbtn" onClick={handleSubmit} >Submit</button>
             </div>
           </div>
        </div>
     
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalFlow;
