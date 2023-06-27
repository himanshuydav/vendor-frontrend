import React, { useContext, useState } from 'react'
import { ModalContext } from '../Context';

const Approve = () => {
    const [loading,setLoading] =useState(false)
    const modalContext = useContext(ModalContext);
    const { closeModal } = modalContext;

    const HandleAproved =() =>{

    }

  return (
    <div>
        <h6 className='mb-4 delete-heading'>Are you sure you want to approve this Contract Type?</h6>
        <div className='mt-3 d-flex justify-content-between'>
                <button className='concel-btn-modal' onClick={closeModal}>Cancel</button>
                <button className='save-btn-modal' onClick={HandleAproved} >
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

export default Approve