import React, { createContext, useState, useEffect } from 'react'

import axios from 'axios'

export const AuthContext = createContext()
export const LoadingContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    // Perform the API call to check the authentication status
    const fetchAuthenticationStatus = async () => {
        
       try{
        setAuthLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/cms/admins/is-authenticated`, { withCredentials: true })

        if(response.data.authenticated){
        console.log("isAuthenticated", response.data.authenticated)
    
        setIsAuthenticated(true)
        setAuthLoading(false)

        if(window.location.pathname === "/"){
            return window.location.href = "/dashboard"
        }
        
       }
         else{
        console.log("isAuthenticated", response.data.authenticated)
        setIsAuthenticated(false)
        setAuthLoading(false)
        return (window.location.href = "/")
       }
    }
         catch(err){
            if(window.location.pathname === "/"){
                setAuthLoading(false)
                return ;
            }
            console.log(err)
            setIsAuthenticated(false)
            setAuthLoading(false)
            return window.location.href = "/";
         }

}
   
     fetchAuthenticationStatus()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <LoadingContext.Provider value={{ authLoading, setAuthLoading }}>
            {(authLoading ) ? <div>loading</div> : children}
        </LoadingContext.Provider>
    </AuthContext.Provider>
  )
}
