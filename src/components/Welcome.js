import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
let firstRender = true;
const Welcome = () => {
  const [user, setUser] = useState();
   

  const refreshToken = async () => {
    const res = await axios
      .get("https://new-auth-backend.onrender.com/api/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data =  res.data;
    return data;
  };



  const sednRequest = async () => {

    const token =  localStorage.getItem("token")

    const res = await axios.get("https://new-auth-backend.onrender.com/api/user", {
      headers: {Authorization:`Bearer ${token}`} ,

      withCredentials: true,
    }) .catch((err) => console.log(err));
    const data = res.data;
    return data;
  }
   
  useEffect(() => {  

    if (firstRender) {
      firstRender = false;
      sednRequest().then((data) => setUser(data.user));
    }
    // let interval = setInterval(() => {
    //   refreshToken().then((data) => setUser(data.user));
    // }, 1000 * 29);
    // return () => clearInterval(interval);

  },[]);   
  return <div>
{user && <h1>{user.name}</h1>}
    </div>
  
};

export default Welcome