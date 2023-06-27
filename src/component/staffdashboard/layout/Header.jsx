import React from 'react'
import logo from "../../../add-on/assets/images/streamlogo1.png";
import logo1 from "../../../add-on/assets/images/miniLogo.jpg";
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/authSlice';
import {useNavigate } from 'react-router-dom';



const Header = ({ setTogglerBar,togglerBar }) => {
  const user = JSON.parse(localStorage.getItem('user'))
     const navigate = useNavigate()
     const dispatch = useDispatch()

     const handlelogout =() =>{
        console.log("check")
        dispatch(logout())
        navigate('/login')
        
      }


     return (
        <header className='header'>
            <div className='streamlogo'>
            <div className={`${togglerBar ? 'stream-logo-section' :'stream-logo-section-mini'}  text-center navbar-brand-wrapper d-flex align-items-center
              justify-content-center`}>
                {
                  togglerBar ? 
                  <a className="navbar-brand brand-logo" href="https://www.streamssolutions.com/" target="_main"><img
                  src={logo} alt="logo" /></a>
                  :
                  <a className="navbar-brand brand-logo-mini" href="https://www.streamssolutions.com/" target="_main"><img
                  src={logo1} alt="logo" /></a>
                }  
           
            </div>
         </div>
           
         <div className='profile'>
         <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-between">
          <button className="navbar-toggler navbar-toggler align-self-center navbar-toggler-smallscreen" type="button" data-toggle="minimize" onClick={()=>setTogglerBar(!togglerBar)}>
            <span className="mdi mdi-menu"></span>
          </button>
      


        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-logout d-flex align-items-center px-4">
            <p className='mx-2 user-name'>{user?.roles[0]?.RoleName}</p>
            <button className="nav-link" onClick={()=>handlelogout()}>
              <i className="mdi mdi-power"></i>
            </button>
          </li>
        </ul>

         <button className="navbar-toggler navbar-toggler-right
          d-lg-none align-self-center" type="button" data-toggle="offcanvas" onClick={()=>setTogglerBar(!togglerBar)}  >
          <span className="mdi mdi-menu"></span>
         </button>
         </div>
              
         </div>

        </header >
    )
}

export default Header