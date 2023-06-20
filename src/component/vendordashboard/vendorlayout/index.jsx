import React, { useState } from 'react'
import Header from '../../staffdashboard/layout/Header'
import VendorSidebar from './VenderSidenav'
import VendorMainBar from './VendorMainBar'


const VendorLayout = () => {
  const [togglerBar,setTogglerBar] =useState(true)


  return (
    <div>
        <Header  setTogglerBar={setTogglerBar}  togglerBar={togglerBar}  />
         <div className="Layout d-flex ">
            <div className="side-nav"> 
                <VendorSidebar />
            </div>
           
            <div className= {togglerBar ?  "page-container" :"page-container-full"}>
                 <VendorMainBar />
            </div>
         </div>
    </div>
  )
}

export default VendorLayout