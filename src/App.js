import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Protected from './Components/Protected';
import ProtectedAuthorized from './Components/ProtectedAuthorized';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./Services/auth-service";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
//import Register from "./components/Register";
import Home from "./Components/Home";
import Book from  "./Components/Book";
import BookNew from  "./Components/BookNew";
import Profile from "./Components/Profile";
import AllBookingsAdmin from "./Components/AllBookingsAdmin";
import BoardUser from "./Components/BoardUser";
//import BoardModerator from "./components/BoardModerator";
import AdminBoard from "./Components/AdminBoard";
import DeleteMovie from "./Components/DeleteMovie";
import boxoffice from './Components/pic/boxoffice.png';
import home from './Components/pic/home.png';
import logout from './Components/pic/logout.png';
const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [getUserBoard, setUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setUserBoard(user.roles.includes("ROLE_USER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
   
  };
  return (
    <>
    <div>
      <nav className="navbar navbar-expand navbar-dark" style={{"backgroundColor":"rgb(34, 37, 57)","height":"75px"}}>
       
        <Link to={"/"} className="navbar-brand" style={{'marginLeft':15}}>
          {/* Box-Office */}
          <img style={{height:75,width:150}}  src={boxoffice}/>
        </Link>
        <div className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li> */}
          {/* {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}*/}
          {/* {showAdminBoard && (
            <>
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Add Movie
              </Link>
            </li>
            <li className="nav-item">
            <Link to={"/delete"} className="nav-link">
              Delete Movie
            </Link>
          </li>
          </>
          )}  */}

          {/* {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Delete
              </Link>
            </li>
          )}  */}
        {/* <i class="fa fa-home" style="font-size:48px;color:white"></i> */}

          {currentUser && (
            <>
            <li className="nav-item">
            
            <Link to={"/home"} className="nav-link" style={{'fontSize':'20px'}}>
              Home
            </Link>
            </li>
            {/* <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li> */}
            </>
          )}

{getUserBoard && (
<>
<li className="nav-item">
              <Link to={"/profile"} className="nav-link" style={{'fontSize':'20px'}}>
                {/* {currentUser.username} */}
                Bookings
              </Link>
            </li>
{/* <li className="nav-item">
  <Link to={"/Booking"} className="nav-link">
    BOOK APPOINTMENTS
  </Link>
</li>
<li className="nav-item">
  <Link to={"/profile"} className="nav-link">
    CHECK STATUS
  </Link>
</li> */}
</>

)}

          {showAdminBoard && (
            <>
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link" style={{'fontSize':'20px'}}>
                AddMovie
              </Link>
            </li>
            <li className="nav-item">
            <Link to={"/delete"} className="nav-link" style={{'fontSize':'20px'}}>
              DeleteMovie
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/AllBookingsAdmin"} className="nav-link" style={{'fontSize':'20px'}}>
              AllBookings
            </Link>
          </li>
          <li className="nav-item" style={{marginLeft: 500}}>
              <a href="/login" className="nav-link" onClick={logOut} style={{'fontSize':'20px'}}>
                LogOut
              </a>
            </li>
            <img style={{width:30,height:30, marginTop:8}} src={logout}/>
          </>
          )} 
          </div>
          
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            
            {/* <li className="nav-item">
              <Link to={"/profile"} className="nav-link" style={{'fontSize':'20px'}}>
                {currentUser.username}
                Bookings
              </Link>
            </li> */}
            <li className="nav-item" style={{marginLeft: 770}}>
              <a href="/login" className="nav-link" onClick={logOut} style={{'fontSize':'20px'}}>
                LogOut
              </a>
            </li>
            <img style={{width:30,height:30, marginTop:8}} src={logout}/>
          </div>
        
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link" style={{'fontSize':'20px'}}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/signup"} className="nav-link" style={{'fontSize':'20px'}}>
                Signup
              </Link>
            </li>

          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/home" element={<Home/>} /> */}
          <Route path="/home"  element={<Home/>} />
          <Route path="/login"  element={<Login/>} />
          <Route path="/signup"  element={<Signup/>} />
          {/* <Route path="/login" element={<Protected Component={Login}/>} />
          <Route path="/signup" element={<Protected Component={Signup}/>} /> */}
          <Route path="/profile" element={<Profile/>} />
          {/* <Route path="/AllBookingsAdmin" element={<AllBookingsAdmin/>} /> */}
          <Route path="/AllBookingsAdmin" element={<ProtectedAuthorized Component={AllBookingsAdmin}/>} />
          {/* <Route path="/Book" element={<ProtectedAuthorized Component={Book}/>}/>
          <Route path="/BookNew" element={<ProtectedAuthorized Component={BookNew}/>}/>
          <Route path="/user" element={<ProtectedAuthorized Component={BoardUser}/>} />
          <Route path="/admin" element={<ProtectedAuthorized Component={AdminBoard}/>} />
          <Route path="/delete" element={<ProtectedAuthorized Component={DeleteMovie}/>}/> */}
          {/* <Route path="/Book" element={<Book/>}/>  */}
          <Route path="/BookNew" element={<BookNew/>}/>
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/admin" element={<AdminBoard/>} />
          <Route path="/delete" element={<DeleteMovie/>}/>
        </Routes>
      </div>
    </div>
    </>
  );
};

export default App;