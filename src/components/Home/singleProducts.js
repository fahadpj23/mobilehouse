import {Link} from "react-router-dom";
import {AiOutlineShoppingCart } from 'react-icons/ai';
import {Usercontext} from '../context/userContext'
import {Component, useContext,useState} from 'react'
import { GiConsoleController } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";


const SingleProduct=(props)=>{
    const context=useContext(Usercontext)
    const [cartadd, setcartadd] = useState(false)
    const history=useHistory()
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
   
    const singleProductView=(item)=>{
       
        history.push({ pathname: "/singleItem",   search: "?" + new URLSearchParams({productid: item.id}).toString() })
       
    }
   

    return(
        <div>
            
            <div   className="  w-full  rounded-lg flex flex-col overflow-hidden border border-gray-200 shadow-sm bg-white">
                            <button onClick={()=>singleProductView(item)}  className="h-full items-center justify-center flex flex-col space-y-2 p-3 focus:outline-none">
                                     <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="product image " className="object-cover h-28 md:h-40 overflow-hidden transform hover:-translate-y-1 hover:scale-90 hover:duration-700 focus:outline-none"/>
                                     
                            </button>
                            
                           
                        
                            <div className="p-2 flex justify-between">
                                    <div className="w-full">
                                        <h1 className="font-semibold text-xs md:text-base truncate">{item && item.name}</h1>
                                        <div className="flex justify-between w-full">
                                            <div className="w-10/12 md:w-8/12">
                                                <h1 className="font-semibold truncate text-xs md:text-base " >₹{(item.salesPrice && item.salesPrice!=0) ? item.salesPrice : item.sellingPrice}.00Rs</h1>
                                                <h1 className="text-cart line-through truncate ">₹{item.mrp}.00Rs</h1>
                                               
                                            </div>
                                            <div className="flex items-center justify-end w-5/12">
                                                {
                                            
                                                    context.cart.find(item1 => item1.id === item.id)==undefined ?
                                                        <button onClick={()=>context.addtocart(item,1,item.image)} className=" w-full md:bg-blue-500 text-blue-500 md:text-white focus:outline-none   text-sm md:text-xs py-2 font-semibold rounded px-2 "><h1 className='md:hidden block  text-2xl '><FaPlus  className="py-1 "/></h1><h1 className='md:block hidden'>Add +</h1></button>
                                                    :
                                                        //  <button  className="  md:bg-blue-500 text-blue-500 md:text-white focus:outline-none   text-lg md:text-cart py-2 font-semibold rounded px-2 mt-2"><h1 className='md:hidden block text-blue-500 h-6 pt-1'><AiOutlineShoppingCart/></h1><h1 className='md:block hidden'>GO TO CART</h1></button>
                                                        <Link to="/cart"  className=" w-full md:bg-blue-500 text-blue-500 md:text-white focus:outline-none   text-sm md:text-cart py-2 font-semibold rounded px-2 flex justify-center"><h1 className='md:hidden block text-lg text-blue-500 h-6 '><AiOutlineShoppingCart/></h1><h1 className='md:flex text-xs hidden items-center space-x-1'><span>CART</span><span><AiOutlineShoppingCart/></span>  </h1></Link>

                                                    
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