import { useEffect, useState } from "react";
import React from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarData } from "../components/SidebarData";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

function Reports() {
  const [EmployeeList, setEmployeeList] = useState([]);
  const [show, setShow] = useState(false);
  // add ka ulit ng mga ganito para sa mga fields na ieedit like name
  const [eID, setEID] = useState(0);
  const [newEmp, setNewEmp] = useState(0);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newCountry, setNewCountry] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newWage, setNewWage] = useState(0);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const handleClose = () => setShow(false);

  const editButton = (data) => {
    // netxt lagay mo dito yung set state nya
    setEID(data.id);
    setNewEmp(data.emp);
    setNewName(data.name);
    setNewAge(data.age);
    setNewCountry(data.country);
    setNewPosition(data.position);
    setNewWage(data.wage);
    setShow(true);
    // console.log(data);
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        EmployeeList.filter((data) => {
          return id !== data.id;
        })
      );
    });
  };

  const getEmployee = () => {
    Axios.get("http://localhost:3001/employee").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      emp: newEmp,
      name: newName,
      age: newAge,
      country: newCountry,
      position: newPosition,
      wage: newWage,
    }).then((response) => {
      setEmployeeList(
        EmployeeList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                emp: val.emp,
                name: val.name,
                age: val.age,
                country: val.country,
                position: val.position,
                wage: val.wage,
              }
            : val;
        })
      );
      // alert("UPDATED")
      setShow(false);
      getEmployee();
    });
  };
  const deletes = () => {
    toast.warning("DELETED", {
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

  const updated = () => {
    toast.info("UDAPTED", {
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
    getEmployee();
    // localStorage.setItem("userinfo", "pacs")
  }, []);
  // alert(localStorage.getItem("userinfo"))
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
    <>
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

      <div>
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
      </div>

      <div className="container">
        <Table striped bordered hover className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Country</th>
              <th>Position</th>
              <th>Wage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {EmployeeList.map((val, key) => {
              return (
                <tr>
                  <td> {val.emp} </td>
                  <td> {val.name} </td>
                  <td> {val.age} </td>
                  <td> {val.country} </td>
                  <td> {val.position} </td>
                  <td> {val.wage} </td>
                  <td>
                    <div className="flex">
                      <Link
                        to="#"
                        className="ai"
                        onClick={() => {
                          deleteEmployee(val.id);
                          deletes();
                        }}
                      >
                        <AiIcons.AiFillDelete />
                      </Link>

                      <Link
                        to="#"
                        className="ai"
                        onClick={() => {
                          editButton(val);
                        }}
                      >
                        <MdIcons.MdOutlineSecurityUpdateGood />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="employeeid"
                  autoFocus
                  value={newEmp} // tapos add mo to sa mga vields yung state value sa iba pang input
                  onChange={(event) => {
                    setNewEmp(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="name"
                  autoFocus
                  value={newName} // tapos add mo to sa mga vields yung state value sa iba pang input
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="age"
                  autoFocus
                  value={newAge} // tapos add mo to sa mga vields yung state value sa iba pang input
                  onChange={(event) => {
                    setNewAge(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="country"
                  placeholder="country"
                  autoFocus
                  value={newCountry} // tapos add mo to sa mga vields yung state value sa iba pang input
                  onChange={(event) => {
                    setNewCountry(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="position"
                  placeholder="position"
                  autoFocus
                  value={newPosition} // tapos add mo to sa mga vields yung state value sa iba pang input
                  onChange={(event) => {
                    setNewPosition(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="">
                <Form.Label>Wage</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="wage"
                  autoFocus
                  value={newWage} // tapos add mo to sa mga vields yung state value sa iba pang input
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="btn1"
              size="sm"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              className="btn1"
              size="sm"
              variant="primary"
              onClick={() => {
                updateEmployeeWage(eID);
                updated();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default Reports;
