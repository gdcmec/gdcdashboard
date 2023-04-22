import { useState , useEffect} from "react";
import EventBar from "../../components/EventBar";
import axios from "axios";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/Context";
const EventList = () => {


    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useContext(AuthContext);
    useEffect(() => {
        setLoading(true);
        axios
        .get(`${process.env.REACT_APP_API_URL}/cms/events/getHeaders` , {withCredentials: true})
        .then((response) => {
            setEvents(response.data.events);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if(!isAuthenticated){
            window.location.href = "/";
        }
    }, [isAuthenticated]);
    
    
    return (
        loading ? <></>:
        <div className='min-w-[50%] overflow-y-scroll'>
        <h1>Event List</h1>
        {events.map((event) => 
             <EventBar event={event} />
        )}
        </div>
    );
    }


    export default EventList;
