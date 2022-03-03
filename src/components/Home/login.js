import { useState } from "react"
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai';
const Login=(props)=>{
    console.log(props)
    const [loginst, setloginst] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")


    const loginf=()=>{
        axios.get(`http://localhost:9000/login`,{params: { username: username,password:password}})     
            .then(res=>{
                if(res.data.UserToken)
                {
                    
                    localStorage.setItem("UserToken",res.data.UserToken)
                    localStorage.setItem("UserName",res.data.username)
                    props.loginsuccess && props.loginsuccess(res.data.username)
                }
           console.log(res.data)

        })   
    }

    return(
        <div className="w-screen h-screen fixed flex items-center  bg-gray-100   bg-opacity-95 justify-center z-20 top-0 left-0 ">
        
            <div className="w-8/12 sm:w-4/12 lg:w-3/12 h-3/5 flex flex-col relative bg-white shadow-5xl pb-5 overflow-auto justify-between  rounded-lg">
                <div className="w-full flex flex-col items-center">
                    <button onClick={()=> props.setloginstatus(false)}className="absolute top-3 focus:outline-none right-3 "><AiOutlineClose/></button>
                    <h1 className="text-2xl font-semibold pt-7 pb-3">LOGIN</h1>
                    <div className="space-y-5 flex flex-col w-11/12  px-2 mt-6 ">
                        <input onChange={(e)=>{setusername(e.target.value)}} className=" pl-2 focus:outline-none  rounded-2xl py-2 bg-gray-200 " placeholder="username "/>
                        <input  onChange={(e)=>{setpassword(e.target.value)}}  className=" pl-2 focus:outline-none   rounded-2xl py-2 bg-gray-200 " placeholder="password "/>
                        <h1 className="text-xs text-red-500">{loginst}</h1>
                        <div className="flex items-center space-x-1">
                            <input type="checkbox" id="login" value="login" name="login"/>
                            <label for="login">Remember me</label>
                        </div>
                        <button onClick={()=>loginf()} className="bg-gradient-to-r  from-red-700 to-red-300 focus:outline-none text-white font-semibold py-2 rounded-2xl">LOGIN</button>
                        <button className="text-gray-600 focus:outline-none">forgot password?</button>

                    </div>
                </div>
                <div className="flex space-x-2 justify-end px-2">
                    <h1>not a memeber</h1>
                    <button onClick={()=>(props.setloginstatus(false),props.setregisteruser(true))} className="text-blue-500 focus:outline-none text-sm">Sign Up now?</button>
                </div>
                
            </div>
        </div>
    )
}
export default Login