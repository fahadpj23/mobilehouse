import { ImTruck } from 'react-icons/im';
import { IoMdCash } from 'react-icons/io';
import {Link} from "react-router-dom";
import axios from 'axios'
import { Usercontext } from '../context/userContext';
import {useContext} from 'react'
import React, { useState } from 'react';
import ProductSlider from '../Home/productSlick'

const SingleItemMain=(props)=>{
    const [qty, setqty] = useState(1)
    const [qtystate, setqtystate] = useState("ok")
    const [pincode, setpincode] = useState("")
    const [pincodeavailability, setpincodeavailability] = useState("")

    let item=props.singleitem
    console.log(props.singleitem)
    const context=useContext(Usercontext)
   

    
    const checkpincode=()=>{
        axios.get(`http://localhost:9000/pincode`,{params: { pincodeno: pincode}})
        
        .then(res=>{
       
          if(res.data.length==0)
          {
            setpincodeavailability("not available in this pincode")
          }
          else
          {
              setpincodeavailability("available")
          }
          
          })  
    }
 
    return(
        <div className="pb-10">
            
               
                        <div className="w-full flex justify-center">
                            <div className="w-11/12 flex  mt-5 ">
                                <div className="w-5/12 flex ] flex-col space-y-4 ">
                                    <img src={`http://localhost:9000/images/${item.image}`} alt="" className="object-contain  overflow-hidden h-96 "/>
                                    <div className="space-x-3 flex">
                                        {/* <button className="w-6/12 font-semibold text-white bg-yellow-400 py-3">ADD TO CART</button> */}
                                      <Link to={{pathname: "/Address", state:{itemid:item.id,itemtype:item.type,itembrand:item.brand,orderqty:qty}}} onClick={()=>context.addtocart(item)} className="w-full font-semibold flex justify-center text-white bg-primary py-3">ORDER NOW</Link>
                                    </div>
                                    

                                </div>
                                <div className="ml-5 w-7/12 flex flex-col  ">
                                    <div className="w-10/12">
                                        <div className="mt-10 space-y-1">
                                            <h1 className="text-xl ">{item.name} {item.CoverType}</h1>
                                            <h1><span className="text-xl font-bold text-green-500">₹{item.price}</span><span className="line-through ml-3 text-lg text-gray-400">₹{item.mrp}</span></h1>
                                            <h1 className="flex items-center bg-green-100 w-8/12 py-2 px-1"><span ><ImTruck className="text-gray-500"/></span><span className="font-semibold ml-1 "> Free Shipping </span><span className="text-sm ml-1">  & Inclusive of all taxes</span></h1>
                                            <div className="flex ">
                                                <div className="w-2/12 flex flex-col  space-y-2">
                                                    <h1>Color</h1>
                                                    <h1>Warranty</h1>
                                                    <h1>Material</h1>
                                                    <h1>Brand</h1>
                                                </div>
                                                <div className="w-2/12 space-y-2">
                                                    <h1>:</h1>
                                                    <h1>:</h1>
                                                    <h1>:</h1>
                                                    <h1>:</h1>
                                                </div>
                                                <div className="w-8/12 space-y-2">
                                                    <h1>{item.color}</h1>
                                                    <h1>{item.warranty}</h1>
                                                    <h1>{item.material}</h1>
                                                    <h1>{item.Brand}</h1>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex mt-10">
                                                    <h1 className="text-xl">QTY :</h1>
                                                    <div className="flex space-x-1  ml-2">
                                                        <button  onClick={()=>qty>1 ? (setqty(qty-1),setqtystate("ok")):(setqty(1),setqtystate("ok"))}className="bg-gray-300  focus:outline-none px-3 h-7 text-semibold text-2xl"><h1 className="flex items-center text-xl text-semibold">-</h1></button>
                                                        <input type="number" value={qty}className="w-10 border-2 text-center h-7 border-gray-100"/> 
                                                        <button onClick={()=>{qty+1<=item.qty ? setqty(qty+1): setqtystate("notok")}}className="px-3 bg-green-300  focus:outline-none h-7 "><h1 className="flex items-center text-xl text-semibold">+</h1></button>

                                                    </div>
                                                    
                                                </div> 
                                                <h1 className={`${qtystate=="notok" ? "block mt-3" :"hidden"}`}>only {item.qty} item available </h1>  
                                            </div>
                                            <div >
                                                <h1 className="mt-8 font-semibold">DELIVERY OPTION</h1>
                                                <div className="border-2 w-10/12 mt-2 border-gray-200 p-2 h-36 space-y-3">
                                                    <h1 className="text-xs  ">Enter your Pincode to check the delivery time and free pick up options</h1>
                                                    <div className="  flex">
                                                        <div className="relative">
                                                            <input onChange={(e)=>setpincode(e.target.value)} type="number" className=" border-2 w-full border-gray-200 focus:outline-none "  />
                                                            <button onClick={()=>checkpincode()} className="absolute right-3 focus:outline-none text-sm text-blue-500 underline">check</button>
                                                        </div>
                                                        <h1 className="text-green-600 ml-2">{pincodeavailability}</h1>
                                                    </div>
                                                   
                                                    <h1 className="flex items-center"><IoMdCash className="mr-2"/> Cash On Delivery </h1>
                                                   


                                                </div>
                                            </div>
                                            
                                           
                                        </div> 
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    
                
        {/* {props.relateditems!="" &&
        <div className="w-full flex justify-center">
            <div className="w-10/12">
                <ProductSlider
                Heading="Related Items"
                items={props.relateditems}
                />
            </div>
             
        </div>
       
        } */}

        </div>
    )
}
export default SingleItemMain