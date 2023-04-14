import {useState , useEffect} from 'react';
import axios from 'axios';

const  StaticContent = () => {

    const [AboutUs, setAboutUs] = useState();
    const [ContactUs, setContactUs] = useState();
    const [TechStack, setTechStack] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/cms/static/get`)
            .then(res => {
                console.log(res.data);
                setAboutUs(res.data.AboutUs);
                setContactUs(res.data.ContactUs);
                setTechStack(res.data.TechStack);
            })
    }, [])
   
    const changeAbout = (e) => {
        const { name, value } = e.target;
        setAboutUs({ ...AboutUs, [name]: value });
    }


    return (

        //  contains a  lot of fields , which has an edit button and label along with ediatbel content
        //  and a save button to save the changes , use Tailwind CSS to style the page
      
    )