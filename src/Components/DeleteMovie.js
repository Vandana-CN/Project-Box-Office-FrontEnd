import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import UserService from "../Services/user-service";

const DeleteMovie = () => {
    const navigate = useNavigate();
    const {id}=useParams();

    const navigateToBookNew = (val) => {
        navigate('/BookNew',{
          state: {
            currentmoviename: val
          }
        });
        console.log(val);
      
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

  const AllUsers = async () => {
    axios.get('http://localhost:8080/api/test/movie/allmovies').then((response)=>{
       setUsers(response.data);
       console.log(response);
   })}

   const deleteUser=async(id)=>{
    axios.delete(`http://localhost:8080/api/test/movie/${id}`).then((response)=>{
    alert("Movie Deleted Succesfully");
    setUsers(response.data);
    window.location.reload();
    AllUsers();
   });}

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




  return (


    <>

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
        onClick={() => deleteUser(user.id)}>Delete</button>
      </div>
    </div>
  </div>
  
  </>

  )})}
</div>
  </div>


    </>
  );
};

export default DeleteMovie;