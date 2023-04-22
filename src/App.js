import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/index.css";
import "./App.css"
import Login from "./pages/Login";
import EventList from "./pages/CMS/EventList";
import AddEvents from "./pages/CMS/AddEvents";
import EditEvent from "./pages/CMS/EditEvent";
import AddMember from "./pages/CMS/AddMember";
import EditMember from "./pages/CMS/EditMember";
import MemberList from "./pages/CMS/MemberList";
import EventDetails from "./pages/Protected/EventDetails";
import ViewEvent from "./pages/Protected/ViewEvent";
import StaticContent from "./pages/CMS/Static";
import { AuthProvider } from "./context/Context";

function App() {
  const [navVisible, showNavbar] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
      <AuthProvider>
        <Navbar visible={navVisible} show={showNavbar} />
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route
            path="/dashboard"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>Dashboard</h1>
              </div>
            }
          />
          <Route path="/cms/events" element={<div className={!navVisible ? "page" : "page page-with-navbar"}>
                <EventList/>
              </div>} />
              <Route path="/cms/addevent" element={<div className={!navVisible ? "page" : "page page-with-navbar"}>
                <AddEvents/>
              </div>} />

              <Route path="/cms/editevent/:eventId" element = {<div className = {!navVisible ? "page" : "page page-with-navbar"}>
                <EditEvent/>
              </div>}> </Route>
              <Route path="/cms/members" element = {<div className = {!navVisible ? "page" : "page page-with-navbar"}>
                <MemberList/>
              </div>}> </Route>
              <Route path="/cms/addmember" element = {<div className = {!navVisible ? "page" : "page page-with-navbar"}>
                <AddMember/>
              </div>}> </Route>

              <Route path="/cms/editMember/:id" element = {<div className = {!navVisible ? "page" : "page page-with-navbar"}>
                <EditMember/>
              </div>}> </Route>
              <Route path="/events" element = {<div className = {!navVisible ? "page" : "page page-with-navbar"}>
                <EventDetails/>
              </div>}> </Route>

              <Route path = "/events/:eventId" element = {<div className = {!navVisible ? "page" : "page page-with-navbar"}>
                <ViewEvent/>
              </div>}>

              </Route>
              <Route path = "/cms/static" element = {<div className = {!navVisible ? "page" : "page page-with-navbar"}>
                <StaticContent/>
              </div>}>

              </Route>
        </Routes>
          </AuthProvider>
          
      </div>
    </BrowserRouter>
  );
}

export default App;
