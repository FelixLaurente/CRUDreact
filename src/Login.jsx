import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import Axios from "axios";
// const bcrypt = require('bcrypt');
// const saltRounds = 10;





Axios.defaults.withCredentials = true;

const Login = () => {
  // const userRef = useRef();
  // const errRef  = useRef();
  const [loginStatus, SetLoginStatus] = useState("");
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  // const [errMsg, setErrMsg] = useState('');

  // const [success, setSuccess] = useState(false);

  // useEffect (() => {
  //   userRef.current.focus();
  // },[])

  // const usenavigate = useNavigate();

//   useEffect(() => {
//     setErrMsg('');
// },[username, password])

  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const usenavigate = useNavigate();


  // const ProceedLogin = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     ///implentation
  //     // console.log('proceed');
  //     Axios.post("http://localhost:3001/users" +username)
  //       .then((res) => {
  //         return res.json("http://localhost:3001/users");
  //       })
  //       .then((resp) => {
  //         //console.log(resp)
  //         if (Object.keys(resp).length === 0) {
  //           toast.error("Please Enter valid username");
  //         } else {
  //           if (resp.password === password) {
  //             toast.success("SUCCESS");
  //             sessionStorage.setItem("username", username);
  //             usenavigate("/Home");
  //           } else {
  //             toast.error("Please Enter valid credentials");
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         toast.error("Login Failed ");
  //       });
  //  }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDedault();
  //   // console.log(username);
  //   usernameupdate('');
  //   passwordupdate('');
  //   setSuccess(true);

  // } 

  
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    if (validate())
    Axios.post("http://localhost:3001/users/login", {
      username: username,
      password: password,
    }).then((response) => {
      SetLoginStatus(response.data[0].email);
      localStorage.setItem("email", (response.data[0].email));
      navigate('/home');
    });
  };
  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  // useEffect(() => {
  //   let username = localStorage.getItem("login"); // setItem()
  //   if (username === "" || username === null) {
  //     usenavigate("/Login");
      
  //   }
  // }, []);


  // const getHashedPassword = JSON.parse(localStorage.getItem('login')).hashedPassword

  // bcrypt.compare(password, getHashedPassword, function(err, isMatch){
  //   if(err){
  //     throw err;
  //   }else if(!isMatch){
  //     console.log("Password does not match");
  //   }else{
  //     console.log("Password matches!")
  //   }
  // })
  
  return (
    // <>
    //   {success ? (
    //       <section>
    //         <h1> You are log in!</h1>
    //         <br/>
    //         <p>
    //             <a href="#"> Got to Home</a>
    //         </p>
    //       </section>
    //   ) : (

      
    // <section>
    //   <p ref={errRef} className={errMsg ? "errmsg" :  
    //   "offscreen"} aria-live="assertive">{errMsg}</p>
    <div className="offset-lg-3 col-lg-6">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form 
        // onSubmit={ProceedLogin} 
        // onSubmit={handleSubmit}
        className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="username">
                  User Name<span className="errmsg">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  // ref={userRef}              
                  // value={username}
                  onChange={(e) => usernameupdate(e.target.value)}
                  className="form-control"
                  required
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password<span className="errmsg">*</span>
                </label>
                <input
                 id="password"
                //  ref={userRef}
                //  autoComplete="off"
                  type="password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="form-control"
                  required
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <Button
                type=""
                // onClick={() => props.onFormSwitch('Home')}
                onClick={login}
                className="btn btn-primary"
              >
                Login
              </Button>
              |
              <Link
                type="submit"
                className="btn btn-success"
                to="/register"
              >
                New User
              </Link>
              <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px', }}>{loginStatus}</h1>
            </div>
          </div>
        </form>
      </div>
    </div>
    // </section>
    //   )}
    // </>
  );
};


export default Login;
