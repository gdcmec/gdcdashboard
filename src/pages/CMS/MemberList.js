import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import '../../style/members.css'
 import { ReactComponent as PlusIcon } from '../../plus-icon.svg';
import axios from 'axios';
 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/cms/members/delete/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


 const MemberList = () => {
    const [members,setMembers] = useState([{}])
    const [loading,setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
      axios.get(`${process.env.REACT_APP_API_URL}/cms/members/get`)
        .then((res) => {
        setMembers(res.data.members)
        setLoading(false)
      }
      )
      
   }, [])

  

  return (
 loading ? <div>Loading...</div> :
    <div className='main'>
      <div className="heading">
Members
</div>
    <ul className="allmembers">
        <li className="add-member">
        <div className="add-plus">
        <Link to="/cms/addmember" >
           <button className='add' ><PlusIcon className="add-icon" /></button>
         </Link>
          </div>
      </li>
    {
        
      members.length > 0 &&
      members.map((m) => (
        <li className="singlemember" key={m.id}>
          <span className="membertext">
            {m.name}
          </span>
          <span className="membertext" >
            {m.role}
          </span>
          <div className='justify-end'> 
            <Link to="/cms/editmember" state={{members : m}}>
          <button className='ed' >
            Edit
            </button>
            </Link>
          <button className='del' onClick={() => handleDelete(m._id)}>Delete</button>
          </div>
        
        </li>
      ))}
    </ul>
    </div>
  );
};

export default MemberList;
