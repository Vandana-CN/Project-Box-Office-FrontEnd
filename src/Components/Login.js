import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
import login_avtar from '../Components/pic/login_avtar.png';
import AuthService from "../Services/auth-service";
import AvtarMaker from '../Components/pic/AvatarMaker.png';
import loginpic from '../Components/pic/loginpic.jpeg';

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };


const Login = () => {
  let navigate = useNavigate();

  // const form = useRef();
  // const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // setMessage("");
    // setLoading(true);

    // form.current.validateAll();

  //  if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/home");
          window.location.reload();
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          // setLoading(false);
          // setMessage(resMessage);
        }
      );
  //  else {
  //     setLoading(false);
  //   }
  };

  return (
    <>
    
    <link rel="stylesheet"
href=
"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div className="col-md-12" >
   
      <div className="card card-container" style={{'borderRadius': 15}}>
        <img 
          style={{'width': 120,'height': 120}}
          src={AvtarMaker}
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label style={{fontSize: 20}} htmlFor="username">Username</label>
            <i style={{position: 'relative',left: 230,top: 20}} className="fa fa-envelope icon" ></i>
            <input
              
              placeholder="Username@gmail.com"
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              style={{'borderRadius': 20,marginTop:-10}}
            />
          </div>

          <div className="form-group">
            <label style={{fontSize: 20}} htmlFor="password">Password</label>
            <i style={{position: 'relative',top: 20,left: 230}}className="fa fa-lock" aria-hidden="true"></i>
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              style={{'borderRadius': 20,marginTop:-10}}
                          />
          </div>
          <br/>

          <div className="form-group">
            <button className="btn btn-primary btn-block" style={{backgroundColor: 'rgb(34, 37, 57)',border:'none'}}>
              <span>Login</span>
            </button>
          </div>

          {/* {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )} */}
          {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
