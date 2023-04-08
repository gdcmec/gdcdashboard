import React from "react";
import "../../style/addEvents.css";
import axios from 'axios'
import { useState } from "react";
  
// const AddEvents = ({ visible, show }) => {
  const AddEvents = () => {
    
    const [event,setEvent]=useState({
    })
  
    //  const [error,setError]= useState(null)  
  
    const handleSubmit= async (e) =>{  
      e.preventDefault()   
        console.log(process.env.REACT_APP_API_URL)
        await axios.post(`${process.env.REACT_APP_API_URL}/cms/events/new`,{event: event})
        .then(res=>{
          console.log(res)
        }
        )
      
    }
    
    const handleChange = e=>{
    setEvent(prev=>({...prev,[e.target.name]:e.target.value}))
    }
  return (
   <div className="main" >
    <div className="heading">
      Add/Update event
    </div>
    <div className="form">
    <form >
      <div>
      <div >
        <label className="label">Event name:</label>
        <input className="name" name="title" type="text" value= {event.title} onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">Event date:</label>
        <input className="date" name="date" type="date" value= {event.date} onChange={handleChange}/>
      </div>
      
      <div className="row">
        <label className="label">Event time:</label>
        <input className="time" name="time" type="time" value={event.time} onChange={handleChange}/>
      </div>
      
      <div className="row">
        <label className="label">Event location:</label>
        <input className="venue" name="venue" type="text" value={event.venue} onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">Registration link:</label>
        <input className="registrationLink" name="registration_link" type="url" value={event.registrationLink} onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">Description:</label>
        <textarea id="message" type="text" name="description" value={event.description} onChange={handleChange}/>
      </div>
      <div className="row">
        <div className="last">
        <label for="image" className="img">Image:</label>
      <input type="file" id="image" name="image" onChange={handleChange}/>
        </div>
      
      </div>
      

      </div>
      
      <div className="btn">
      <button className="button" type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      
    </form>
    </div>
   </div>
  );
};

export default AddEvents;
