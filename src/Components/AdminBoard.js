import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import UserService from "../Services/user-service";

const AdminBoard = () => {
  const [content, setContent] = useState("");
  let navigate = useNavigate();
  const [user, setUser] = useState({

    movieName: ""

  });

  const { movieName } = user;

  const onInputChange = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value });

  };


  function PreviewImage(e) {
    e.preventDefault();
    let oFReader = new FileReader();
    oFReader.readAsDataURL(e.target.files[0]);
    oFReader.onload = function (oFREvent) {
    user.image = oFREvent.target.result;
    };

  }

  const onSubmit = async (e) => {

    e.preventDefault();
    console.log(user.movieName);
    console.log(user);

     await axios.post("http://localhost:8080/api/test/movie",user);

     alert("Movie Added Succesfully")

     navigate("/")

   };

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          (error.message) ||
          (error.toString());

        setContent(_content);
    }
    );
  }, []);

  return (
    <div className="container" >
      <header className="jumbotron">
        {/* <h3>{content}</h3> */}
        <br/>
        <br/>
      </header>

      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{backgroundColor:'white', color:'black',marginLeft:'30px'}}>
          <h2 className="text-center m-4">Add Movie</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="FirstName" className="form-label">
                Movie Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Movie Name"
                name="movieName"
                value={movieName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Movie Poster
              </label>
              <input
                type="file"
                className="form-control"
                placeholder="Choose Poster"
                name="image"
                // value={image}
                accept="image/*"
                onChange={(e) => PreviewImage(e)}
              />
            </div>
            
            
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link className="btn btn-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminBoard;