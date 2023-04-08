import React from "react";
import "../../style/addMember.css";
import axios from 'axios'
import { useState } from "react";

// const AddEvents = ({ visible, show }) => {
  const AddMember = () => {
    
    const [member,setMember]=useState({
    })
  
    //  const [error,setError]= useState(null)  
  
    const handleSubmit= async (e) =>{  
      e.preventDefault()   

        await axios.post(`${process.env.REACT_APP_API_URL}/cms/members/new`,{member: member})
      
    }
    
    const handleChange = e=>{

    setMember(prev=>({...prev,[e.target.name]:e.target.value}))
    
    }
  return (
   <div className="main" >
    <div className="heading">
      Add/Update Member 
    </div>
    <div className="form">
    <form >
      <div>
      <div >
        <label className="label">Name:</label>
        <input className="mName" name="name" type="text" onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">Team:</label>
        <input className="team" name="team" type="text" onChange={handleChange}/>
      </div>
      
      
      
      <div className="row">
        <label className="label">Position:</label>
        <input className="position" name="position" type="text" onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">LinkedIn link:</label>
        <input className="link" name="Llink" type="url"  onChange={handleChange}/>
      </div>
      <div className="row">
        <div className="last">
        <label for="image" className="img">Image:</label>
      <input type="file" className="image" name="photo_url" onChange={handleChange}/>
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

export default AddMember;