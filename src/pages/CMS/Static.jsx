import {useState , useEffect} from 'react';
import axios from 'axios';

const  StaticContent = () => {


    const [AboutUs, setAboutUs] = useState();
    // const [ContactUs, setContactUs] = useState();
    const [TechStack, setTechStack] = useState();
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
   
    const changeAbout = (e) => {
        const { name, value } = e.target;
        setAboutUs({ ...AboutUs, [name]: value });
    } // do similar for tech stack fields ...

    const editAbout = async (data) => {  //data is the entire object with id title description
        
       const {success , error } = await axios.post(`${process.env.REACT_APP_API_URL}/cms/static/editabout`, data)

       if(error)
        console.log(error)
       

    }

    const AddTech = async (data) => {     //entire obj
       const {res , error } = await axios.post(`${process.env.REACT_APP_API_URL}/cms/static/newTech`, data)

       if(error)
        console.log(error)
       
    }
    const editTech = async (data) => {   //entire obj
      const {res , error } =  await axios.post(`${process.env.REACT_APP_API_URL}/cms/static/editTech`, data)

      if(error)
        console.log(error)
    }
    const deleteTech = async (id) => {    //id of the tech
       const {res , error } = await axios.delete(`${process.env.REACT_APP_API_URL}/cms/static/deleteTech/${id}`)

       if(error)
        console.log(error)
    }

    

    return (
        
        // use Tailwind or css
        <></> 
        

    )
}

export default StaticContent
