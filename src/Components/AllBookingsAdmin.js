import AuthService from "../Services/auth-service";
import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import UserService from "../Services/user-service";
import axios from "axios";
import Moment from 'react-moment';
import './Profile.css';
import ticket from '../Components/pic/ticket4.png';
import logo from '../Components/pic/logo.png';
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
    axios.get('http://localhost:8080/api/test/booking/allbookings').then((response)=>{
       setUsers(response.data);
       console.log(response);
   })}


  

  return (
  <>
    

  {/* <div className='container' style={{marginLeft:-280}}>
  <div className="row row-cols-1 row-cols-md-3 g-4"> */}


  <> 

     <div className='container'>
            <div className='py-4'>
            <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">USER NAME</th>
      <th scope="col">MOVIE NAME</th>
      <th scope="col">SEAT NO</th>
      <th scope="col">PRICE</th>
      
     
    </tr>
  </thead>
  <tbody>
  {users.map((user, index) => {
    return( <tr>
                <th scope="row" key={index}>{index+1}</th>
                <td>{user.username}</td>
                <td>{user.movieName}</td>
                <td>{user.seatno}</td>
                <td>{user.price}</td>
                
                <td>
        
      </td>
              </tr>
            )})}
  </tbody>
</table>
            </div>
            
        </div>        
  
  </>

 
  


{/* </div>
</div> */}

   
</>
  );
};

export default Profile;