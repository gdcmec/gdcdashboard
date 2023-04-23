import React, { createContext, useState, useEffect } from 'react'

import axios from 'axios'

export const AuthContext = createContext()
export const LoadingContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)


  useEffect(() => {
    // Perform the API call to check the authentication status
    const fetchAuthenticationStatus = async () => {
      
      setAuthLoading(true)
       try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/cms/admins/is-authenticated`, { withCredentials: true })

        if(response.data.authenticated){
        console.log("isAuthenticated", response.data.authenticated)
    
        setIsAuthenticated(true)

        
       }
       else{
         setIsAuthenticated(false)
      }
    }
         catch(err){
            if(window.location.pathname === "/"){
                setAuthLoading(false)
                return ;
            }
            console.log(err)
            setAuthLoading(false)
            setIsAuthenticated(false)
            return window.location.href = "/";
         }

}
   
     fetchAuthenticationStatus().then(() => setAuthLoading(false))
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <LoadingContext.Provider value={{ authLoading, setAuthLoading }}>
            {(authLoading ) ? <div>loading</div> : children}
        </LoadingContext.Provider>
    </AuthContext.Provider>
  )
}
