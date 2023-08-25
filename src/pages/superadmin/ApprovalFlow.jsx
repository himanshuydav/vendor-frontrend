import React, { useContext, useEffect, useState } from "react";
import { ApprovalFlowApi, approvalList, getNextRole, getRoles } from "../../utils/services";
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline'
import { FaBug, FaRegCalendarCheck, FaRegFileAlt,FaUser } from 'react-icons/fa'
import { toast } from "react-toastify";
import Spinner from "../../component/common/Spinner";
import { Helmet } from "react-helmet";
import { ModalContext } from "../../Context";

const ApprovalFlow = () => {
  const [roles, setRoles] = useState([]);
  const [nextApprovallistzero, setNextApprovalListzero] = useState([]);
  const [nextApprovallistone, setNextApprovalListone] = useState([]);
  const [nextApprovallistTwo, setNextApprovalListTwo] = useState([]);
  const [nextApprovallistThree, setNextApprovalListThree] = useState([]);
  const [nextApprovallistFour, setNextApprovalListFour] = useState([]);
  const [loading,setLoading] =useState(false);
  const modalContext = useContext(ModalContext);
  const { handleModalData } = modalContext;

  // aprval flow //
  const [approvallist,setApprovalList] =useState([]);
  const [count,setCount] =useState();


  // store aprove data //

   const [zeroLevel,setZeroLevel] =useState();
   const [oneLevel,setOneLevel] =useState();
   const [twoLevel,settwoLevel] =useState();
   const [threeLevel,setThreeLevel] =useState();
   const [fourLevel,setfourLevel] =useState();

  // transation method //
  const [transactionId,setTransactionId] =useState()
  const user = JSON.parse(localStorage.getItem('user'));



  const handleRoleApi = async () => {
    const result = await getRoles();
    setRoles(result.res.roleList);
    console.log(result.res.roleList);
  };

  const handleTransactionId =async (e) =>{
      setTransactionId(e.target.value)
      try {
      const result = await approvalList({
        "transactionId":e.target.value
      })
      setApprovalList(result.res.lines);
      setCount(result.res.body[0].count)
      
    } catch (error) {
      toast.error("No metrix found")
    }
    // console.log()
  }

  const handleSelect = async (e) => {
 
      setZeroLevel(e.target.value)
      const filterRole = roles.filter((item)=>item.id != e.target.value)
      console.log(filterRole, "Check data");
   
      setNextApprovalListzero(filterRole);
      setNextApprovalListone([])
      setNextApprovalListTwo([])
      setNextApprovalListThree([])
      setNextApprovalListFour([])
       
  
  };

  const handleSelectOne = async (e) => {
  
    setOneLevel(e.target.value)

    try {
      const filterRole = nextApprovallistzero.filter((item)=>item.id != e.target.value)
      console.log(filterRole, "Check data");
      setNextApprovalListone(filterRole);
      setNextApprovalListTwo([])
      setNextApprovalListThree([])
      setNextApprovalListFour([])

      // data store //
      settwoLevel()
      setThreeLevel()
      setfourLevel()
      // console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  };

  const handleSelectTwo = async (e) => {
  
    settwoLevel(e.target.value)
    try {
      const filterRole = nextApprovallistone.filter((item)=>item.id != e.target.value)
      console.log(filterRole, "Check data");
      setNextApprovalListTwo(filterRole);
      setNextApprovalListThree([])
      setNextApprovalListFour([])
      setThreeLevel()
      setfourLevel()
      console.log(filterRole, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  };

  const handleSelectThree = async (e) => {
    setThreeLevel(e.target.value)
    setNextApprovalListFour([])
    setfourLevel()
    try {
      const filterRole = nextApprovallistTwo.filter((item)=>item.id != e.target.value)
      console.log(filterRole, "Check data");
  
      setNextApprovalListThree(filterRole);
      // console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  };

  const handleSelectFour = async(e) =>{
   
    setfourLevel(e.target.value)
    try {
      const filterRole = nextApprovallistThree.filter((item)=>item.id != e.target.value)
      console.log(filterRole, "Check data");
      setNextApprovalListFour(filterRole);
      // console.log(result.res, "Check");
    } catch (error) {
      toast.error(error.error || "row not found");
    }
  }

  useEffect(() => {
    handleRoleApi();
  }, []);

  
    const handleSubmit =async() =>{

     if(count ==0 ){
      let data2 = [zeroLevel,oneLevel,twoLevel,threeLevel,fourLevel]
      // let data3 =[oneLevel,twoLevel,threeLevel,fourLevel]
      let result = data2.filter(item => item !== undefined)
      let result2 = result.map((item,index) => index)
      
      if( result.length !=0 && result2.length !=0 ){
  
       console.log(result);
       console.log(result2);
       try {
        console.log(result,"check")
        setLoading(true)
       let  response = await ApprovalFlowApi({
          "recordId":transactionId,
          "RoleId":result,
          "level":result2
        })
        toast.success("sucessfull added flow")
        setLoading(false)
        console.log(response,"Check")
       } catch (error) {   
       }

      }
      else{
         toast.error("please select transaction field and level field")
      }

     }
     else{
      if(count !=0){
        const Reactpeople =<><h3 className="text-center">There are {count} pending items which need to Approved/Rejected  </h3></>;;
        handleModalData(Reactpeople, "md");
      }
      else{
        const Reactpeople =<><h3 className="text-center">Please Select Transation ID</h3></>;
        handleModalData(Reactpeople, "md");
      }
      
     }
   
 
  }

  console.log(count,"Check")



  return (
    <div>
       <Helmet>
           <title>Vendor Portal || Approval Flow</title>
         </Helmet>
    
      <div className="card">
        <div className="card-body">
          

          <h3 className="card-title">Approval Flow</h3>
          {
            loading? <Spinner />
            :
            <>
            <div className="mt-4">
          <Timeline minEvents={5} placeholder  >
            {
              approvallist?.map((item)=>(
                <TimelineEvent
                icon={FaUser}
                color={`${item?.RoleName ==="Admin Manager" ? '#87a2c7' : item?.RoleName =="VP Operations" ? '#9c2919' :item?.RoleName =="Finance" ? '#ffb171':'#0040a1' }`}
                title={item?.RoleName}
              />
              ))
            }
 
  
        </Timeline>
          </div>

          <div className="form-group row">
           
          <div className="mt-2">
          <div className="row mb-4 flow-level">
          <div className="col-3">
              <p className="mb-1">Transaction</p>
              <select
                class="form-select"
                aria-label="Default select example"
                value={transactionId}
                onChange={(e)=>handleTransactionId(e) }
              >
                <option >Please Select Transaction</option>
            
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
                value={zeroLevel}
                onChange={(e) => handleSelect(e)}
              >
                <option disabled>select role</option>
                {roles?.map((items) => (
                  <option value={items?.id}>{items?.RoleName}</option>
                ))}
              </select>
            </div>
  
              
        
          </div>
          {
          nextApprovallistzero.length > 0 &&
          <>
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
                value={oneLevel}
                onChange={(e) => handleSelectOne(e)}
              > 
                <option disabled>select role</option>
                {nextApprovallistzero?.map((item) => (
                  <option value={item?.id}>{item?.RoleName}</option>
                ))}
              </select>
            </div>
          </div>
          
          </>
         }
          

          {nextApprovallistone.length > 0 && (
            <>
           
            <div className="col-5 mt-3">
              <div>
                <p className="mb-1">Level 2</p>
                <select class="form-select" aria-label="Default select example" onClick={(e)=>handleSelectTwo(e)}>
                <option disabled>select role</option>
                  {nextApprovallistone?.map((item) => (
                    <option value={item?.id}>{item?.RoleName}</option>
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
                    <option value={item?.id}>{item?.RoleName}</option>
                  ))}
                </select>
              </div>
            </div>        
            </>
       
          )}
           {nextApprovallistThree.length > 0 && (
            <div className="col-5 mt-3">
              <div>
                <p className="mb-1">Level 4</p>
                <select class="form-select" aria-label="Default select example">
        
                  {nextApprovallistThree?.map((item) => (
                    <option value={item?.id}>{item?.RoleName}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
           {nextApprovallistFour.length > 0 && (
            <div className="col-5 mt-3">
              <div>
                <p className="mb-1">Level 5</p>
                <select class="form-select" aria-label="Default select example" onClick={(e)=>handleSelectFour(e)}>
           
                  {nextApprovallistFour?.map((item) => (
                    <option value={item?.id}>{item?.RoleName}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

           <div className="row mt-4">
             <div className=" d-flex justify-content-end">
               <button className="submitbtn" onClick={handleSubmit}  >Submit</button>
             </div>
           </div>
        </div>
     
          </div>
            
            
            
            </>
          }

          
        </div>
      </div>
    </div>
  );
};

export default ApprovalFlow;
