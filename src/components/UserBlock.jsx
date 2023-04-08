

const ExpectedUser = ({user, markAttendance}) => {
    return(
        <div key={user.user_id} className = "flex p-2 border-2 justify-between">
            <span> {user.name}</span>
            <span> {user.class}</span>
            <span> {user.rollNo}</span>
            <span> {user.year}</span>

            <button className= "bg-green-500 p-2 rounded-md text-white"
                    onClick={()=>markAttendance(user.user_id)}>
            Mark attended</button>
        </div>

            )
}

const AttendedUser = ({user , removeAttendance}) => {
    return(
        <div key={user.user_id} className = "flex p-2 border-2 justify-between">
            <span> {user.name}</span>
            <span> {user.class}</span>
            <span> {user.rollNo}</span>
            <span> {user.year}</span>
            <span> checked in :{user.created_at}</span>
            <button className= "bg-red-500 p-2 rounded-md text-white"
                    onClick={()=>removeAttendance(user.user_id)}>
            Remove attendance</button>
        </div>

            )
}

export {ExpectedUser, AttendedUser}