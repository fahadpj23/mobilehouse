import { AiOutlineClose } from 'react-icons/ai';
import {MobileHouseApi} from "helpers/axiosinstance";
import { useState,useContext } from 'react';
import { Usercontext } from '../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserRegister=(props)=>{

    const[alreadyexist,setalreadyexist]=useState(false)
    const context=useContext(Usercontext)
    console.log(context)
    const handleSubmit=(e)=>{
        const data= new FormData(e.target)
      
        MobileHouseApi.post('/UserRegister',data)
        .then((res)=>{
           if(res.data.alreadyexist)
           {
            context.notify("username already exist")

           }
            if(res.data.UserToken)
            {
                localStorage.setItem("UserToken",res.data.UserToken)
                localStorage.setItem("UserName",res.data.username)
                props.setusername(res.data.username)
                props.setregisteruser(false)
                window.location.reload(false);
            }
        })
        e.preventDefault();
      }
    
    return(
        

   
        <form onSubmit={(e)=>handleSubmit(e)} method="post" className="w-screen h-screen fixed flex items-center  bg-black   bg-opacity-80 justify-center z-20 top-0 left-0 ">
        
            <div className=" w-8/12 md:w-4/12 lg:w-3/12 h-3/5 flex flex-col relative bg-white shadow-5xl pb-5 overflow-auto justify-between  border  border-gray-400-lg">
               
                  
                
                <div className="w-full flex flex-col items-center h-full justify-evenly">
                    <button type="button" onClick={()=> context.setregisteruser(false)} className="absolute top-3 focus:outline-none right-3 "><AiOutlineClose/></button>
                    <h1 className="text-lg font-semibold text-center pb-3 mt-5">Welcome To MobileHouse</h1>
                    <div className="space-y-5 flex flex-col w-11/12  px-2 mt-4 ">
                
                       
                        <input className=" pl-2 focus:outline-none  border  border-gray-400 py-2 text-xs md:text-sm  " autoFocus required type="text" id="username" name="username" placeholder='username' />
                        {alreadyexist==true && <h1 className='text-sm text-red-500'>username already in use</h1>}
                      
                        <input className=" pl-2 focus:outline-none  border  border-gray-400 py-2 text-xs md:text-sm  " required type="text" id="MobileNumber " name="MobileNumber" placeholder='Mobile Number '  />
                        <input type="password" className=" pl-2 focus:outline-none  border  border-gray-400 py-2 text-xs md:text-sm  " required  id="password" name="password"  placeholder='password' />
                      
                         <input type="password" className=" pl-2 focus:outline-none  border  border-gray-400 py-2 text-xs md:text-sm  " required  id="ConfirmPassword" name="ConfirmPassword" placeholder='Confirm Password' />
                        
                       
                        

                    </div>
                    <div className='w-11/12 flex justify-end mt-4'>
                        <input type="submit" value="Submit" className="bg-black focus:outline-none text-xs sm:text-base text-white w-3/12 font-semibold py-2 rounded" />

                    </div>


                </div>
               
                
            </div>
        </form>
    )
}
export default UserRegister