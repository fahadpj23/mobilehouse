import React from 'react';

import ContextProvider from './context/userContext';
import {useEffect,useState} from 'react'
import { AuthContext } from "./helpers/authcontext";
import { MobileHouseApi } from 'helpers/axiosinstance';
import AppRouter from 'Routes/appRouter';
function App(){
    const[ authState, setAuthState ]=useState("")
    const[ UserauthState, setUserAuthState ]=useState("")


  
   
    useEffect(()=>{
        
       
          MobileHouseApi.get('authentication',{withCredentials:true})
            .then((res)=>{
               
               if(res.data.success)
               {
                setAuthState("authorized")
            
               }
               else
               {
                   setAuthState("unauthroized")
               }
            
            })
        

            MobileHouseApi.get('userAuthentication',{withCredentials:true})
            .then((res)=>{
        
            if(res.data.success)
            {
                setUserAuthState("authorized")
            
            }
            else
            {
                setUserAuthState("unauthroized")
            }
        
            
            })
        
    },[])
   
    return(
       <>
        
            <AuthContext.Provider value={{ authState, setAuthState ,UserauthState, setUserAuthState}}>
                     
                        <ContextProvider > 
                            
                            {
                                (authState!=="" && UserauthState!=="") &&
                                        <AppRouter
                                        authState={authState}
                                        />
                            }
                           
                           
                           
                        </ContextProvider>
            </AuthContext.Provider>
                  
           
        
        </>
    )
}
export default App;