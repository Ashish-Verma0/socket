import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../join/Join.css";

const Join = () => {
    const[name,setName]=useState("")
    const navigate=useNavigate()

    const sendUser=()=>{
      !name? "":navigate("/chat", {state:{name}})
    }
  return (
    <div className="joinPage">
      <div className="joinContainer">
        <img
          src="https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/w_596,c_limit,q_auto:best,f_auto/fc/3034007-inline-i-applelogo.jpg"
          alt="logo"
        />
        <h1>chat</h1>
        <input type="text" id="joinInput" placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)}/>
          <button className="joinBtn" onClick={()=>sendUser()}>Login </button>
      </div>
    </div>
  );
};

export default Join;