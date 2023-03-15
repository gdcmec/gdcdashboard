import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/index.css";
import "./App.css"
import EventList from "./pages/EventList";
import AddEvents from "./pages/AddEvents";

function App() {
  const [navVisible, showNavbar] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar visible={navVisible} show={showNavbar} />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>Dashboard</h1>
              </div>
            }
          />
          <Route path="/events" element={<div className={!navVisible ? "page" : "page page-with-navbar"}>
                <EventList/>
              </div>} />
              <Route path="/addevent" element={<div className={!navVisible ? "page" : "page page-with-navbar"}>
                <AddEvents/>
              </div>} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
