import React, { useContext, useState } from 'react'
import { ModalContext } from '../Context';
import { Approvalprocess } from '../utils/services';

const VpApporve = ({item,handleVendorSort}) => {
    const [loading,setLoading] =useState(false)
    const modalContext = useContext(ModalContext);
    const { closeModal } = modalContext;
    const user = JSON.parse(localStorage.getItem('user'))

    const HandleAproved =async() =>{
      const result = await Approvalprocess({
         "transactionId":user?.transactions[2]?.id,
         "roleId" :user?.roles[0].id, 
         "contractId":item.id
      })
      handleVendorSort()
      closeModal()
    }

  return (
    <div>
        <h6 className='mb-4 delete-heading'>Are you sure you want to approve this Contract Type?</h6>
        <div className='mt-3 d-flex justify-content-between'>
                <button className='concel-btn-modal btn btn-danger' onClick={closeModal}>Cancel</button>
                <button className='btn btn-success' onClick={HandleAproved} >
                    {loading ?
                        <>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </>
                        : "Confirm"}

                </button>
            </div>
    </div>
  )
}

export default VpApporve