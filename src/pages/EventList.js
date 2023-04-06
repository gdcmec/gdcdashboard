import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import '../style/events.css'
 import { ReactComponent as PlusIcon } from '../plus-icon.svg';
import axios from 'axios';
// // import './plus-icon.svg';
// import { FaPlus } from 'react-icons/fa';
 
const handleDelete = async (id) => {
  try {

    await axios.get(`${process.env.REACT_APP_API_URL}/cms/events/delete/${id}`);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};


const EventList = () => {

    const [eventlist,setEventlist] = useState([{}])
    const [loading,setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
      axios.get(`${process.env.REACT_APP_API_URL}/cms/events/get`)
        .then((res) => {
        setEventlist(res.data)
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
        <Link to="/addevent" >
           <button className='add' ><PlusIcon className="add-icon" /></button>
         </Link>
          </div>
      </li>
    {
        
      eventlist.length > 0 &&
      eventlist.map((e) => (
        <li className="singleevent">
          <span className="eventtext" key={e.id}>
            {e.title}
          </span>
            <Link to="/editevent" state={{events : e}}>
          <button className='ed' >
            Edit
            </button>
            </Link>
          <button className='del' onClick={() => handleDelete(e._id)}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default EventList;
