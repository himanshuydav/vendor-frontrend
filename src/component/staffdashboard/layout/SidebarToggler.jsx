import React from 'react'

const SidebarToggler = () => {

  return (
     <React.Fragment>
           <ul>
               <li className=''> 
                   <div className='py-4 nav-toggler d-flex align-items-center justify-content-center cursor-pointer'><i className="mdi mdi-home menu-icon" /></div>
               </li>
               <li className=''> 
                   <div className=' py-4 nav-toggler d-flex align-items-center justify-content-center cursor-pointer'><i class="mdi mdi-account-multiple menu-icon" /></div>
               </li>
           </ul>

     </React.Fragment>
  )
}

export default SidebarToggler
