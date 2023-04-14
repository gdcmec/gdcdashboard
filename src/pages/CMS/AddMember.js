import React from "react";
import "../../style/addMember.css";
import axios from 'axios'
import { useState } from "react";
import supabase from "../../supabase.config";
import { useNavigate } from "react-router-dom";

// const AddEvents = ({ visible, show }) => {
  const AddMember = () => {
    
    const navigate = useNavigate()
    const [member,setMember]=useState({
    })

    const [photo,setPhoto]=useState(null)
  
    //  const [error,setError]= useState(null)  
  
    const handleSubmit= async (e) =>{  
      e.preventDefault()   

       const edited =  await axios.post(`${process.env.REACT_APP_API_URL}/cms/members/new`,{member: member})

        const {data , error} = await supabase.storage.from('members').upload(`${edited.data.member_id}.jpg`,photo)
        if(error){
          console.log(error)
        }
        else{
          navigate('/cms/members')
        }
      
    }
    
    const handleChange = e=>{

    setMember(prev=>({...prev,[e.target.name]:e.target.value}))
    
    }
  return (
   <div className="main" >
    <div className="heading">
      Add Member 
    </div>
    <div className="form">
    <form >
      <div>
      <div >
        <label className="label">Name:</label>
        <input className="mName" name="name" type="text" value={member.name}  onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">Team:</label>
        <input className="team" name="team_name" type="text" value={member.team}  onChange={handleChange}/>
      </div>

      <div className="row">
        <label className="label">Class:</label>
        <input className="team" name="class" type="text"  value={member.class} onChange={handleChange}/>
      </div>
      <div className = "row" >
        <label className="label">Year:</label>
        <input className="position" name="year" type="text"  value={member.year} onChange={handleChange}/>
      </div>
      
      <div className="row">
        <label className="label">Position:</label>
        <input className="position" name="position" type="text" value={member.position}  onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">LinkedIn link:</label>
        <input className="link" name="Llink" type="url"  value={member.linkedIn}  onChange={handleChange}/>
      </div>
      <div className="row">
        <div className="last">
        <label for="image" className="img">Image:</label>
      <input type="file" className="image" name="photo_url"  value={member.photo_url} onChange={(e)=>{
        setPhoto(e.target.files[0])
      }
    }

      />
        </div>
      
      </div>
      

      </div>
      
      <div className="btn">
      <button className="button" type="submit" onClick={(handleSubmit)}>Submit</button>
      </div>
      
    </form>
    </div>
   </div>
  );
};

export default AddMember;