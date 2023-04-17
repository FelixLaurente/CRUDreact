import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { SidebarData } from "../components/SidebarData";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Support() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const usenavigate = useNavigate();

  useEffect(() => {
    let email = localStorage.getItem("email"); // setItem()
    if (email === "" || email === null) {
      usenavigate("/Login");
    }
  }, []);
  
  return (
    <div >
      <IconContext.Provider value={{ color: "#fff" }}>
    <div className="navbar mb-3">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-close">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>

          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
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



          <>
    <div className='support'>
          <h1>
              SUPPORT
          </h1>
          </div>
          </>
    </div>

  )
}

export default Support