import {Link} from "react-router-dom";
import {AiOutlineShoppingCart } from 'react-icons/ai';
import {Usercontext} from '../context/userContext'
import {Component, useContext,useState} from 'react'
const SingleProduct=(props)=>{
    const context=useContext(Usercontext)
    const [cartadd, setcartadd] = useState(false)
   
    let item=props.item;
   console.log(item.image)   
    console.log(context.cart.find(item1 => item1.id === item.productid))
   
   
    return(
        
            <div  className="lg:10/12  w-full border-2 border-gray-300 rounded-lg flex flex-col overflow-hidden ">
                            <Link to={{pathname: "/singleItem", state:{itemid:item.id,itemtype:item.type,itembrand:item.brand}}} className="h-full items-center justify-center flex flex-col space-y-3 p-3 ">
                                     <img src={item.image} alt="dd" className="object-cover h-48 overflow-hidden transform hover:-translate-y-1 hover:scale-110 hover:duration-700 "/>
                                     
                            </Link>
                        
                            <div className="px-2 py-2 flex justify-between">
                                    <div className="w-7/12">
                                        <h1 className="font-semibold text-lg truncate">{item.name}</h1>
                                        <h1 className="flex items-center space-x-2 " ><p className="font-semibold  ">₹{item.price}</p><p className="text-xs line-through">₹{item.mrp}</p></h1>
                                    </div>
                                    <div className="flex items-center justify-end w-6/12">
                                        {
                                       
                                       context.cart.find(item1 => item1.productid === item.productid)==undefined ?
                                                <button onClick={()=>context.addtocart(item)} className=" bg-blue-500  text-white text-xs py-2 font-semibold rounded-lg px-2 mt-2">Add to Cart+</button>
                                            :
                                                <button  className=" bg-blue-500  text-white text-xs py-2 font-semibold rounded-lg px-2 mt-2">GO TO CART</button>
    
                                        } 
                                    </div>      
                            </div>
                           
        </div>
    )
}
export default SingleProduct