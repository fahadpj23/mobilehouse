
import { FaArrowLeft } from 'react-icons/fa';
import { useState,useEffect } from 'react';
import { MobileHouseApi } from 'helpers/axiosinstance';
import {BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const MobileSearchWindow=(props)=>{

    const [searchitem,setsearchitem]=useState("")

   
    return(
        <div className='block sm:hidden fixed top-0 left-0 w-screen h-screen bg-white z-20 '>
            <div className=" flex  items-center bg-white  border-b border-gray-200">
                <FaArrowLeft onClick={(e)=>props.searchClose(e.target.value)} className=' text-sm text-gray-500 w-2/12 mt-1'/>
                <input onChange={(e)=>{props.   searchProduct(e.target.value)}} className=" h-12 w-full focus:outline-none pr-2 " autoFocus placeholder='search..' type="search"/>
            </div>
            <div className='h-full overflow-auto'>
            <div className='flex flex-col   px-2'>
            {props.serachitem && props.serachitem.products?.map((item,key)=>{
                                    return(
                                        // <Link to={{pathname: "/singleItem",   search: "?" + new URLSearchParams({productid: item.id}).toString() }} className="h-full items-center justify-center flex flex-col space-y-3 p-4 ">
                                        // <img src={`http://127.0.0.1:9000/images/${item.image}`} alt="dd" className="object-cover h-40 overflow-hidden transform hover:-translate-y-1 hover:scale-90 hover:duration-700 "/>
                                        
                                        // </Link>
                                        <button onClick={()=>props.selectNavProduct(item)}  className="hover:text-blue-400 text-left py-2 focus:outline-none px-2">
                                            <div className='flex'>
                                                <div className='w-10/12 flex flex-col justify-center'>
                                                    <h1 className='text-black text-xs truncate tracking-wide'>{item.name}</h1>
                                                    <h1  className='text-blue-600 text-xs font-semibold tracking-wide'>in {item.categoryName}</h1>
                                                </div>
                                                <div className='w-2/12'>

                                                    <img src={   `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="" className="object-contain h-14 w-14 overflow-hidden flex justify-center" />
                                                </div>

                                            </div>
                                             
                                        </button>
                                    
                                    )
                                })}
            </div>
            <div className='flex flex-col   px-2'>
            {props.serachitem && props.serachitem.category?.map((item,key)=>{
                                    return(
                                        <Link className="  hover:text-blue-400 text-left py-2 focus:outline-none px-2 flex items-center space-x-2 " to={{pathname: "/ProductList",search: "?" + new URLSearchParams({category: item.id,sort:"newestfirst"}).toString()}}>
                                                    
                                                        <h1 className='mt-1 text-gray-600 text-sm'><BsSearch/></h1>
                                                        <h1 className='text-xs tracking-wide'>{item.categoryName}</h1> 
                                                    </Link>
                                     
                                    
                                    )
                                })}
       
            {props.serachitem && props.serachitem.Brand?.map((item,key)=>{
                                    return(
                                        <Link className="  hover:text-blue-400 text-left py-2 focus:outline-none  flex items-center space-x-2hover:text-blue-400  px-2  space-x-2 " to={{pathname: "/ProductList",search: "?" + new URLSearchParams({Brand:item.Brand,sort:"newestfirst"}).toString()}}>
                                                    <h1 className='mt-1 text-gray-600 text-sm'><BsSearch/></h1>
                                                     <h1 className='text-xs tracking-wide'>{item.Brand}</h1> 
                                                  
                                                </Link>
                                            
                                     
                                    
                                    )
                                })}
            </div>
            </div>
        </div>
    )
}
export default MobileSearchWindow