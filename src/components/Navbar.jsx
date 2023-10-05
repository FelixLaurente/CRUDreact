import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { Button } from "react-bootstrap";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import * as FaIcons from "react-icons/fa";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

 

  // useEffect(() => {
  //   let username = localStorage.removeItem("logout"); // setItem()
  //   if (username === "" || username === null) {
  //     usenavigate("/logout");
  //   }
  // }, []);

  // const usenavigate = useNavigate();

  // useEffect(() => {
  //   let username = sessionStorage.getItem("username");
  //   if (username === "" || username === null) {
  //     usenavigate("/Login");
  //   }
  // }, []);

  return (
    
    <IconContext.Provider value={{ color: "#fff" }}>
     
      
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        
        <ul className="nav-menu-items" onClick={showSidebar}>
       
          <li className="navbar-toggle">
            <Link to="#" className="menu-close">
              <AiIcons.AiOutlineClose />
            </Link>
          
          </li>

          {SidebarData.map((item, index) => {
            return (
              <li     key={index} 
                      className={item.cName}>
                <Link to={item.path}>
                         {item.icon}                
                  <span>{item.title}</span>                
                </Link>  
               
              </li>
              
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Navbar;
