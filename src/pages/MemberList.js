import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import '../style/members.css'
 import { ReactComponent as PlusIcon } from '../plus-icon.svg';
import axios from 'axios';
 
  const handleDelete = async (id) => {
    try {

      await axios.get(`http://localhost:3000/cms/members/delete/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


 const MemberList = () => {
    const members=[{
        memname:"Tom"
    },
    {
        memname:"Allen"
    },
    {
        memname:"Vaidyanath"
    },
    {
        memname:"Akash"
    }
    ]
//     const [memberlist,setMemberlist] = useState([{}])
//     const [loading,setLoading] = useState(true)
//   useEffect(() => {
//     setLoading(true)
//       axios.get("http://localhost:3000/cms/members/get")
//         .then((res) => {
//         setMemberlist(res.data)
//         setLoading(false)
//       }
//       )
      
//    }, [])

  //  const[members,setMembers]=useState([])
    
  
   // useEffect(async()=>{
//   try{
//     const data= (await axios.get("/events")).data
//     setEvents(data)
//   }catch(err){
//     console.log(err);
//   }
// },[])

  return (
//  loading ? <div>Loading...</div> :
    <div className='main'>
      <div className="heading">
Members
</div>
    <ul className="allmembers">
        <li className="add-member">
        <div className="add-plus">
        <Link to="/addmember" >
           <button className='add' ><PlusIcon className="add-icon" /></button>
         </Link>
          </div>
      </li>
    {
        
      members.length > 0 &&
      members.map((m) => (
        <li className="singlemember">
          <span className="membertext" key={m.id}>
            {m.memname}
          </span>
            <Link to="/editmember" state={{members : m}}>
          <button className='ed' >
            Edit
            </button>
            </Link>
          <button className='del' onClick={() => handleDelete(m._id)}>Delete</button>
        
        </li>
      ))}
    </ul>
    </div>
  );
};

export default MemberList;
