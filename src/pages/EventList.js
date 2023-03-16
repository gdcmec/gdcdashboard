import React, { useEffect, useState , } from 'react'
import { Link } from "react-router-dom";
import '../style/events.css'
 import { ReactComponent as PlusIcon } from '../plus-icon.svg';
// // import './plus-icon.svg';
// import { FaPlus } from 'react-icons/fa';
 


const EventList = (ename,handleDelete,handleEdit,handleAdd) => {
  //  const[events,setEvents]=useState([])
    const eventlist=[{
       id   :"6413081a741eb97979e4a7eb",
       title:"Lord Of Code"
          },
   {
       title:"Devcraft"
   },
   {
       title:"4X120"
   },
   {
       title:"TechnoHack"
   }
   ]
  
   // useEffect(async()=>{
//   try{
//     const data= (await axios.get("/events")).data
//     setEvents(data)
//   }catch(err){
//     console.log(err);
//   }
// },[])

  return (
    <div className='main'>
      <div className="heading">
Events
</div>
    <ul className="allevents">
        <li className="add-event" onClick={handleAdd}>
        <div className="add-plus">
        <Link to="/addevent" >
           <button className='add' onClick={() => handleAdd()}><PlusIcon className="add-icon" /></button>
         </Link>
          </div>
      </li>
      
      {eventlist.map((e) => (
        <li className="singleevent">
          <span className="eventtext" key={e.id}>
            {e.title}
          </span>
            <Link to="/editevent" state={{events : e}}>
          <button className='ed' >
            Edit
            </button>
            </Link>
          <button className='del' onClick={() => handleDelete(e.id)}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default EventList;
