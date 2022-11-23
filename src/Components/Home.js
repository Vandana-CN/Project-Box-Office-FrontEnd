import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import UserService from "../Services/user-service";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import logo from '../Components/pic/logo.png';
import carousel1 from '../Components/pic/carousel1.png';
import carousel2 from '../Components/pic/carousel2.png';
import carousel3 from '../Components/pic/carousel3.png';
import carousel4 from '../Components/pic/carousel4.png';
import carousel5 from '../Components/pic/carousel5.png';
import carousel6 from '../Components/pic/carousel6.png';
import carousel7 from '../Components/pic/carousel7.png';
import AuthService from "../Services/auth-service";

// favicon.ico
const Home = () => {
  //carousel
  // function ControlledCarousel() {
  //   const [index, setIndex] = useState(0);
  
  //   const handleSelect = (selectedIndex, e) => {
  //     setIndex(selectedIndex);
  //   };}
  //carousel end


  const navigate = useNavigate();
  // const navigateToBook = () => {
  //   navigate('/Book');
  // };
 
  const navigateToBookNew = (val) => {

    const user = AuthService.getCurrentUser();

    if(user)
    {
      navigate('/BookNew',{
        state: {
          currentmoviename: val
        }
      });
      console.log(val);
    }
    else
    {
      navigate('/login');
    }

    
  
  };

  const [content, setContent] = useState("");

  const [users,setUsers]=useState([
    {
      movieName : ""
    }
  ]);

  useEffect(() => {

    AllUsers();

  }, []);

  // const AllUsers = async () => {

  //   //console.log("hello") 
  //   const res = await axios.get("http://localhost:8080/api/test/movie/allmovies");
  //   console.log(res.data);
 
  // };

  const AllUsers = async () => {
    axios.get('http://localhost:8080/api/test/movie/allmovies').then((response)=>{
       setUsers(response.data);
       console.log(response);
   })}


  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  
  function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} styl>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel2}
            alt="First slide"
            style={{width:"300px", height:"300px"}}
          />
          <Carousel.Caption>
            {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel3}
            alt="Second slide"
            style={{width:"300px", height:"300px"}}
          />
  
          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel5}
            alt="Third slide"
            style={{width:"300px", height:"300px"}}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel6}
            alt="Fourth slide"
            style={{width:"300px", height:"300px"}}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel7}
            alt="Fifth slide"
            style={{width:"300px", height:"300px"}}
          />
        </Carousel.Item>
      </Carousel>
    );
  }
  



  return (
    <>
    <div className="container">
    {ControlledCarousel()}
      <header className="jumbotron">
        {/* <h3>{content}</h3> */}
      </header>
    </div>


<div className='container'>
  <div className="row row-cols-1 row-cols-md-3 g-4">

  {users.map((user, index) => {
   return(<> 
              {/* <tr>
                <th scope="row" key={index}>{index+1}</th>
                <td>{user.movieName}</td>

              </tr> */}
  <div className="col">
    <div className="card" style={{'height':500,'width':300}}>
    <img src={user.image} class="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title" style={{color:'black'}}>{user.movieName}</h5>
        <button value={user.movieName} style={{backgroundColor:'rgb(248, 68, 100)',color:'white',borderRadius:5,width:120,height:40,borderColor:'rgb(34, 37, 57)',border:'none',fontSize:15,fontWeight:'bold'}} 
        // onClick={navigateToBookNew}>Book New</button>
        onClick={() => navigateToBookNew(user.movieName)}>Book Now</button>
      </div>
    </div>
  </div>
  
  </>

  )})}
</div>
</div>

  {/* <div className="col">
    <div className="card">
      <img src={wedding4} class="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Pre Wedding Shoot</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>

      </div>
    </div>
  </div> */}


        
    {/* <div style={{marginLeft:20}}>
        <h1>Hello</h1>
        <button style={{backgroundColor:'rgb(34, 37, 57)',color:'white',borderRadius:5,width:120,height:40,borderColor:'rgb(34, 37, 57)',border:'none',fontSize:15,fontWeight:'bold'}} 
        onClick={navigateToBook}>Book Now</button>
        <button style={{backgroundColor:'rgb(34, 37, 57)',color:'white',borderRadius:5,width:120,height:40,borderColor:'rgb(34, 37, 57)',border:'none',fontSize:15,fontWeight:'bold'}} 
        onClick={navigateToBookNew}>Book New</button>
    </div> */}

    </>
  );
};

export default Home;