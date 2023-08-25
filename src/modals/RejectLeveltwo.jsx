import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../Context';
import RejectByLevelContract from './RejectByLevelContract';
import { RejectedBYlist } from '../utils/services';
import RejectInvoice from './RejectInvoice';
import RejectByLevelInvoice from './RejectByLevelInvoice';

const RejectLeveltwo = ({ item,handleInvoiceList}) => {
  const [levelData,setLevelData] =useState([])
    const modalContext = useContext(ModalContext);
    const { handleModalData} = modalContext;
    
    const user = JSON.parse(localStorage.getItem("user"));

    const handleRejectModal = () => {
       const Reactpeople = <RejectInvoice item={item} handleInvoiceList={handleInvoiceList} />;
       handleModalData(Reactpeople, "md");
     };
     const handleRejectModalAt = () => {
      const Reactpeople = <RejectByLevelInvoice item={item} handleInvoiceList={handleInvoiceList} levelData={levelData} />;
      handleModalData(Reactpeople, "md");
    };

    const handleRejectlist =async() =>{
      const result  = await RejectedBYlist({
          "transactionId": user?.transactions[1]?.id, 
          "RoleId": user?.roles[0].id 
      
      })
      setLevelData(result.res.Approverlist )
      console.log(result)
      
    }
  
    useEffect(()=>{
      if(user?.transactions[2]?.id && user?.roles[0].id ){
          handleRejectlist()
      }
    },[])

    

  return (
    <div className='d-flex justify-content-between'>
      <button onClick={handleRejectModal} className='rejected-by-all'>Reject to Requester</button>
      <button className= {`${levelData.length === 0 ? 'reject-by-at-disable' :'reject-by-at' }`} onClick={handleRejectModalAt} disabled={levelData.length ===0} >Rejected At</button>
    </div>
  )
}

export default RejectLeveltwo
