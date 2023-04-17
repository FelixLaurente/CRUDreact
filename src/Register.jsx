import { useState } from "react";
import * as React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import bcrypt from 'bcryptjs';

// Axios.defaults.withCredentials = true;

const Register = () => {
  // e.preventDefault();
  const [registerStatus, setRegisterStatus] = useState("");
  const [id, setID] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const notify = () => {
    toast.success("ADDED", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const refreshPage = () => {
    navigate(0);
  };

  const navigate = useNavigate();
  // const validate = () => {
  //   let result = true;
  //   if (username === '' || username === null) {
  //     result = false;
  //     toast.warning("Please Enter Username");
  //   }
  //   if (password === '' || password === null) {
  //     result = false;
  //     toast.warning("Please Enter Password");
  //   }
  //   return result;
  // };
  const register = (e) => {
    e.preventDefault();
    if (IsValidate()) {
      Axios.post("http://localhost:3001/users/create", {
        id: id,
        username: username,
        fullname: fullname,
        password: password,
        email: email,
        phone: phone,
        place: place,
        address: address,
        gender: gender,
      }).then((response) => {
        if (response.data.message) {
          setRegisterStatus(response.data.message);
        } else {
          setRegisterStatus();
        }
      });
      notify(1);
      refreshPage(1);
    }
  };
  // const displayInfo = () => {
  //   console.log(
  //     username + fullname + password + email + phone + place + address + gender
  //   );
  // };

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (username == null || username === "") {
      isproceed = false;
      errormessage += " Username";
    }
    if (fullname == null || fullname === "") {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (password == null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (email == null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }
    if (phone == null || phone === "") {
      isproceed = false;
      errormessage += " Phone";
    }
    if (place == null || place === "") {
      isproceed = false;
      errormessage += " Place";
    }
    if (address == null || address === "") {
      isproceed = false;
      errormessage += " Address";
    }
    if (gender == null || gender === "") {
      isproceed = false;
      errormessage += " Gender";
    }
    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter valid email");
      }
    }
    return isproceed;
  };

  // const hanldeSubmit = (e) => {
  //   if(IsValidate()){

  //   e.preventDefault();
  //   let regobj={id, fullname, username, password, email, phone, place, address, gender}
  //   // console.log(regobj);

  //   fetch("http://localhost:3001/users",{
  //     method: "POST",
  //     headers:{'content-type' : 'application/json'},
  //     body:JSON.stringify(regobj)
  //   }).then((res)=>{
  //     toast.success('Registered Success.')
  //     navigate('login')
  //   }).catch((err)=>{
  //     toast.error('Failed:' +err.message);
  //   });
  // }
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(username)
  // }

  // const saltRounds = 10;
  // const hashedPassword = bcrypt.hashSync(password, saltRounds);
  // console.log(hashedPassword);
  // localStorage.setItem('login', JSON.stringify({email, hashedPassword}))

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form
          className="container"
          // onSubmit={handleSubmit}
          style={{ marginTop: "50px" }}
        >
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      User Name<span className="errmsg">*</span>
                    </label>
                    <input
                      type="text"
                      // onChange={(event) => {
                      //   setUsername(event.target.value);
                      // }}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Full Name<span className="errmsg">*</span>
                    </label>
                    <input
                      type="text"
                      // onChange={(event) => {
                      //   setFullname(event.target.value);
                      // }}
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Password<span className="errmsg">*</span>
                    </label>
                    <input
                      // onChange={(event) => {
                      //   setPassword(event.target.value);
                      // }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email<span className="errmsg">*</span>
                    </label>
                    <input
                      type="text"
                      // onChange={(event) => {
                      //   setEmail(event.target.value);
                      // }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Phone<span className="errmsg">*</span>
                    </label>
                    <input
                      type="number"
                      // onChange={(event) => {
                      //   setPhone(event.target.value);
                      // }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Country<span className="errmsg">*</span>
                    </label>
                    <select
                      type="text"
                      // onChange={(event) => {
                      //   setPlace(event.target.value);
                      // }}
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select Country</option>
                      <option value="india">India</option>
                      <option value="philippines">Philippines</option>
                      <option value="us">United State</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      type="text"
                      // onChange={(event) => {
                      //   setAddress(event.target.value);
                      // }}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                    ></textarea>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <br></br>
                    <input
                      type="radio"
                      check={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      name="gender"
                      value="male"
                      className="app-check"
                    ></input>
                    <label>Male</label>
                    <input
                      type="radio"
                      check={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      name="gender"
                      value="female"
                      className="app-check"
                    ></input>
                    <label>Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <Button
                type="submit"
                class="btn btn-primary"
                // onClick={() => {
                //   register();
                //   // addDetails();
                //   notify();
                //   refreshPage();
                // }}
                onClick={register}
              >
                Add Employee
              </Button>
              |
              <Link
                className="btn btn-danger"
                // onClick={() => props.onFormSwitch('Login')}
                to="/login"
              >
                Back
              </Link>
              {/* <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px', }}>{registerStatus}</h1> */}
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
