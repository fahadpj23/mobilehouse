

import {Link} from "react-router-dom";
import axios from 'axios'
import { Usercontext } from '../context/userContext';
import {useContext} from 'react'
import React, { useState } from 'react';
import ProductSlider from '../Home/productSlick'
import { MobileHouseApi } from "helpers/axiosinstance";
import Login from "components/Home/login";

const SingleItemMain=(props)=>{
 
    const [qty, setqty] = useState(1)
    const [qtystate, setqtystate] = useState("ok")
    const [pincode, setpincode] = useState("")
    const [pincodeavailability, setpincodeavailability] = useState("")
    const [displayimage, setdisplayimage] = useState("")

    const [ramdisplay, setramdisplay] = useState(props.singleitem)
    const [storagedisplay, setstoragedisplay] = useState(props.singleitem)
    let variantArray=[];
    // let colorArray=[];
    // let ramArray=[];
    // let storageArray=[];
    // let imageArray=[];
    // props.categoryVariant && props.categoryVariant.map((item5,key1)=>{
    //     let item5;
    // })
    let item=props.singleitem
    // product image store in images .image string split using ;
    let images=[];
    // images array value white space remove
    let productImage=[];
    if(item.image)
     {
        images=item.image.split(';')
     }
     images && images.map((item,key)=>{
        item && productImage.push(item.replace(/^\s+|\s+$/gm,''))
    })
    // props.variants && props.variants.map((item1,key1)=>{
    //      if(item1.attributes.some((productattribute)=>productattribute.attributeName=="ram")==true)
    //      {
             
    //         // item1.attributes.map((item2,key2)=>{
    //         //    ramArray.push(item1)
    //         // })
    //      }
    // }  
    // )


    const context=useContext(Usercontext)
    
    console.log(localStorage.getItem('UserToken'))

    const AddCart=(item)=>{

        context.addtocart(item,1,productImage[0])
    }
    const checkpincode=()=>{
        axios.get(`http://localhost:9000/pincodecheck`,{params: { pincodeno: pincode}})
        
        .then(res=>{
       
          if(res.data.availability!="available")
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
        <div className="">
                {
                    context.loginstatus==true && 
                        <Login/>
                }
          
                        <div className="w-full flex justify-center">
                            <div className="w-11/12 md:flex  mt-5 ">
                                <div className="w-full md:w-5/12  flex-col space-y-4 ">
                                    <div className='flex justify-center items-center'>
                                        <img src={displayimage ? `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${displayimage}` :`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${productImage[0]}`} alt="" className="object-contain  overflow-hidden h-44 md:h-96 "/>
                                    </div>
                                    <div className='flex space-x-2 w-full justify-center'>
                                    {
                                        productImage && productImage.map((item1,key)=>
                                        <button key={key} onClick={()=>setdisplayimage(productImage[key])}>
                                            <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${productImage[key]}`} alt="" className="object-contain border p-2 border-gray-300 rounded overflow-hidden h-16 md:h-24 w-16 md:w-24 "/>
                                        </button>
                                        )
                                    }
                                    </div>
                                    <div className="space-x-3 flex">
                                    {
                                            
                                            context.cart.find(item1 => item1.id === item.id)==undefined ?
                                                <button onClick={()=>localStorage.getItem('UserName') ?  context.userCart(item)  : AddCart(item) } className=" w-full rounded font-semibold text-white md:text-base text-sm bg-yellow-400 py-2 md:py-3">Add to Cart+</button>
                                            :
                                                <button  className="  w-full rounded font-semibold text-white md:text-base text-sm bg-yellow-400 py-2 md:py-3">GO TO CART</button>
    
                                        } 
                                        {/* <button onClick={()=>context.addtocart(item)} className="w-full rounded font-semibold text-white md:text-base text-sm bg-yellow-400 py-2 md:py-3">ADD TO CART</button> */}
                                        {item.maxqty>0 &&

                                            localStorage.getItem('UserToken') ?

                                            <Link     to={{pathname: "/Address",   search: "?" + new URLSearchParams({CheckoutType:"Single",productId:item.id}) }} className="w-full md:text-base text-sm rounded font-semibold flex justify-center focus:outline-none text-white bg-primary py-2 md:py-3 ">ORDER NOW</Link>
                                            :
                                            <button onClick={()=>context.setloginstatus(true)} className="w-full md:text-base text-sm rounded font-semibold flex justify-center focus:outline-none text-white bg-primary py-2 md:py-3">ORDER NOW</button>
                                            
                                        }
                                        {/* <a className='bg-green-600 w-full flex items-center justify-center space-x-1 rounded py-3' href={`https://wa.me/+919745286899?text=${document.location.href}`} target="_blank"><h1><AiOutlineWhatsApp className='text-white text-2xl'/></h1><h1 className="text-white ">Whatsapp Now</h1></a> */}
                                    </div>
                                    
                                    

                                </div>
                                <div className="ml-0 md:ml-5 w-full md:w-7/12 flex flex-col  ">
                                    <div className="w-full lg:w-10/12">
                                        <div className="mt-10 space-y-1">
                                            <h1 className="text-base md:text-xl font-semibold tracking-normal md:tracking-wider ">{item.name} </h1>
                                            <h1 className='space-x-2'><span className="text-lg md:text-2xl font-bold text-green-600  ">₹{  item.salesPrice!=0 ? item.salesPrice :  item.sellingPrice}.00</span><span className="line-through ml-3 text-sm md:text-lg font-semibold text-gray-500">₹{item.mrp}.00</span><span className=' font-bold text-red-500'> { Math.floor(((((+item.mrp)-(item.salesPrice!=0 ? +item.salesPrice :  +item.sellingPrice))/ +item.mrp)*100).toFixed(2))}% Off</span></h1>
                                            <h1 className='text-red-500 font-semibold'>{item.maxqty<1 && "Out of Stock"}</h1>
                                            {/* <h1 className="flex items-center bg-green-500 w-8/12 py-2  text-white rounded px-2"><span ><ImTruck className=""/></span><span className="font-semibold ml-1 "> Free Shipping </span><span className="text-sm ml-1">  & Inclusive of all taxes</span></h1> */}
                                           
                                           
                                           <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-3'>
                                              
                                              
                                             
                                            
                                            
                                                {
                                                   props.variants && props.variants.map((item1,key1)=>{
                                                            return(
                                                                <button onClick={()=>props.singleitemset(item1)} className={`border p-2  ${item1.id==props.singleitem.id ? "border-red-300" : "border-gray-300"} focus:outline-none  flex flex-col items-center justify-center rounded`}>
                                                                    <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item1.image}`} alt="" className="object-contain  rounded overflow-hidden h-14 md:h-16 w-14 md:w-16 "/>
                                                                    <div className=' text-sm'>
                                                                    {item1.attributes?.map((item2,key2)=>{
                                                                        return(
                                                                            <h1 className='flex text-xs sm:text-sm' ><span>{item2.attributeName} : {item2.attributeValue}  </span><span className={`${key2+1== item1.attributes.length ? "hidden" : "block"}`}>,</span></h1>
                                                                            // item2.attributeName!="color" && <h1 className='flex' ><span>{item2.attributeValue} {item2.attributeName}</span><span className={`${key2+1== item1.attributes.length ? "hidden" : "block"}`}>,</span></h1>
                                                                        )
                                                                    })}
                                                                    </div>
                                                                </button>
                                                            )
                                                    })
                                                }
                                              
                                           </div>
                                           <div className=' w-full  space-y-4 pt-5'>
                                           <div className='md:flex space-x-4'>
                                                <h1 className='font-semibold text-gray-700 text-lg w-4/12 md:w-3/12'>Specification </h1>
                                                <div className='mt-1 text-sm'>
                                                {
                                                    item && item.attributes.map((item1,key1)=>{
                                                        return(
                                                            <li key={key1} className='flex space-x-2'>
                                                                <li>{item1.attributeName}</li>
                                                                <h1>:</h1>
                                                                <h1>{item1.attributeValue}</h1>
                                                            </li>
                                                        )
                                                    })
                                                }
                                                </div>
                                          </div>
                                          <div className='md:flex space-x-4 pb-5 text-sm'>
                                                <h1 className='font-semibold text-gray-700 text-lg w-4/12 md:w-3/12 '>Services </h1>
                                                
                                                                <li className='mt-1'>{item.warranty} Warranty</li>
                                                                
                                                           
                                               
                                          </div>
                                          <div className='md:flex space-x-4 pb-5 text-sm'>
                                                <h1 className='font-semibold text-gray-700 text-lg w-4/12 md:w-3/12 '> Description </h1>
                                                
                                                                <li className='mt-1'>{item. Description} </li>
                                                                
                                                           
                                               
                                          </div>
                                         
                                          </div>
                                            
                                            {/* <div>
                                                <div className="flex mt-10">
                                                    <h1 className="text-xl">QTY :</h1>
                                                    <div className="flex space-x-1  ml-2">
                                                        <button  onClick={()=>qty>1 ? (setqty(qty-1),setqtystate("ok")):(setqty(1),setqtystate("ok"))}className="bg-gray-500 text-white rounded  focus:outline-none px-3 h-7 text-semibold text-2xl"><h1 className="flex items-center text-xl text-semibold">-</h1></button>
                                                        <input type="number" value={qty}className="w-10 border-2 text-center h-7 border-gray-100 rounded"/> 
                                                        <button onClick={()=>{qty+1<= +item.qty ? setqty(qty+1): setqtystate("notok")}}className="px-3 bg-green-500 rounded text-white focus:outline-none h-7 "><h1 className="flex items-center text-xl text-semibold">+</h1></button>

                                                    </div>
                                                    
                                                </div> 
                                                <h1 className={`${qtystate==="notok" ? "block mt-3 text-red-500 font-semibold" :"hidden"}`}>only {item.qty} item available </h1>  
                                            </div> */}
                                            {/* <div >
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
                                            </div> */}
                                            
                                           
                                        </div> 
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    
                
         {props.relateditems!=="" &&
        <div className="w-full flex justify-center  mt-0 md:mt-8 py-6 md:py-10 ">
            <div className="w-11/12">
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