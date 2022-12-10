import { useState,useContext } from "react"
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { GoKey } from 'react-icons/go';
import { Usercontext } from "../../context/userContext";
import { MobileHouseApi } from "helpers/axiosinstance";

const Login=(props)=>{
    const context=useContext(Usercontext)
    const [loginst, setloginst] = useState("")
  
    console.log(context)

    // const loginf=()=>{
    //     axios.get(`http://localhost:9000/login`,{params: { username: username,password:password}})     
    //         .then(res=>{
               
    //             if(res.data.UserToken)
    //             {
                    
    //                 localStorage.setItem("UserToken",res.data.UserToken)
    //                 localStorage.setItem("UserName",res.data.username)
    //                 props.loginsuccess && props.loginsuccess(res.data.username)
    //             }
    //             else
    //             {
    //                 context.notify(res.data.error,"error")
    //             }
    //        console.log(res.data)

    //     })   
    // }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data= new FormData(e.target)
        MobileHouseApi.post(`/login`,data)
        .then(res=>{
               
            if(res.data.UserToken)
            {
                
                localStorage.setItem("UserToken",res.data.UserToken)
                localStorage.setItem("UserName",res.data.username)
                props.loginsuccess && props.loginsuccess(res.data.username)
             window.location.reload(false);
            }
            else
            {
                context.notify(res.data.error,"warning")
            }
                 console.log(res.data)

            })  
            .catch((error)=>{
                console.log(error)
            } )

      }

     
    return(
        <>
        {context && context.loginstatus==true &&
        <form onSubmit={(e)=>handleSubmit(e)} method="post"className="w-full h-screen fixed flex items-center  bg-black   bg-opacity-80 justify-center z-20 top-0 left-0 ">
        
            <div className=" w-10/12 md:w-4/12 xl:w-3/12 h-3/5 flex flex-col relative bg-white shadow-5xl pb-6  justify-center  rounded-lg">
                <div className="w-full flex flex-col px-3">
                    <button type="button" onClick={()=> context.setloginstatus(false)}className="absolute top-3 focus:outline-none right-3 z-20 "><AiOutlineClose/></button>
                    <h1 className="text-lg font-semibold text-center pb-3 mt-5">Welcome To MobileHouse</h1>
                    {/* <h1 className="text-2xl font-bold  pb-3 mt-6 tracking-normal">LOGIN</h1> */}
                    <div className="space-y-6 flex flex-col w-full  mt-8 ">
                        <div className=" border  border-gray-400 flex items-center space-x-1 px-2 ">
                            <h1><FaUser/></h1>
                            <input  name="username" placeholder="username" required autoFocus className="focus:placeholder-mb-10  text-sm sm:text-base pl-2 focus:outline-none   py-1.5 md:py-2 " />
                        </div>
                        <div className=" border  border-gray-400 flex items-center space-x-1 px-2">
                            <h1 className="mt-1"><GoKey/></h1>
                            <input type="password" required   name="password" className="text-sm    sm:text-base  pl-2 focus:outline-none py-1.5 md:py-2  " placeholder="password "/>
                        </div>
                        <h1 className="text-xs text-red-500">{loginst}</h1>
                        {/* <div className="flex items-center space-x-1">
                             <input type="checkbox" id="login" value="login" name="login"/> 
                             <label for="login">Remember me</label>
                        </div> */}
                        <div className="w-full flex justify-end">
                            <button type="submit" className="bg-black focus:outline-none text-xs sm:text-base text-white w-3/12 font-semibold py-2 rounded">LOGIN</button>
                        </div>
                        {/* <button className="text-gray-600 focus:outline-none">forgot password?</button> */}
                        <div className=" text-xs md:text-base flex space-x-2 justify-end  mt-8">
                            <h1>not a memeber</h1>
                            <button type="button" onClick={()=>(context.setloginstatus(false),context.setregisteruser(true))} className="text-blue-500 focus:outline-none text-xs md:text-sm">Sign Up now?</button>
                        </div>
                        <div className="text-xs">
                            <h1 className="space-x-1"><span>By continuing, you agree to Mobile House</span><span className="font-semibold">Terms of Use</span><span>and</span><span className="font-semibold">Privacy Policy.</span>   </h1>
                        </div>
                
                    </div>
                </div>
              
            </div>
        </form>
        }
        </>
    )
}
export default Login