import React from 'react';

import {Route} from  "react-router-dom";
import { Navigate } from 'react-router-dom';
function AdminRoute(props){
    const {authState}=props
   
    return(
       <>
        
          
        <Route 
            {...!authState && <Navigate to="/adminLogin" />}
        />

                           
                           
                           
                     
                  
           
        
        </>
    )
}
export default AdminRoute;