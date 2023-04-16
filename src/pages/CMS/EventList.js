import React, { useEffect, useState } from 'react'
import { Link , useNavigate } from "react-router-dom";
import '../../style//events.css'
 import { ReactComponent as PlusIcon } from '../../plus-icon.svg';
import axios from 'axios';
// // import './plus-icon.svg';
// import { FaPlus } from 'react-icons/fa';
 
const handleDelete = async (id) => {
  try {

    await axios.delete(`${process.env.REACT_APP_API_URL}/cms/events/delete/${id}` , { withCredentials: true});
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};


const EventList = () => {

    const navigate = useNavigate();
    const [eventlist,setEventlist] = useState([{}])
    const [loading,setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
      axios.get(`${process.env.REACT_APP_API_URL}/cms/events/getHeaders`)
        .then((res) => {
        setEventlist(res.data.events)
        setLoading(false)
      }
      )
      
  }, [])

  //  const[events,setEvents]=useState([])
    
  
   // useEffect(async()=>{
//   try{
//     const data= (await axios.get("/events")).data
//     setEvents(data)
//   }catch(err){
//     console.log(err);
//   }
// },[])

  return (
  
loading ? <div>Loading...</div> :
    <div className='main'>
      <div className="heading">
Events
</div>
    <ul className="allevents">
        <li className="add-event">
        <div className="add-plus">
        <Link to="/cms/addevent" >
           <button className='add' ><PlusIcon className="add-icon" /></button>
         </Link>
          </div>
      </li>
    {
        
      eventlist.length > 0 &&
      eventlist.map((e) => (
        <li className="singleevent">
          <span className="eventtext" key={e.event_id}>
            {e.title}
          </span>
            
          <button className='ed' onClick={()=>{
                navigate(`/cms/editevent/${e.event_id}`)
          }}>
            Edit
            </button>
          <button className='del' onClick={() => handleDelete(e.event_id)}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default EventList;
