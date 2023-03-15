import React from "react";
import "../style/addEvents.css";
import axios from 'axios'
import { useState } from "react";

// const AddEvents = ({ visible, show }) => {
  const AddEvents = () => {
  
    const [inputs,setInputs]=useState({
      input1:"",
      input5:"",
      input2:"",
      input3:"",
      input4:"",
      desc:"",
      image:""
    })
  
    //  const [error,setError]= useState(null)  
  
    const handleSubmit= async (e) =>{  
      e.preventDefault()   
      // try{
         await axios.post("/event/:id",inputs) 
      // }catch(err){
      //   setError(err.response.data);
      // }
    }
    
    const handleChange = e=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
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
        <input className="input1" name="input1" type="text" onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">Event date:</label>
        <input className="input5" name="input5" type="date" onChange={handleChange}/>
      </div>
      
      <div className="row">
        <label className="label">Event time:</label>
        <input className="input2" name="input2" type="time" onChange={handleChange}/>
      </div>
      
      <div className="row">
        <label className="label">Event location:</label>
        <input className="input3" name="input3" type="text" onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">Registration link:</label>
        <input className="input4" name="input4" type="url" onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">Description:</label>
        <textarea id="message" type="text" name="desc" onChange={handleChange}/>
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
