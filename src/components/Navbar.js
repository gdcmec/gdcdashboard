import React from "react";
import {
  FaAngleRight,
  FaAngleLeft
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../style/navbar.css";


function Navbar({ visible, show }) {
  return (
    <>
      <nav className={!visible ? "navbar" : ""}>
			<button
          type="button"
          className="nav-btn"
          onClick={() => show(!visible)}
        >
          {!visible ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
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
          </div>
          <div className="links">
            <NavLink to="/Sign-out" className="nav-link">
             
              <span>Logout</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
