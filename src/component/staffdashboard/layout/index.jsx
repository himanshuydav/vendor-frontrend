import React, { useState } from 'react'
import Header from './Header'

import Sidebar from './Sidenav'
import SidebarToggler from './SidebarToggler'
import MainWrapper from './MainWrapper'

const Layout = () => {
  const [togglerBar,setTogglerBar] =useState(true)
  return (
    <div>
        <Header  setTogglerBar={setTogglerBar}  togglerBar={togglerBar}  />
        <div className="Layout d-flex ">
          {
            togglerBar ?
            <div className="side-nav"> 
              <Sidebar /> 
            </div>
            :
            <div className="side-nav-togller">
               <SidebarToggler />
            </div>
           }    
           <div className= {togglerBar ?  "page-container" :"page-container-full"}>
              <MainWrapper />
          </div>
        </div>
    </div>
  )
}

export default Layout