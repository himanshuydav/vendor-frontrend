import React, { useState } from "react";
import SIDEBAR_UL from "./vendorsidebarList";
import downArrow from "../../../assets/images/downArrow.png";
import subnavicon from "../../../assets/images/Polygon.svg"
import profilelogo from "../../../add-on/assets/images/logouser.png";
import { Link, NavLink } from "react-router-dom";

const VendorSidebar = () => {
    const [activeLink, setActiveLink] = useState({ 0: true });
    const [listShow, setListShow] = useState({ 0: true });
    const user = JSON.parse(localStorage.getItem('user'))





    const listHandler = (id, sublist, listRef) => {

        setActiveLink({ [id]: true });
        console.log(sublist)
        console.log(id)

        if (sublist !== undefined && !listShow[listRef]) {
            setListShow({ [listRef]: true });
        } else {
            setListShow({ [listRef]: false });
        }

    };

    return (
        <>
            <div className="menuhead">
                <div className="nav-avater">
                    <div className="nav-profile-image ">
                        <img src={profilelogo} alt="profile" />
                    </div>
                   <span className="login-status online">{user?.body[0]?.LegalName.slice(0,10)}</span>
                 </div>
            </div>
            <ul className="side-menu">
                {SIDEBAR_UL.map((list, id) => {
                    let sublist = list.sublist;
                    let listRef = list.ref;
                    let labelText = list.label;
                    let path = list.path;
                    let active = list.activelogo;
                    // let nonactive = list.nonactivelogo;


                    return (
                        <React.Fragment  key={id}>
                            <li
                                id={id}
                                onClick={() => {
                                    listHandler(id, sublist, listRef);
                                }}
                               

                            >

                                <Link
                                    to={`${path}`}
                                    onClick={() => {
                                        listHandler(id, sublist, listRef);
                                    }}
                                    className={activeLink[id] && "active"}
                                >
                                    <div className="navIcon d-flex align-items-center"> <div className={`${activeLink[id] ? "imagelogo" : "imagelogos"}  `}> {active} </div> <p className="ms-3"> {labelText}</p>  </div>


                                    {sublist && (
                                        <img
                                            src={downArrow}
                                            className={`downArrow ${listShow[listRef] && "upArrow"}`}
                                            alt="logo"
                                        />
                                    )}
                                </Link>
                            </li>


                            {
                                sublist && (
                                    <li className="p-0">
                                        <ul className={listShow[listRef] && "submenu"}>

                                            {list.sublist.map((list, id) => (

                                                <li   key={id} >
                                                    <NavLink to={`${list.path}`} activeclassname="active" className="subnavlist">
                                                        <div className="subnavIcon d-flex ps-4 align-items-center"> <div className="me-2 pb-1"><img src={subnavicon} alt="" /> </div><p>{list.label}</p></div>
                                                    </NavLink>
                                                </li>

                                            ))}

                                        </ul>
                                    </li>
                                )
                            }

                        </React.Fragment>
                    );
                })}
            </ul>
        </>
    );
};

export default VendorSidebar;


