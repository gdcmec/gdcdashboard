import React from "react";
import {
  FaAngleRight,
  FaAngleLeft
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../style/navbar.css";
import axios from "axios";
import { useCookies } from "react-cookie";




function Navbar({ visible, show }) {

  const [token, setToken, removeToken] = useCookies(["access_token"]);

  const Logout = async() => {
      const logout = await axios.delete(`${process.env.REACT_APP_API_URL}/cms/admins/logout` , { withCredentials: true} )
      removeToken("access_token")
      if(logout.data.success){
        window.location.href = "/"
      }
  }
  return (
    <>
      <nav className={!visible ? "navbar" : "z-[2]"}>
			<button
          type="button"
          className="nav-btn"
          onClick={(e) =>{
            e.preventDefault()
            show((prevState)=>!prevState)}}
        >
          {!visible ? <FaAngleRight size={30} color="black"  /> : <FaAngleLeft size={30} color="black" />}
        </button>
        <div>
          <div className="links nav-top">
            <NavLink to="/dashboard" className="nav-link">
              
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/cms/events" className="nav-link">
              
              <span>Events </span>
            </NavLink>
            <NavLink to="/cms/members" className="nav-link">
              
              <span>Members </span>
            </NavLink>

              <NavLink to="/events" className="nav-link">
              
              <span>EventList </span>
            </NavLink>
              <NavLink to="/cms/static" className="nav-link">
              
              <span>static content </span>
            </NavLink>
          </div>
          <div className="links">
            
             
              <button className="nav-link "
                onClick={Logout}
              >Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
