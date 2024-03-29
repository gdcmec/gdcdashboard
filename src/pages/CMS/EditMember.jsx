import React from "react";
import "../../style/addMember.css";
import axios from 'axios'
import { useState , useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import supabase from "../../supabase.config";
import { useContext } from "react";
import { AuthContext } from "../../context/Context";

axios.defaults.withCredentials = true;
  const EditMember = () => {
    
    const navigate = useNavigate()
    const {id} = useParams();
    const [member,setMember]=useState()
    const [photo,setPhoto]=useState(null)
    const [loading,setLoading]=useState(true)
    const { isAuthenticated } = useContext(AuthContext);

    //  const [error,setError]= useState(null)  
    
    const handleSubmit= async (e) =>{  
      e.preventDefault()   
      
      await axios.post(`${process.env.REACT_APP_API_URL}/cms/members/edit`,{member: member})        
      
      const {data , error} = await supabase.storage.from('members').upload(`${id}.jpg`,photo,{upsert:true})
      
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
    
    useEffect(()=>{
      const fetch = async ()=>{
        await axios.get(`${process.env.REACT_APP_API_URL}/cms/members/${id}`).then(res=>{
          
          console.log(res.data.member)
          setMember(res.data.member)
        })
      }
      fetch().then(()=>setLoading(false))
      
    }
    
    ,[])
    useEffect(() => {
            if(!isAuthenticated){
                window.location.href = "/";
            }
        }, [isAuthenticated]);
    

  return (
    loading ? <div>Loading...</div> :
   <div className="main" >
    <div className="heading">
      Update Member 
    </div>
    <div className="form">
    <form >
      <div>
      <div >
        <label className="label">Name:</label>
        <input className="mName" name="name" type="text"  value={member.name} onChange={handleChange}/>
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
      <select className="team" name="team_name" value={member.team_name} onChange={handleChange}>
          <option value="Design">Design</option>
          <option value="Social Media">Social Media</option>
          <option value="Marketing">Marketing</option>
          <option value="Executive committee">EXECOM</option>
          <option value="Tech">Tech</option>
          <option value="Content">Content</option>
          <option value="Non Tech">Non Tech</option>
          <option value="Events">Event</option>
        </select>
      </div>
      
      
      
      <div className="row">
        <label className="label">Position:</label>
        <input className="position" name="position" type="text" value={member.position} onChange={handleChange}/>
      </div>
      <div className="row">
        <label className="label">LinkedIn link:</label>
        <input className="link" name="Llink" type="url" value={member.linkedIn} onChange={handleChange}/>
      </div>
      <div className="row">
        <div className="last">
        <label for="image" className="img">Image:</label>
      <input type="file" className="image" name="photo_url"  onChange={(e)=>{
        setPhoto(e.target.files[0])
      }}/>

        </div>
        <img src={member.photo_url} alt="" />      
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

export default EditMember;