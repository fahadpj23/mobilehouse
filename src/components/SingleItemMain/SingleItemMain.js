import { ImTruck } from 'react-icons/im';
import { IoMdCash } from 'react-icons/io';
import {Link} from "react-router-dom";
import axios from 'axios'
import { Usercontext } from '../context/userContext';
import {useContext} from 'react'
import React, { useState } from 'react';
import ProductSlider from '../Home/productSlick'
import { useHistory } from 'react-router-dom';
const SingleItemMain=(props)=>{
    let history=useHistory();
    const [qty, setqty] = useState(1)
    const [qtystate, setqtystate] = useState("ok")
    const [pincode, setpincode] = useState("")
    const [pincodeavailability, setpincodeavailability] = useState("")
    const [imagedisplay, setimagedisplay] = useState(props.singleitem)
    const [ramdisplay, setramdisplay] = useState(props.singleitem)
    const [storagedisplay, setstoragedisplay] = useState(props.singleitem)
    let colorArray=[];
    let ramArray=[];
    let storageArray=[];
    let imageArray=[];
    let item=props.singleitem
  
    // console.log(props.singleitem)
    console.log(ramdisplay)
    const context=useContext(Usercontext)
   
        props.variants && props.variants.map((item,key)=>{
           
            item.image   && item.ram.attributeId== props.singleitem.ram.attributeId && item.storage.attributeId== props.singleitem.storage.attributeId  &&imageArray.push(item)
            // item.color && props.singleitem.color.attributeId!=item.color.attributeId && colorArray.some((product)=>product.color.attributeId==item.color.attributeId)==false && colorArray.push(item)
            item.ram &&  ramArray.some((product)=>product.ram.attributeId==item.ram.attributeId)==false && ramArray.push(item)
             item.storage &&  item.ram.attributeId== props.singleitem.ram.attributeId && storageArray.some((product)=>product.storage.attributeId==item.storage.attributeId)==false  && storageArray.push(item)
            // item.color && props.singleitem.image.attributeId!=item.image.attributeId &&  colorArray.some((product)=>product.attributeId==item.color.attributeId)==false && colorArray.push(item.color)
            // item.image && props.singleitem.image!=item.image && imageArray.some((product)=>product.image==item.image)==false  && imageArray.push(item)
            // item.ram && props.singleitem.ram.attributeId!=item.ram.attributeId && ramArray.some((product)=>product.attributeId==item.ram.attributeId)==false && ramArray.push(item.ram)
            // item.storage && props.singleitem.storage.attributeId!=item.storage.attributeId && storageArray.some((product)=>product.attributeId==item.storage.attributeId)==false  && storageArray.push(item.storage)
        })
    
    // setimagedisplay(props.singleitem)
    
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
                                    <img src={`http://localhost:9000/images/${imagedisplay.image}`} alt="" className="object-contain  overflow-hidden h-96 "/>
                                    <div className="space-x-3 flex">
                                        {/* <button className="w-6/12 font-semibold text-white bg-yellow-400 py-3">ADD TO CART</button> */}
                                      <Link to={{pathname: "/Address", state:{itemid:item.id,itemtype:item.type,itembrand:item.brand,orderqty:qty}}} onClick={()=>context.addtocart(item)} className="w-full font-semibold flex justify-center focus:outline-none text-white bg-primary py-3">ORDER NOW</Link>
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
                                                    <h1>{item.color.attributeValue}</h1>
                                                    <h1>{item.warranty}</h1>
                                                    <h1>{item.material.attributeValue}</h1>
                                                    <h1>{item.Brand}</h1>
                                                </div>
                                            </div>
                                           
                                           <div className='grid grid-cols-2 gap-5'>
                                                 {/* {
                                              colorArray && colorArray.length!=0 && 
                                                <div className='flex space-x-3'>
                                                    <h1 className='h-8 flex items-center'>COLOR :</h1>
                                                    <div className='flex space-x-2'>
                                                    {
                                                        colorArray.map((item,key)=>{
                                                            return(
                                                                <button className='border border-gray-500 px-2 uppercase h-8  rounded text-sm'>{item.color}</button>
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                    
                                                </div>
                                           }  */}
                                           {
                                              imageArray && imageArray.length!=0 && 
                                                <div className='flex space-x-3'>
                                                    <h1 className='h-8 flex items-center'>COLOR :</h1>
                                                    <div className='flex space-x-2'>
                                                    {
                                                        
                                                        imageArray.map((item1,key1)=>{
                                                            return(
                                                                props.singleitem.ram.attributeValue==item1.ram.attributeValue &&
                                                                <button  onClick={()=>setimagedisplay(item1)} className={` px-2 uppercase h-16 w-16  ${imagedisplay.image==item1.image ? "  border-2 border-red-500" : " border border-gray-500"}   rounded text-sm focus:outline-none`}>
                                                                    
                                                                <img src={`http://localhost:9000/images/${item1.image}`} alt="" className="object-contain  overflow-hidden  "/>

                                                                </button>
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                    
                                                </div>
                                           } 
                                     
                                           {
                                              ramArray && ramArray.length!=0 && 
                                                <div className='flex space-x-3'>
                                                    <h1 className='h-8 flex items-center'>RAM : </h1>
                                                    <div className='flex space-x-2'>
                                                   <button  className=" px-2 uppercase h-8   border-2 border-red-500   rounded text-sm focus:outline-none">{props.singleitem.ram.attributeValue} GB</button>

                                                    {
                                                    

                                                        ramArray.map((item1,key1)=>{
                                                            return(
                                                                props.singleitem.ram.attributeId!=item1.ram.attributeId &&  <button onClick={()=>props.singleitemset(item1)} className={` px-2 uppercase h-8  ${props.singleitem.ram.attributeValue==item1.ram.attributeValue ? "  border-2 border-red-500" : " border border-gray-500"}   rounded text-sm focus:outline-none`}>{item1.ram.attributeValue} GB</button>
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                </div>
                                           } 
                                           {
                                              storageArray && storageArray.length!=0 && 
                                                <div className='flex space-x-3' >
                                                    <h1 className='h-8 flex items-center'>STORAGE : </h1>
                                                    <button  className=" px-2 uppercase h-8   border-2 border-red-500   rounded text-sm focus:outline-none">{props.singleitem.storage.attributeValue} GB</button>

                                                    <div className='flex space-x-2'>
                                                    {
                                                        storageArray.map((item1,key1)=>{
                                                            return(
                                                                props.singleitem.storage.attributeId!=item1.storage.attributeId &&
                                                                props.singleitem.ram.attributeValue==item1.ram.attributeValue &&
                                                                <button onClick={()=>setstoragedisplay(item1)} className={` px-2 uppercase h-8  ${storagedisplay.storage.attributeValue==item1.storage.attributeValue ? "  border-2 border-red-500" : " border border-gray-500"}   rounded text-sm focus:outline-none`}>{props.singleitem.ram.attributeValue==item1.ram.attributeValue &&  item1.storage.attributeValue }GB </button>
                                                                )
                                                        })
                                                    }
                                                    </div>
                                                </div>
                                           } 
                                           </div>
                                           <div>

                                            </div>
                                            
                                            <div>
                                                <div className="flex mt-10">
                                                    <h1 className="text-xl">QTY :</h1>
                                                    <div className="flex space-x-1  ml-2">
                                                        <button  onClick={()=>qty>1 ? (setqty(qty-1),setqtystate("ok")):(setqty(1),setqtystate("ok"))}className="bg-gray-500 text-white rounded  focus:outline-none px-3 h-7 text-semibold text-2xl"><h1 className="flex items-center text-xl text-semibold">-</h1></button>
                                                        <input type="number" value={qty}className="w-10 border-2 text-center h-7 border-gray-100 rounded"/> 
                                                        <button onClick={()=>{qty+1<= +item.qty ? setqty(qty+1): setqtystate("notok")}}className="px-3 bg-green-500 rounded text-white focus:outline-none h-7 "><h1 className="flex items-center text-xl text-semibold">+</h1></button>

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
                    
                
        {props.relateditems!="" &&
        <div className="w-full flex justify-center">
            <div className="w-10/12">
                <ProductSlider
                Heading="Related Items"
                items={props.relateditems}
                />
            </div>
             
        </div>
       
        }

        </div>
    )
}
export default SingleItemMain