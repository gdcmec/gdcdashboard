import React from "react";
import "../../style/addEvents.css";
import axios from 'axios'
import { useState , useEffect  } from "react";
import {useLocation , useParams,useNavigate} from "react-router-dom";



  const EditEvent = () => {

    const navigate = useNavigate();
    const [events, setEvents] = useState({});
    const [loading, setLoading] = useState(true);
    const {eventId} = useParams()

    const handleSubmit= async (e) =>{  
      e.preventDefault() 
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/cms/events/edit`,{event: events})
            console.log("edited event : " , res)
            navigate('/cms/events')

    }
    
    const handleChange = e=>{
    setEvents(prev=>({...prev,[e.target.name]:e.target.value}))
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/cms/events/get/${eventId}`)
        .then((response) => {
            setEvents(response.data.event.details);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [eventId]);



       

  return (

    loading ? <div>Loading...</div> :
   <div className="main" >
    <div className="heading">
        Edit event
    </div>
    <div className="form">
    <form >
      <div>
    <div >
        <label className="label">Event name:</label>
        <input className="name" name="title" type="text" value= {events.title} onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">Event date:</label>
        <input className="date" name="date" type="date" value= {events.date} onChange={handleChange}/>
      </div>
      
      <div className="row">
        <label className="label">Event time:</label>
        <input className="time" name="time" type="time" value={events.time} onChange={handleChange}/>
      </div>
      
      <div className="row">
        <label className="label">Event location:</label>
        <input className="venue" name="venue" type="text" value={events.venue} onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">Registration link:</label>
        <input className="registrationLink" name="registrationLink" type="url" value={events.registrationLink} onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">Description:</label>
        <textarea id="message" type="text" name="description" value={events.description} onChange={handleChange}/>
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

export default EditEvent;
