import React from "react";

const SidebarToggler = () => {
  return (
    <React.Fragment>
      <ul>
        <li class="">
          <div class="py-4 nav-toggler   cursor-pointer ">
            <i class="mdi mdi-home menu-icon"></i>
            <div className="tooltips">
                <span >Home</span>
            </div>  
          </div>
         
        </li>
        <li class="">
          <div class="py-4 nav-toggler d-flex align-items-center justify-content-center cursor-pointer">
            <i class="mdi mdi-account-multiple menu-icon"></i>
            <div className="tooltips">
              <span >Contract</span>
               <ul>
                 <li>contract 1</li>
                 <li>contract 2</li>
              </ul>
            </div>
          
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default SidebarToggler;
