import AuthService from "../Services/auth-service";
import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import UserService from "../Services/user-service";
import axios from "axios";
import Moment from 'react-moment';
import './Profile.css';
import ticket from '../Components/pic/ticket4.png';
import logo from '../Components/pic/boxoffice.png';
import logo1 from '../Components/pic/bms_black.jpg';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();


  const [users,setUsers]=useState([
    {
      movieName : "",
      username: "",
      price: "",
      seatno:"",
      date:""
    }
  ]);

  useEffect(() => {

    AllUsers();

  }, []);
  const AllUsers = async () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/test/booking/allbookings`).then((response)=>{
       setUsers(response.data);
       console.log(response);
   })}


  // useEffect(() => {
  //   UserService.getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response && error.response.data) ||error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);

  return (
  <>
    

  <div className='container'>
  <div className="row row-cols-1 row-cols-md-3 g-4">

  {users.map((user, index) => {
  if(user.username==currentUser.username){
  return(
  <> 
              
  <div className="col" >
  
    <div className="card" style={{'height':400,'width':300,'paddingLeft':0,'paddingRight':0,paddingTop:0}}>
    <img src={ticket} class="card-img-top" alt="..."/>
      <div className="card-body">
      <h3 style={{color:'grey'}}>
          <strong>{currentUser.username}</strong>
        </h3>
        <img src={logo} style={{height:60,width:60,marginLeft:200,marginTop:-55, borderRadius:5}} class="card-img-top" alt="..."/>
        <br/>
        <Moment style={{color:'black',fontWeight:"bold",color:'grey'}} date={user.date} format="DD/MM/YYYY"  />
        <br/>
        <br/>
        <h5 className="card-title" style={{color:'black',color:'grey'}}>{user.movieName}</h5>
        <br/>
        
        <h5 className="card-title" style={{color:'black',marginLeft:180,marginTop:-55,color:'grey'}}>S.NO  {user.seatno}</h5>
        {/* <h5 className="card-title" style={{color:'black'}}>{(user.date)}</h5> */}
        <br/>
        
        <h5 className="card-title" style={{color:'black',color:'grey'}}>{user.price}₹</h5>
      </div>
    </div>
  </div>
  
 

  </>

  )
  }
  })}

</div>
</div>

    {/* <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token</strong>{currentUser.accessToken}
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
        </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div> */}
    
    </>
  );
};

export default Profile;
