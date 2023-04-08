import { useNavigate } from "react-router-dom";
const EventBar = ({event}) => {

  const navigate = useNavigate();
    return (
      <div className="flex items-center justify-between bg-gray-100 rounded-md p-4 mb-4">
        <div>
          <h3 className="text-lg font-medium">{event.title}</h3>
          <p className="text-gray-500">{event.date} @ {event.venue}</p>
        </div>
        
        <button className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium" 
        onClick={() => navigate(`/events/${event.event_id}`)}
        >
            Open
        </button>
      </div>
    );
  };
  
  export default EventBar;