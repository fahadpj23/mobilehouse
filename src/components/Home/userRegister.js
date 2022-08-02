import { AiOutlineClose } from 'react-icons/ai';
import {MobileHouseApi} from "helpers/axiosinstance";
import { useState,useContext } from 'react';
import { Usercontext } from '../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserRegister=(props)=>{

    const[alreadyexist,setalreadyexist]=useState(false)
    const context1=useContext(Usercontext)
    console.log(context1)
    const handleSubmit=(e)=>{
        const data= new FormData(e.target)
        MobileHouseApi.post('/UserRegister',data)
        .then((res)=>{
           if(res.data.alreadyexist)
           {
            context1.notify("username already exist")

           }
            if(res.data.UserToken)
            {
                localStorage.setItem("UserToken",res.data.UserToken)
                localStorage.setItem("UserName",res.data.username)
                props.setusername(res.data.username)
                props.setregisteruser(false)
            }
        })
        e.preventDefault();
      }
    
    return(
        

   
        <form onSubmit={(e)=>handleSubmit(e)} method="post" className="w-screen h-screen fixed flex items-center  bg-gray-100   bg-opacity-95 justify-center z-20 top-0 left-0 ">
        
            <div className="w-8/12 sm:w-4/12 lg:w-3/12 h-3/5 flex flex-col relative bg-white shadow-5xl pb-5 overflow-auto justify-between  rounded-lg">
               
                  
                
                <div className="w-full flex flex-col items-center h-full justify-evenly">
                    <button className="absolute top-3 focus:outline-none right-3 "><AiOutlineClose/></button>
                    <h1 className="text-2xl font-semibold  p-3w-full text-center">SignUp</h1>
                    <div className="space-y-5 flex flex-col w-11/12  px-2 mt-6 ">
                
                       
                        <input className=" pl-2 focus:outline-none  rounded-2xl py-2 bg-gray-200 " type="text" id="username" name="username" placeholder='username' />
                        {alreadyexist==true && <h1 className='text-sm text-red-500'>username already in use</h1>}
                      
                        <input className=" pl-2 focus:outline-none  rounded-2xl py-2 bg-gray-200 " type="text" id="MobileNumber " name="MobileNumber" placeholder='Mobile Number '  />
                        <input className=" pl-2 focus:outline-none  rounded-2xl py-2 bg-gray-200 " type="text" id="password" name="password"  placeholder='password' />
                      
                         <input className=" pl-2 focus:outline-none  rounded-2xl py-2 bg-gray-200 " type="text" id="ConfirmPassword" name="ConfirmPassword" placeholder='Confirm Password' />
                        
                       
                        

                    </div>
                    <div className='w-11/12 px-2'>
                        <input type="submit" value="Submit" className="bg-gradient-to-r w-full from-red-700 to-red-300 focus:outline-none text-white font-semibold py-2 rounded-2xl" />

                    </div>


                </div>
               
                
            </div>
        </form>
    )
}
export default UserRegister