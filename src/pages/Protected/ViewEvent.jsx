
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import {ExpectedUser , AttendedUser} from "../../components/UserBlock";
import axios from "axios";


const ViewEvent = () => {


const [event, setEvent] = useState([]);
const [sheets , setSheets] = useState();
const [loading, setLoading] = useState(true);
const { eventId } = useParams();

useEffect(() => {

    const fetchDetails = async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_API_URL}/cms/events/get/${eventId}`)
    .then((response) => {

        console.log("details" , response.data.event.details);

        setEvent(response.data.event);
    }
    )
    .catch((error) => {
        console.log(error);
    }
    );
    await axios.get(`${process.env.REACT_APP_API_URL}/sheets/get-sheets/${eventId}`).then((response) => {
        console.log(response.data);
        setSheets(response.data);
    }
    )
    .catch((error) => {
        console.log(error);
    }
    );
    }

    fetchDetails().then(() => setLoading(false));
}, [eventId]);

const saveAttendanceSheet = async () => {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/sheets/add-attended/${eventId}` , {sheet_id : sheets.attended});
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
}

const runAttendanceSheet = async () => {

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/sheets/run-attendance/${eventId}` , {sheet_id : sheets.attended});
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
}

const saveRegistrationSheet = async () => { 

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/sheets/add-registration/${eventId}` , {sheet_id : sheets.expected});
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
}

const runRegistrationSheet = async () =>{

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/sheets/run-registration/${eventId}` , {sheet_id : sheets.expected});
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
}



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
                    <label >Registration Sheet :</label>
                    <input type = "text" className="border-2 border-black" placeholder="Enter the link to the registration sheet" value={sheets.expected} onChange={(e)=>
                                                                    {
                                                                        setSheets({
                                                                            ...sheets,
                                                                            expected : e.target.value
                                                                        }
                                                                        )
                                                                    }   
                                                                    }/>
                                                                     
                    <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick = {(e) => {saveRegistrationSheet()}}
                    > save</button>
                    <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick = {(e) => {runRegistrationSheet()}}
                    >Run</button>
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="">Attendance Sheet :</label>
                    <input type = "text" className="border-2 border-black" placeholder="Enter the link to the attendance sheet" value={sheets.attended} onChange={(e)=>{
                                                                        setSheets({     
                                                                            ...sheets,
                                                                            attended : e.target.value
                                                                        }
                                                                        )
                                                                    }
                                                                    }/>
                    <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick = {(e) => {saveAttendanceSheet()}}
                    > save</button>
                    <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick = {(e) => {runAttendanceSheet()}}
                    >Run</button>


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



    