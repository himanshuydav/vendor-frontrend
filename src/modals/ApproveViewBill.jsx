import React, { useContext, useState } from 'react'
import { ModalContext } from '../Context';
import { Approvalprocess } from '../utils/services';
import { useNavigate } from 'react-router-dom';

const ApproveViewBill = ({id}) => {
    const [loading,setLoading] =useState(false)
    const navigate = useNavigate();
    const modalContext = useContext(ModalContext);
    const { closeModal } = modalContext;
    const user = JSON.parse(localStorage.getItem('user'))

    const HandleAproved =async() =>{
      setLoading(true);
      const result = await Approvalprocess({
         "transactionId":user?.transactions[1]?.id,
         "roleId" :user?.roles[0].id, 
         "DocumentId":id
      })
      navigate("/")
      closeModal()
    }

  return (
    <div>
        <h6 className='mb-4 delete-heading'>Are you sure want to approve this Invoice?</h6>
        <div className='mt-3 d-flex justify-content-between'>
                <button className='concel-btn-modal btn btn-danger' onClick={closeModal}>Cancel</button>
                <button className='btn btn-success' onClick={HandleAproved} >
                    {loading ?
                        <>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </>
                        : "Approve"}
                </button>
            </div>
    </div>
  )
}

export default ApproveViewBill