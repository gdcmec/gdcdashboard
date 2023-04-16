import {useState} from 'react';
import axios from 'axios';
function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {username, password};
        axios.defaults.withCredentials = true;
        axios.post(`${process.env.REACT_APP_API_URL}/cms/admins/login`, user
        )
        .then(res => {
            if(res.data.success)
            {
                console.log(res.data);
                window.location.href = "/dashboard";
            }

        })
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-black">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center ">
                <input type="text" 
                    className="border-2 border-gray-300 p-2 m-2 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}
                    className="border-2 border-gray-300 p-2 m-2 ounded-lg focus:outline-none focus:border-blue-500" />
                <button type="submit"
                    className="bg-blue-500 hover:bg-blue-700 m-2 text-white font-bold py-2 px-4 rounded"
                >Login</button>
            </form>
        </div>
    )
}

export default Login;