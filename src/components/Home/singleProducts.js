import {Link} from "react-router-dom";
import {AiOutlineShoppingCart } from 'react-icons/ai';
import {Usercontext} from '../context/userContext'
import {Component, useContext,useState} from 'react'
import { GiConsoleController } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import Nav from "./Nav";


const SingleProduct=(props)=>{
    const context=useContext(Usercontext)
    const [cartadd, setcartadd] = useState(false)
   
    let item=props.item ;
    // let imageArray=[];
    // let productImage=[];
    // if(item.image)
    //  {
    //     imageArray=item.image.split(';')
    //  }
    // imageArray && imageArray.map((item,key)=>{
    //     item && productImage.push(item.replace(/^\s+|\s+$/gm,''))
    // })
 
   

    return(
        <div>
            
            <div  className="lg:10/12  w-full  rounded-lg flex flex-col overflow-hidden bg-gray-50 shadow-lg">
                            <Link to={{pathname: "/singleItem",   search: "?" + new URLSearchParams({productid: item.id}).toString() }} className="h-full items-center justify-center flex flex-col space-y-3 p-4 ">
                                     <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="dd" className="object-cover h-28 md:h-48 overflow-hidden transform hover:-translate-y-1 hover:scale-90 hover:duration-700 "/>
                                     
                            </Link>
                            
                           
                        
                            <div className="px-2 py-2 flex justify-between">
                                    <div className="w-full">
                                        <h1 className="font-semibold text-sm md:text-md truncate">{item.name}</h1>
                                        <div className="flex justify-between w-full">
                                            <div className="w-10/12 md:w-5/12">
                                                <h1 className="font-semibold truncate text-sm md:text-base " >₹{(item.salesPrice && item.salesPrice!=0) ? item.salesPrice : item.sellingPrice}.00Rs</h1>
                                                <h1 className="text-xs line-through truncate ">₹{item.mrp}.00Rs</h1>
                                               
                                            </div>
                                            <div className="flex items-center justify-end w-7/12">
                                                {
                                            
                                                    context.cart.find(item1 => item1.id === item.id)==undefined ?
                                                        <button onClick={()=>context.addtocart(item,1,item.image)} className=" md:bg-blue-500 text-blue-500 md:text-white focus:outline-none   text-lg md:text-xs py-2 font-semibold rounded px-2 mt-2"><h1 className='md:hidden block  text-2xl '><FaPlus  className="py-1"/></h1><h1 className='md:block hidden'>Add to Cart+</h1></button>
                                                    :
                                                        // <button  className="  md:bg-blue-500 text-blue-500 md:text-white focus:outline-none   text-lg md:text-xs py-2 font-semibold rounded px-2 mt-2"><h1 className='md:hidden block text-blue-500 h-6 pt-1'><AiOutlineShoppingCart/></h1><h1 className='md:block hidden'>GO TO CART</h1></button>
                                                        <Link to="/cart"  className="  md:bg-blue-500 text-blue-500 md:text-white focus:outline-none   text-lg md:text-xs py-2 font-semibold rounded px-2 mt-2"><h1 className='md:hidden block text-blue-500 h-6 pt-1'><AiOutlineShoppingCart/></h1><h1 className='md:block hidden'>GO TO CART</h1></Link>

            
                                                } 
                                            </div>   
                                        </div>
                                       
                                       
                                    </div>
                                      
                            </div>
            </div>         
        </div>
    )
}
export default SingleProduct