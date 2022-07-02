import axios from 'axios' 
import React, { useState,useContext } from 'react';
import { Usercontext } from 'components/context/userContext';
import {Route,BrowserRouter as Router} from  "react-router-dom";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../helpers/authcontext';
import MobileHouseApi from 'helpers/axiosinstance';
const AdminLoginMain=()=>{
let history=useHistory();
const Auth=useContext(AuthContext)
const context=useContext(Usercontext )

const handleSubmit=(e)=>{
    e.preventDefault();
    const data=new FormData(e.target)
        
   
    MobileHouseApi.post('adminlogin',data)
    .then((res)=>{
                if(res.data.accessToken)
                {
                 
                    localStorage.setItem("accessToken",res.data.accessToken)
                    Auth.setAuthState("authorized")
                    history.push("/admin/Dashboard")
                    
                }
                else
                {
                    context.notify(res.data.error)
                }
    })
}
    // const Login=()=>{
    //     axios.get(`http://localhost:9000/adminlogin`,{params:{username:username,password:password}})    
    //     .then(res=>{
    //         console.log(res.data)
    //         if(res.data.accessToken)
    //         {
             
    //             localStorage.setItem("accessToken",res.data.accessToken)
    //             Auth.setAuthState("authorized")
    //             history.push("/Dashboard")
                
    //         }

    //       })  
    // }

    return(
        <form onSubmit={(e)=>handleSubmit(e)} method="POST" >
            <div>
            <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
                <div className="w-7/12 lg:flex shadow-2xl h-fixedNoNavlg4  ">
                    <div className=" w-full lg:w-1/2 border-r-2 border-gray-300 py-5 h-full bg-white ">
                        <div className="flex justify-center h-full ">
                            <div className="w-8/12 flex flex-col justify-center h-full">
                                <h1 className="text-3xl font-bold flex justify-center py-2 mb-5">Admin Login</h1>
                                <div className="space-y-3 flex flex-col py-3">
                                    
                                        <div className="space-y-1">
                                            <h1 className="font-semibold">username</h1>
                                            <input required="true" name="username" autoFocus className="bg-gray-200 w-full focus:outline-none py-1 rounded-lg px-2" type="text" />
                                        </div>
                                        <div className="space-y-1">
                                            <h1 className="font-semibold">password</h1>
                                            <input required="true" type="password" name="password" className="bg-gray-200 w-full  focus:outline-none py-1 rounded-lg px-2"/>
                                        </div>
                                    
                                </div>
                                <div className="w-full flex  mt-3  justify-between  ">
                                    <h1 className="text-blue-600 text-sm">forgot password?</h1>
                                    <button className="w-3/12 bg-black text-white justify-end py-1 rounded-lg">Log In</button>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                    <div className="w-1/2 hidden lg:flex items-center justify-center bg-white">
                         <img src="only logo.png" alt="images" className=" " />     
                    </div>

                </div>
            </div>
        </div>
        </form>
    )
}
export default AdminLoginMain