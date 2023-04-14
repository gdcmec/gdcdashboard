import {useState , useEffect, useRef} from 'react';
import axios from 'axios';
import '../../style/Static.scss'
import React from 'react'
import Modal from 'react-modal';
import { Form } from 'react-router-dom';

const StaticContent = () => {
    let subtitle;
    const [AboutUs, setAboutUs] = useState(null);
    const [ContactUs, setContactUs] = useState();
    const [TechStack, setTechStack] = useState();
    const [about,setAbout] = useState("what");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [addmodalIsOpen, setAddIsOpen] = useState(false);
    const [editModalVal,setEditModalVal]= useState({title:null,description:null});

    const techTitleRef = useRef(null);
    const techDescRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {

        const fetch= async ()=>{
         const res = await axios.get(`${process.env.REACT_APP_API_URL}/cms/static/get`)
                console.log(res.data);
                setAboutUs(res.data.AboutUs);
                // setContactUs(res.data.ContactUs);
                setTechStack(res.data.TechStack);
            }
        
        fetch().then(()=>setLoading(false))
    }, [])

    const reFetchTechStack = async()=>{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/cms/static/get`)
        setTechStack(res.data.TechStack)
    }

    const reFetchAboutUs = async()=>{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/cms/static/get`)
        setAboutUs(res.data.AboutUs)
    }

    const changeAbout = (e) => {
        const { name, value } = e.target;
        AboutUs[about][name] = value;
        AboutUs[about][name] = value;
        setAboutUs({ ...AboutUs, [name]: value });
    } // do similar for tech stack fields ...

    const editAbout = async () => {  //data is the entire object with id title description
        let data = AboutUs[about]
        setAboutUs(null)
       const {returnData , error } = await axios.post(`${process.env.REACT_APP_API_URL}/cms/static/editAbout`, data)
       await reFetchAboutUs()
       if(error)
        console.log(error) 
    }

    const deleteAbout = async () => {  //data is the entire object with id title description
        AboutUs[about].title = ""
        AboutUs[about].description = ""
        let data = AboutUs[about]
        setAboutUs(null)
        const {returnData , error } = await axios.post(`${process.env.REACT_APP_API_URL}/cms/static/editAbout`, data)
        await reFetchAboutUs()
        if(error)
         console.log(error) 
     }

    const AddTech = async (data) => {     //entire obj
        setTechStack(null)
       const {recievedata , error } = await axios.post(`${process.env.REACT_APP_API_URL}/cms/static/newTech`, data)
       await reFetchTechStack();
       if(error)
        console.log(error)
       
    }
    const editTech = async (data) => {   //entire obj
      setTechStack(null)
      const {readData , error } =  await axios.post(`${process.env.REACT_APP_API_URL}/cms/static/editTech`, data)
      await reFetchTechStack();

      if(error)
        console.log(error)
    }
    const deleteTech = async (id) => {    //id of the tech
        setTechStack(null)
       const {data , error } = await axios.delete(`${process.env.REACT_APP_API_URL}/cms/static/deleteTech/${id}`)
  
       await reFetchTechStack();
       if(error)
        console.log(error)
    }

    const customStyles = {
        content: {
          borderRadius:"10px",
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width:"22rem",
        },
      };

      
  function openModal() {
    setIsOpen(true);
  }

  function openAddModal() {
    setAddIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeAddModal() {
    setAddIsOpen(false);
  }

  function addNewStack(){
    let data = {title:techTitleRef.current.value,description:techDescRef.current.value}
    console.log(data);
    AddTech(data).then(closeAddModal())
  }
  

    return (
      <>
         
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Stack Modal"
        >
        <div className='modal-heading'>Edit stack</div>
        <form className='modal-form'>
            <input  type={"text"} placeholder="Enter new stack" className='modal-input' value={editModalVal.title} onChange={(e)=>{setEditModalVal({...editModalVal,title:e.target.value})}}/>
            <textarea  type={"text"} placeholder="Enter new description" className='modal-desc' value={editModalVal.description} onChange={(e)=>{setEditModalVal({...editModalVal,description:e.target.value})}}/>
        </form>
          <div className='modal-buttons'>
              <button className='modal-button'  onClick={()=>{
                closeModal()
                editTech(editModalVal)}}>Edit</button>
              <button className='modal-button'  onClick={closeModal}>Close</button>
          </div>
       </Modal>
   
           <Modal
            isOpen={addmodalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeAddModal}
            style={customStyles}
            contentLabel="Add Stack Modal"
            >
            <div className='modal-heading'>Add a new stack</div>
            <form className='modal-form'>
                <input ref={techTitleRef} type={"text"} placeholder="Enter new stack" className='modal-input'/>
                <textarea ref={techDescRef} type={"text"} placeholder="Enter new description" className='modal-desc'/>
            </form>
              <div className='modal-buttons'>
                  <button className='modal-button' onClick={addNewStack}>Add</button>
                  <button className='modal-button'  onClick={closeAddModal}>Close</button>
              </div>
           </Modal>

        <div className='edit-dashboard'>
            <div className='edit-about'>
                    <form id='about-editor ' className='about-container'>
                        {AboutUs?<div className='about-elements'>
                            <div class="edit-heading">About</div>
                            <select class="select-about" onChange={(e)=>{setAbout(e.target.value)}}>
                                <option class="selected-about" value="what">What do we do</option>
                                <option class="selected-about" value="why">Why we do it</option>
                                <option class="selected-about" value="how">How we do it</option>
                            </select>
                                <input ref={titleRef} name="title" type="text" placeholder="Title" class="about-title" value={AboutUs?AboutUs[about].title:null} disabled={true} onChange={changeAbout}/>
                                <textarea ref={descRef} rows="5" cols="20" name="description" placeholder="Add Text Here" class="about-description" disabled={true} value={AboutUs?AboutUs[about].description:null}  onChange={changeAbout}/>
                        </div>:<center className='about-elements'><div class="edit-heading">About</div>Loading...</center>}
                        
                        <div className='about-buttons'>
                            <button className='about-button' onClick={(event)=>{
                                event.preventDefault()
                                titleRef.current.removeAttribute("disabled")
                                descRef.current.removeAttribute("disabled")
                                titleRef.current.focus()
                            }}>Edit</button>
                            <button className='about-button' onClick={(event)=>{
                                event.preventDefault()
                                editAbout()}}>Done</button>
                            <button className='about-button' onClick={(event)=>{
                                event.preventDefault()
                                deleteAbout()}}>Delete</button>
                        </div>
                    </form>
                </div>
            <div className='edit-techstack about-container about-container-ts'>
                    <div className='ts-heading'>
                        <div className='edit-heading'>Tech Stack</div>
                        <button className='ts-add' onClick={()=>{
                            openAddModal()
                        }}>Add</button>
                    </div>
                <div className='tech-stacks'>
                    {TechStack? 
                        <>{TechStack.map((element)=>{
                            return <div className='tech-stack'>
                        <div className='tech-stack-item'>{element.title} </div>
                        <div className='ts-buttons'>
                            <button className='ts-edit' onClick={(event)=>{
                                event.preventDefault()
                                setEditModalVal({id:element.id,title:element.title,description:element.description})
                                openModal()
                            }}>Edit</button>
                            <button className='ts-del'onClick={()=>{deleteTech(element.id)}} >Delete</button>
                        </div>
                    </div>
                        })}</>
                    
                    :<div>Loading....</div>}
                </div>
            </div>
        </div>
      </>
    )
}

export default StaticContent;
