import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "../components/SidebarData";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Button } from "react-bootstrap";
import HashLoader from "react-spinners/HashLoader";

function Home() {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);


  const usenavigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    let email = localStorage.getItem("email"); // setItem()
    if (email === "" || email === null) {
      usenavigate("/Login");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    usenavigate("/Login");
  };

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar mb-3">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="log">
            <Button variant="text" onClick={logout}>
              LOGOUT
            </Button>
          </div>
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

      <div
        className={
          "fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-800 opacity-70 flex flex-col items-center justify-center " +
          (!loading && "hidden")
        }
      >
        <HashLoader color="#fafa" loading={loading} size={120} />
        <p className="w-1/3 text-center text-white mt-10">
          This may take a few seconds, please don't close this page.
        </p>
      </div>

      <div className="home">
         
            <h1>Home</h1>
      
        </div>
    </div>
  );
}

export default Home;
