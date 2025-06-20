import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/auth/`;

console.log("✅ ENV BASE URL:", process.env.REACT_APP_API_BASE_URL);



const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    }).then((response) => {
      console.log(response.data.accessToken)
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

  const signup = (email,username, password, role = ["user"]) => {
    return axios
      .post(API_URL + "signup", {
        email,
        username,
        password,
        role,
      }).then((response) => {
        console.log(response.data.accessToken)
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
    
          return response.data;
        });
    };
  
  const logout = () => {
    localStorage.removeItem("user");
  };
  
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  const AuthService = {
    login,
    logout,
    getCurrentUser,
    signup
  };
  
  export default AuthService;
