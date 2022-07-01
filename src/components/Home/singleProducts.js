import {Link} from "react-router-dom";
import {AiOutlineShoppingCart } from 'react-icons/ai';
import {Usercontext} from '../context/userContext'
import {Component, useContext,useState} from 'react'
import { GiConsoleController } from "react-icons/gi";
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
 
   
   console.log(item)
    return(
        <div>
            
            <div  className="lg:10/12  w-full  rounded-lg flex flex-col overflow-hidden bg-gray-50 shadow-lg">
                            <Link to={{pathname: "/singleItem",   search: "?" + new URLSearchParams({productid: item.id}).toString() }} className="h-full items-center justify-center flex flex-col space-y-3 p-4 ">
                                     <img src={`http://127.0.0.1:9000/images/${item.image}`} alt="dd" className="object-cover h-40 overflow-hidden transform hover:-translate-y-1 hover:scale-90 hover:duration-700 "/>
                                     
                            </Link>
                            
                            {/* <Link to={{pathname: "/singleItem",   search: "?" + new URLSearchParams({productid: "clientId",pro:"fddf"}).toString() ,state:{itemid:item.id}}} className="h-full items-center justify-center flex flex-col space-y-3 p-3 ">
                                     <img src={`http://127.0.0.1:9000/images/${item.image}`} alt="dd" className="object-cover h-48 overflow-hidden transform hover:-translate-y-1 hover:scale-110 hover:duration-700 "/>
                                     
                            </Link> */}
                        
                            <div className="px-2 py-2 flex justify-between">
                                    <div className="w-full">
                                        <h1 className="font-semibold text-md truncate">{item.name}</h1>
                                        <div className="flex justify-between w-full">
                                            <div className="w-5/12">
                                                <h1 className="font-semibold truncate " >₹{(item.salesPrice && item.salesPrice!=0) ? item.salesPrice : item.sellingPrice}.00Rs</h1>
                                                <h1 className="text-xs line-through truncate">₹{item.mrp}.00Rs</h1>
                                               
                                            </div>
                                            {/* <div className="flex items-center justify-end w-7/12">
                                                {
                                            
                                                    context.cart.find(item1 => item1.id === item.id)==undefined ?
                                                        <button onClick={()=>context.addtocart(item)} className=" bg-blue-500  text-white text-xs py-2 font-semibold rounded-lg px-2 mt-2">Add to Cart+</button>
                                                    :
                                                        <button  className=" bg-blue-500  text-white text-xs py-2 font-semibold rounded-lg px-2 mt-2">GO TO CART</button>
            
                                                } 
                                            </div>    */}
                                        </div>
                                       
                                       
                                    </div>
                                      
                            </div>
            </div>         
        </div>
    )
}
export default SingleProduct