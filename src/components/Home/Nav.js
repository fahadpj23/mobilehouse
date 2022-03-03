import axios from 'axios' 
import React, { useState,useContext} from 'react';
import {FaRegUserCircle } from 'react-icons/fa';
import  MobileHouseApi from "../../helpers/axiosinstance"
import {AiOutlineShoppingCart } from 'react-icons/ai';
import {Link} from "react-router-dom";
import Login from './login';
import UserRegister from './userRegister';
import {AuthContext} from '../../helpers/authcontext'
import { Usercontext } from '../context/userContext';
const Nav=(props)=>{

    const context=useContext(AuthContext)
    const context1=useContext(Usercontext)
    console.log(context1)
    
    const [serachitemdis, setserachitemdis] = useState("")
    const [loginstatus, setloginstatus] = useState(false)
    const [username, setusername] = useState(localStorage.getItem("UserName")  ? localStorage.getItem("UserName") :"Login/Signup")
    const [logout, setlogout] = useState(false)
    const [registeruser, setregisteruser] = useState(false)

   


    const searchProduct=(searchitem1)=>{
        if(searchitem1=="")
        {
            setserachitemdis("")
        }
        else
        {
            MobileHouseApi.get(`searchProduct`,{params: { searchitem: searchitem1}})
        .then(res=>{
             setserachitemdis(res.data);
        })
        }
    }

    const loginsuccess=(userna)=>{
        setloginstatus(false)
        setusername(userna)
        
    }

    const clearuser=()=>
    {
        setusername("Login/Signup")
        setlogout(false)
    }
    console.log("l"+logout)
    return(
        <div >
            {loginstatus==true&&
                <Login
                    loginsuccess={loginsuccess}
                    setloginstatus={setloginstatus}
                    setregisteruser={setregisteruser}
                    
                />
            }
            {
                registeruser==true &&
                <UserRegister
                    setregisteruser={setregisteruser}
                    setusername={setusername}
                   
                />

            }
                <div className="w-full  h-10 bg-gray-300 border-2 border-gray-100">
                </div>
                <div className="w-full flex  items-center justify-between py-2">
                    <div className="w-full md:w-7/12 ">
                        <div className="flex items-center">
                            
                            <img className="w-8/12 md:w-6/12" src="mobilehouselogo.jpg" alt="logo" width="400" height="400"  />
                            <div className="relative sm:w-5/12 w-10/12 ">
                                <input onChange={(e)=>searchProduct(e.target.value)} type="text" placeholder="search here" className=" px-2 w-full rounded-lg  h-10 focus:outline-none border-2 border-gray-400 "/>
                                
                                
                                <div className={`${serachitemdis!="" ? " absolute  top-10 z-20 max-h-96 w-96 bg-gray-100 shadow-xl rounded-lg p-2 flex flex-col overflow-y-scroll  ": "hidden"}`}>
                                {serachitemdis!="" && serachitemdis.map((item,key)=>{
                                    return(
                                        
                                            <button className="hover:text-blue-400 text-left py-2">{item.name}</button>
                                    
                                    )
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="space-x-4 md:space-x-6 xl:space-x-14 w-11/12  md:w-5/12  text-xs xs:text-sm md:text-lg  text-right md:text-left  p-3 sm:block hidden">
                        <button className="focus:outline-none text-sm lg:text-md hover:text-red-500">HOME</button>
                        <button className="focus:outline-none text-sm lg:text-md hover:text-red-500">ABOUT</button>
                        <button className="focus:outline-none  text-sm lg:text-md hover:text-red-500">SERVICE</button>
                        <button className="focus:outline-none  text-sm lg:text-md hover:text-red-500">CONTACT</button>
                    </div> */}
                    <div className="w-2/12  space-x-5 flex">
                            <div>
                                <button onClick={()=>{username=="Login/Signup" ? setloginstatus(true) : setlogout(true)}} className="flex hover:text-red-500 items-center relative focus:outline-none "><FaRegUserCircle className="mr-1 text-2xl  text-gray-700 font-light"/><h1 className="lg:block hidden">{username}</h1></button>
                                {
                                logout==true &&
                                    <div className="  absolute   z-20    w-1/12">
                                        <button onClick={()=>{clearuser()}} className="text-white focus:outline-none px-2 font-bold py-2 bg-gray-300 hover:text-red-500 ">LOG OUT</button>
                                    </div>

                                }
                            </div>
                           
                            {/* <button onClick={()=>} className="flex items-center focus:outline-none "><AiOutlineShoppingCart className="mr-1 text-2xl text-gray-700  font-light"/><h1 className="lg:block hidden">Cart</h1></button> */}
                            <Link to="/cart" className="flex items-center focus:outline-none"><AiOutlineShoppingCart className="mr-1 text-2xl text-gray-700  font-light"/><h1 className="lg:block hidden">Cart</h1></Link>
           
                    </div>
                    
                </div>
        </div>
        )
}
export default Nav
      