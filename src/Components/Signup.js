import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AuthService from "../Services/auth-service";
import login_avtar from '../Components/pic/login_avtar.png';
import AvtarMaker from '../Components/pic/AvatarMaker.png';

const Signup = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { email, username, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
//   const onSubmit = async (e) => {
//     e.preventDefault();
   

//      await axios.post("http://localhost:8080/api/auth/signup",user);
//      alert("Registered Succesfully")
//      navigate("/login")
//    };


const handleSignup = (e) => {
    e.preventDefault();

    
      AuthService.signup(email,username, password).then(
        () => {
            alert("Registered successfully");
          navigate("/login");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

         
        }
      );
  
  };

  return (
    <>   
    <link rel="stylesheet"
href=
"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> 
    <div className="col-md-12">
      <div className="card card-container" style={{'borderRadius': 15}}>
        <img
          style={{'width': 120,'height': 120}}
          src={AvtarMaker}
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={(e) => handleSignup(e)}>
        <div className="form-group">
            <label style={{fontSize: 20}} htmlFor="username">Email</label>
            <i style={{position: 'relative',left: 230,top:20}} class="fa fa-envelope icon" ></i>
            <input
              placeholder="Email"
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) =>onInputChange(e)}
              style={{'borderRadius': 20,marginTop:-10}}
              
            />
          </div>
          <div className="form-group">
            <label style={{fontSize: 20}} htmlFor="username">Username</label>
            <i style={{position: 'relative',top: 20,left: 230}}class="fa fa-user" aria-hidden="true"></i>
            <input
              placeholder="Username"
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) =>onInputChange(e)}
              style={{'borderRadius': 20,marginTop:-10}}
              
            />
          </div>

          <div className="form-group" style={{'paddingBottom':20}}>
            <label style={{fontSize: 20}} htmlFor="password">Password</label>
            <i style={{position: 'relative',top: 20,left: 230}}class="fa fa-lock" aria-hidden="true"></i>
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) =>onInputChange(e)}
              style={{'borderRadius': 20,marginTop:-10}}
                          />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" style={{backgroundColor: 'rgb(34, 37, 57)',border:'none'}}>
              
              <span>Signup</span>
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

export default Signup;