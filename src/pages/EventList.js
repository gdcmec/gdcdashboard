import React, { useEffect, useState } from 'react'
 import { Link } from "react-router-dom";
import '../style/events.css'
 import { ReactComponent as PlusIcon } from '../plus-icon.svg';
// // import './plus-icon.svg';
// import { FaPlus } from 'react-icons/fa';


const EventList = (ename,handleDelete,handleEdit,handleAdd) => {
  //  const[events,setEvents]=useState([])
    const eventlist=[{
       ename:"Lord Of Code"
          },
   {
       ename:"Devcraft"
   },
   {
       ename:"4X120"
   },
   {
       ename:"TechnoHack"
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
            {e.ename}
          </span>
          <button className='ed' onClick={() => handleEdit(e.id)}>Edit</button>
          <button className='del' onClick={() => handleDelete(e.id)}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default EventList;
