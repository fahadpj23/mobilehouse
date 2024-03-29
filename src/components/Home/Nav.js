
import React, { useState,useContext,useEffect ,useMemo} from 'react';
import {ImUserCheck } from 'react-icons/im';
import {ImUserPlus } from 'react-icons/im';
import {MobileHouseApi} from "helpers/axiosinstance";
import {MdShoppingCart } from 'react-icons/md';
import {BsSearch } from 'react-icons/bs';
import {Link} from "react-router-dom";
import Login from './login';
import UserRegister from './userRegister';
import { Usercontext } from 'context/userContext';
import { useNavigate } from 'react-router-dom';
import MobileSearchWindow from './MobileSearchWindow';
import { debounce } from 'lodash';
const Nav=(props)=>{

    let context=useContext(Usercontext)
    let navigate=useNavigate();
    
    const [searchitem, setsearchitem] = useState("")
 
    const [username, setusername] = useState(localStorage.getItem("UserName")  ? localStorage.getItem("UserName") :"Login/Signup")
   
    const [MobileSearchStatus, setMobileSearchStatus] = useState(false)
    const [searchValue, setsearchValue] = useState("")

   

    document.addEventListener('click', function(event) {
       
        var ignoreClickOnMeElement = document.getElementById('productsearchInputTag');
        if(ignoreClickOnMeElement)
        {
        var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
        if ( !isClickInsideElement)
        {
            setsearchitem("")
        }
        // else
        // {
        //     MobileHouseApi.get(`searchProduct`,{params: { searchitem:searchValue}})
        //     .then(res=>{
        //     setsearchitem(res.data);
        //     })
        //     console.log("ds")
        // }
         }
    });


    const searchProduct=(searchval)=>{
            console.log(searchval)
            MobileHouseApi.get(`searchProduct`,{params: { searchitem: searchval}})
            .then(res=>{
           setsearchitem(res.data);
            })
        
    }
    const debounceFn= useMemo(() => debounce(searchProduct, 500), []);

    const selectNavProduct=(product)=>{
        console.log(product)
        navigate({pathname:`singleItem/${product.id}`, })
        window.location.reload(false);
    }

    // const loginsuccess=(userna)=>{
    //     setloginstatus(false)
    //     setusername(userna)
        
    // }

    // in mobile view  when search click then a window open for searching
    const MobilesearchProduct=()=>{
        MobileHouseApi.get(`searchProduct`,{params: { searchitem: ""}})
        .then(res=>{
         setsearchitem(res.data);
        })
            setMobileSearchStatus(true)
    } 

    //mobile view search close
    const searchClose=()=>{
        setMobileSearchStatus(false)
    }
   
    // function onKeyup(e) {
    //     console.log(e) 
    //     if (e.key == 'Enter') {
    //         console.log("dsds")
    //         let serachval=document.getElementById('productsearchInputTag').value
    //         navigate({pathname: "/productList",search: "?" + new URLSearchParams({type:'searchitem',searchitem:serachval,sort:"newestfirst"}).toString()})
    //         // setsearchitem("")
    //         // setsearchValue("")
      
        
    
    //     }
       
    //   }
    
    useEffect(()=>{
       var inputdiv = document.getElementById("productsearchInputTag");
       inputdiv.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
           setsearchValue("")
        navigate({pathname: "/productList",search: "?" + new URLSearchParams({type:'searchitem',searchitem:document.getElementById('productsearchInputTag').value,sort:"newestfirst",PageNo:1}).toString()},{replace:true})
       
    }
    });
    },[])


    return(
        <div className="shadow-sm ">
            {context.loginstatus===true&&
                <Login
                   
                    
                />
            }
            {
                context.registeruser===true &&
                <UserRegister
                   
                />

            }
            {
                MobileSearchStatus==true && 
                    <MobileSearchWindow
                    searchClose={searchClose}
                    searchitem={searchitem}
                    selectNavProduct={selectNavProduct}
                    searchProduct={searchProduct}
                    setsearchValue={setsearchValue}
                    setMobileSearchStatus={setMobileSearchStatus}
                    />
            }
                <div className=" w-full h-5  md:h-10 bg-gray-300 border-2 border-gray-100 ">
                </div>
                <div className="w-full flex  items-center justify-between py-2 pl-1 md:pl-0  pr-2  md:px-0">
                    <div className="w-full md:w-7/12 ">
                        <div className="flex items-center space-x-3 md:space-x-0 w-full">
                            <Link to={{pathname: "/" }}  className="w-8/12 md:w-full  ml-2 focus:outline-none">
                                <img src="/MobilehouseLogo.png" alt="logo" width="250" height="250"  />
                                        
                            </Link>
                            <div className="hidden md:block relative w-10/12 " >
                                <input id="productsearchInputTag" autoComplete="off" onChange={(e)=>(setsearchValue(e.target.value),debounceFn(e.target.value))} type="text" placeholder="search here" className=" hidden md:block px-2 w-full rounded h-8 text-sm  md:h-9 focus:outline-none border border-gray-300 "/>
                                
                                
                                <div className={`${searchValue!="" && searchitem!=="" && MobileSearchStatus==false ? " hidden absolute  top-10 z-20 max-h-128 w-96 bg-white shadow-xl rounded-lg p-2 sm:flex flex-col overflow-y-scroll py-2   ": "hidden"}`}>
                                        <div className=' flex flex-col  space-y-2'>
                                        {searchitem!=="" && searchitem.products?.map((item,key)=>{
                                            return(
                                                
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
                                        {searchitem && searchitem.category?.map((item,key)=>{
                                                return(
                                                    <Link className="  hover:text-blue-400 text-left py-2 focus:outline-none  flex items-center space-x-2 " to={{pathname: "/ProductList",search: "?" + new URLSearchParams({type:'category',PageNo:1,category: item.id,sort:"newestfirst"}).toString()}}>
                                                    
                                                        <h1 className='mt-1 text-gray-600 text-sm'><BsSearch/></h1>
                                                        <h1 className='text-sm tracking-wide'>{item.categoryName}</h1> 
                                                    </Link>
                                                    
                                                )
                                            })}
       
                                        </div>
                                        <div className=''>
                                        {searchitem && searchitem.Brand?.map((item,key)=>{
                                            return(
                                            
                                                <Link className="  hover:text-blue-400 text-left py-2 focus:outline-none  flex items-center space-x-2 " to={{pathname: "/ProductList",search: "?" + new URLSearchParams({type:'Brand',PageNo:1,Brand:item.Brand,sort:"newestfirst"}).toString()}}>
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
                  
                    <div className="w-4/12  md:w-2/12  flex justify-between space-x-5 md:justify-center items-center">
                             <button onClick={()=>MobilesearchProduct()} className=" block md:hidden focus:outline-none  "><BsSearch/></button>

                           
                           
                            {/* <button onClick={()=>console.log("df")} className="flex items-center focus:outline-none "><AiOutlineShoppingCart className="mr-1 text-2xl text-gray-700  font-light"/><h1 className="md:block hidden">Cart</h1></button> */}
                            <Link to="/cart" className="flex items-center focus:outline-none"><MdShoppingCart className="mr-1 text-xl text-blue-500  font-light"/><h1 className="md:block hidden">Cart</h1></Link>
                            {
                              localStorage.getItem('UserName') ?

                              <Link className="     flex items-center py-1 hover:text-blue-500" to={{pathname: "/Profile"}}><ImUserCheck className="mr-1 text-xl text-blue-500 font-light"/><h1 className="md:block hidden">{username}</h1></Link> 
                              :
                              <button onClick={()=> context.setloginstatus(true) } className="flex text-gray-500 items-center relative focus:outline-none text-xl space-x-1 "><ImUserPlus  className='text-lg '/><h1 className='text-sm hidden md:block'>Login</h1></button>
                            }
                    </div>
                    
                </div>
                {/* <hr className="w-full h-1 bg-gray-200"></hr> */}
        </div>
        )
}
export default Nav
      