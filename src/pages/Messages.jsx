import Axios from "axios";
import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarData } from "../components/SidebarData";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Messages() {
  const [id] = useState();
  const [emp, setEmp] = useState();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [sidebar, setSidebar] = useState(false);
  const usenavigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);
  const refreshPage = () => {
    usenavigate(0);
}

  const notify = () => {
    toast.success("ADDED", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    let email = localStorage.getItem("email"); // setItem()
    if (email === "" || email === null) {
      usenavigate("/Login");
    }
  }, []);
  
  //ADD
  const addEmployee = () => {
    Axios.post("http://localhost:3001/employee/create", {
      id: id,
      emp: emp,
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {});
  };

  //for testing in console
  //const displayInfo = () => {
  // console.log(emp + name + age + country + position + wage);
  return (

    <div className="App">
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


      <div className="information">
        <div className="offset-lg-0 col-lg-7">
          <form className="container">
            <div className="card">
              <div className="card-header">
                <h1>Employee Information</h1>
              </div>
              <div className="card-body">
                <div className="row">

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Employee ID<span className="errmsg">*</span>
                      </label>
                      <input
                        type="number"
                        onChange={(event) => {
                          setEmp(event.target.value);
                        }}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Name<span className="errmsg">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Age<span className="errmsg">*</span>
                      </label>
                      <input
                        type="number"
                        onChange={(event) => {
                          setAge(event.target.value);
                        }}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Country<span className="errmsg">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(event) => {
                          setCountry(event.target.value);
                        }}
                        className="form-control"
                      >
                      </input>
                    </div>
                  </div>
                  


                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Positon<span className="errmsg">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(event) => {
                          setPosition(event.target.value);
                        }}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Wage<span className="errmsg">*</span>
                      </label>
                      <input
                        type="number"
                        onChange={(event) => {
                          setWage(event.target.value);
                        }}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
               
                <Button
                  class="btn btn-primary"
                  onClick={() => {                   
                    refreshPage();
                    addEmployee();
                    notify();
                  }}
                >
                   
                  Add Employee
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Messages;
