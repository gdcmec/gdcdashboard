import React from "react";
import "../../style/addEvents.css";
import axios from 'axios'
import { useState , useEffect } from "react";
import supabase from '../../supabase.config'
  
import { useContext } from "react";
import { AuthContext } from "../../context/Context";
// const AddEvents = ({ visible, show }) => {
  const AddEvents = () => {

    const { isAuthenticated } = useContext(AuthContext);

    
    const [event,setEvent]=useState({
    })
    
    const [poster,setPoster]=useState(null)
    
    const [poster_url,setPoster_url]=useState(null)
    
    //  const [error,setError]= useState(null)  
    
    const handleSubmit= async (e) =>{  
      e.preventDefault()   
      console.log(process.env.REACT_APP_API_URL)
      const addedEvent = await axios.post(`${process.env.REACT_APP_API_URL}/cms/events/new`,{event: event})
      console.log(addedEvent.data.newEvent.event_id)
      const {data , error} = await supabase.storage.from('events').upload(`${addedEvent.data.newEvent.event_id}/poster.jpg`, poster)
      if(error){
        console.log(error)
      }
      else{
            console.log("added event");
            window.location.href = "/cms/events";
        }
        
      }
      
      const handleChange = e=>{
        setEvent(prev=>({...prev,[e.target.name]:e.target.value}))
      }
      useEffect(() => {
              if(!isAuthenticated){
                  window.location.href = "/";
              }
          }, [isAuthenticated]);
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
      <input type="file" id="image" name="poster_file" onChange={(e)=>
        setPoster(e.target.files[0])
       }/>
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
