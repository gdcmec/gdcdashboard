import React from "react";
import "../style/addEvents.css";


const AddEvents = ({ visible, show }) => {
  return (
   <div className="main" >
    <div className="heading">
      Add/Update Events
    </div>
    <div className="form">
    <form >
      <div>
    <div >
        <label className="label">Event name:</label>
        <input className="input1" type="text"/>
      </div>
      <div className="row">
        <label className="label">Event date:</label>
        <input className="input5" type="date"/>
      </div>
      
      <div className="row">
        <label className="label">Event time:</label>
        <input className="input2" type="time"/>
      </div>
      
      <div className="row">
        <label className="label">Event location:</label>
        <input className="input3" type="text"/>
      </div>
      <div className="row">
        <label className="label">Registration link:</label>
        <input className="input4" type="url"/>
      </div>
      <div className="row">
        <label className="label">Description:</label>
        <textarea id="message" type="text"/>
      </div>
      <div className="row">
      <label for="image" className="img">Upload image:</label>
      <input type="file" id="image" name="image"/>
      </div>
      

      </div>
      
      <div className="btn">
      <button className="button" type="submit">Submit</button>
      </div>
      
    </form>
    </div>
   </div>
  );
};

export default AddEvents;
