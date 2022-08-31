
import React, { useState,useContext} from 'react';
import {FaRegUserCircle } from 'react-icons/fa';
import {MobileHouseApi} from "helpers/axiosinstance";
import {AiOutlineShoppingCart } from 'react-icons/ai';
import {BsSearch } from 'react-icons/bs';
import {Link} from "react-router-dom";
import Login from './login';
import UserRegister from './userRegister';
import {AuthContext} from '../../helpers/authcontext'
import { Usercontext } from '../context/userContext';
import { useHistory } from 'react-router-dom';
import MobileSearchWindow from './MobileSearchWindow';
const Nav=(props)=>{

    const context=useContext(AuthContext)
    const context1=useContext(Usercontext)
    let history=useHistory();
    
    const [serachitem, setserachitem] = useState("")
    const [loginstatus, setloginstatus] = useState(false)
    const [username, setusername] = useState(localStorage.getItem("UserName")  ? localStorage.getItem("UserName") :"Login/Signup")
    const [logout, setlogout] = useState(false)
    const [registeruser, setregisteruser] = useState(false)
    const [MobileSearchStatus, setMobileSearchStatus] = useState(false)
    const [serachValue, setserachValue] = useState("")

   

    document.addEventListener('click', function(event) {
        var ignoreClickOnMeElement = document.getElementById('productsearchInputTag');
        if(ignoreClickOnMeElement)
        {
        var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
        if ( !isClickInsideElement)
        {
            setserachitem("")
        }
        else
        {
            MobileHouseApi.get(`searchProduct`,{params: { searchitem:serachValue}})
        .then(res=>{
         setserachitem(res.data);
        })
        }
         }
    });
    const searchProduct=(searchval)=>{
      
            MobileHouseApi.get(`searchProduct`,{params: { searchitem: searchval}})
            .then(res=>{
             setserachitem(res.data);
            })
        
    }

    const selectNavProduct=(product)=>{
        console.log(product)
        history.push({pathname:'singleItem',search: "?" + new URLSearchParams({productid: product.id}).toString() })
        window.location.reload(false);
    }

    const loginsuccess=(userna)=>{
        setloginstatus(false)
        setusername(userna)
        
    }

    // in mobile view  when search click then a window open for searching
    const MobilesearchProduct=()=>{
        MobileHouseApi.get(`searchProduct`,{params: { searchitem: ""}})
        .then(res=>{
         setserachitem(res.data);
        })
            setMobileSearchStatus(true)
    }

    //mobile view search close
    const searchClose=()=>{
        setMobileSearchStatus(false)
    }
    console.log(serachitem)
    return(
        <div className="shadow-sm">
            {loginstatus===true&&
                <Login
                    loginsuccess={loginsuccess}
                    setloginstatus={setloginstatus}
                    setregisteruser={setregisteruser}
                    
                />
            }
            {
                registeruser===true &&
                <UserRegister
                    setregisteruser={setregisteruser}
                    setusername={setusername}
                   
                />

            }
            {
                MobileSearchStatus==true && 
                    <MobileSearchWindow
                    searchClose={searchClose}
                    serachitem={serachitem}
                    selectNavProduct={selectNavProduct}
                    searchProduct={searchProduct}
                    />
            }
                <div className=" w-full h-5  md:h-10 bg-gray-300 border-2 border-gray-100">
                </div>
                <div className="w-full flex  items-center justify-between py-2 pl-1 md:pl-0  pr-2  md:px-0">
                    <div className="w-full md:w-7/12 ">
                        <div className="flex items-center space-x-3 md:space-x-0">
                            <Link to={{pathname: "/" }}  className="w-8/12 md:w-6/12 ml-2">
                                <img src="MobilehouseLogo.png" alt="logo" width="250" height="250"  />
                                        
                            </Link>
                            <div className="relative sm:w-5/12 w-10/12 ">
                                <input id="productsearchInputTag" onChange={(e)=>(setserachValue(e.target.value),searchProduct(e.target.value))} type="text" placeholder="search here" className=" hidden md:block px-2 w-full rounded h-8 text-sm  md:h-9 focus:outline-none border border-gray-300 "/>
                                
                                
                                <div className={`${serachitem!=="" && MobileSearchStatus==false ? " hidden absolute  top-10 z-20 max-h-128 w-96 bg-white shadow-xl rounded-lg p-2 sm:flex flex-col overflow-y-scroll py-2   ": "hidden"}`}>
                                        <div className=' flex flex-col  space-y-2'>
                                        {serachitem!=="" && serachitem.products?.map((item,key)=>{
                                            return(
                                                // <Link to={{pathname: "/singleItem",   search: "?" + new URLSearchParams({productid: item.id}).toString() }} className="h-full items-center justify-center flex flex-col space-y-3 p-4 ">
                                                // <img src={`http://127.0.0.1:9000/images/${item.image}`} alt="dd" className="object-cover h-40 overflow-hidden transform hover:-translate-y-1 hover:scale-90 hover:duration-700 "/>
                                                
                                                // </Link>

                                             <button onClick={()=>selectNavProduct(item)}  className="hover:text-blue-400 text-left  focus:outline-none">
                                            <div className='flex'>
                                                <div className='w-9/12 flex flex-col justify-center'>
                                                    <h1 className='text-black text-sm truncate'>{item.name}</h1>
                                                    <h1  className='text-blue-600 text-xs font-semibold'>in {item.categoryName}</h1>
                                                </div>
                                                <div className='w-3/12 flex justify-center'>

                                                    <img src={   `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="" className="object-contain h-14 w-14 overflow-hidden" />
                                                </div>

                                            </div>
                                             
                                        </button>
                                        )})}
                                        </div>
                                        <div className='mt-2'>
                                        {serachitem && serachitem.category?.map((item,key)=>{
                                                return(
                                                    <Link className="  hover:text-blue-400 text-left py-2 focus:outline-none  flex items-center space-x-2 " to={{pathname: "/ProductList",search: "?" + new URLSearchParams({category: item.id,sort:"newestfirst"}).toString()}}>
                                                    
                                                        <h1 className='mt-1 text-gray-600 text-sm'><BsSearch/></h1>
                                                        <h1 className='text-sm tracking-wide'>{item.categoryName}</h1> 
                                                    </Link>
                                                    
                                                )
                                            })}
       
                                        </div>
                                        <div className=''>
                                        {serachitem && serachitem.Brand?.map((item,key)=>{
                                            return(
                                            
                                                <Link className="  hover:text-blue-400 text-left py-2 focus:outline-none  flex items-center space-x-2 " to={{pathname: "/ProductList",search: "?" + new URLSearchParams({Brand:item.Brand,sort:"newestfirst"}).toString()}}>
                                                    <h1 className='mt-1 text-gray-600 text-sm'><BsSearch/></h1>
                                                     <h1 className='text-sm tracking-wide'>{item.Brand}</h1> 
                                                  
                                                </Link>
                                            
                                            )
                                        })}
                                        </div>
                                       
                                    
                                    
                                
                                </div>
                            </div>
                        </div>
                    </div>
                  
                    <div className="w-2/12  space-x-5 flex justify-end md:justify-center">
                             <button onClick={()=>MobilesearchProduct()} className=" block md:hidden focus:outline-none  "><BsSearch/></button>

                            <div>
                            
                            {/* <Link className="     flex items-center py-1 hover:text-blue-500" to={{pathname: "/AboutUs"}}>About Us</Link> */}
                            {
                               username==="Login/Signup" ?

                               <button onClick={()=> setloginstatus(true) } className="flex hover:text-red-500 items-center relative focus:outline-none "><FaRegUserCircle className="mr-1 text-xl md:text-2xl  text-gray-700 font-light"/><h1 className="lg:block hidden">{username}</h1></button>
                               :
                              <Link className="     flex items-center py-1 hover:text-blue-500" to={{pathname: "/Profile"}}><FaRegUserCircle className="mr-1 text-xl md:text-2xl text-gray-700 font-light"/><h1 className="lg:block hidden">{username}</h1></Link> 
                            }
                                {/* <button onClick={()=>{username==="Login/Signup" ? setloginstatus(true) : setlogout(!logout)}} className="flex hover:text-red-500 items-center relative focus:outline-none "><FaRegUserCircle className="mr-1 text-2xl  text-gray-700 font-light"/><h1 className="lg:block hidden">{username}</h1></button> */}
                                {/* {
                                logout===true &&
                                    <div className="  absolute   z-20 shadow-lg  rounded-lg border border-gray-200  w-1/12 bg-white ">
                                         <button onClick={()=>{clearuser()}} className=" focus:outline-none   text-blue-600 px-2 font-bold py-2 w-full text-center hover:text-red-500 ">Profile</button>

                                        <button onClick={()=>{clearuser()}} className=" focus:outline-none r text-blue-600 px-2 font-bold py-2 w-full text-center hover:text-red-500 ">Log Out</button>
                                    </div>

                                } */}
                            </div>
                           
                            {/* <button onClick={()=>console.log("df")} className="flex items-center focus:outline-none "><AiOutlineShoppingCart className="mr-1 text-2xl text-gray-700  font-light"/><h1 className="lg:block hidden">Cart</h1></button> */}
                            <Link to="/cart" className="flex items-center focus:outline-none"><AiOutlineShoppingCart className="mr-1 text-2xl text-gray-700  font-light"/><h1 className="md:block hidden">Cart</h1></Link>
           
                    </div>
                    
                </div>
                {/* <hr className="w-full h-1 bg-gray-200"></hr> */}
        </div>
        )
}
export default Nav
      