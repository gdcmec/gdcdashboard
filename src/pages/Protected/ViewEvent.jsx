
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import {ExpectedUser , AttendedUser} from "../../components/UserBlock";
import axios from "axios";


const ViewEvent = () => {


const [event, setEvent] = useState([]);
const [loading, setLoading] = useState(true);
const { eventId } = useParams();

useEffect(() => {
    
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/cms/events/get/${eventId}`)
    .then((response) => {

        console.log(response.data);
        setEvent(response.data.event);
        setLoading(false);
    }
    )
    .catch((error) => {
        console.log(error);
    }
    );
}, [eventId]);

const markAttendance = async (user_id) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/cms/events/addAttendee/${eventId}` , {user_id : user_id});
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
}
const removeAttendance = async (user_id) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/cms/events/deleteAttendee/${eventId}` , {user_id : user_id});
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
}
return (
    loading ? <div>Loading...</div> :
    <div>
        <h1>Event Details</h1>
             <div className="flex-col p-4 justify-between items-center">
                <div className="flex justify-between items-center">
                    <h1 className =" font-bold text-2xl">{event.details.title}</h1>
                    <h1 className =" font-bold text-2xl">{event.details.date}</h1>
                </div>
                <div className="flex justify-between items-center">
                    <h1 className =" font-bold text-2xl">Time : {event.details.time}</h1>
                    <h1 className =" font-bold text-2xl">Venue :{event.details.venue}</h1>
                </div>
                <div className="flex justify-between items-center">
                    <h1 className =" text-2xl">Description : {event.details.description}</h1>
                    
                </div>
                <div className="flex justify-between items-center">
                         <span> Expected Participants : {event.numbers.expected}</span>
                         <span> Attended  : {event.numbers.attended}</span>
                         <span> Absentees : {event.numbers.absentees}</span>
            </div>

            <div >
                 <div className= "flex-col justify-between items-center">
                    <h1 className =" font-bold text-2xl">Absentees </h1>
                   {
                          event.participants.absentees &&     
                   event.participants.absentees.map((user)=>{
                        return <ExpectedUser user={user} markAttendance={markAttendance} />
                        })
                   }

                    <h1 className = " font-bold text-2xl ">
                        Attendees
                    </h1>
                    {
                        event.participants.attendees &&
                        event.participants.attendees.map((user)=>{

                            console.log(user)
                            return <AttendedUser user={user} removeAttendance={removeAttendance} />
                        })
                    }
                
                

                 </div>

            </div>

        </div>
    </div>
        );
    }


export default ViewEvent;



    