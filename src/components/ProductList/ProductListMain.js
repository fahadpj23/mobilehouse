import SingleProduct from "../Home/singleProducts"
import Nav from "components/Home/Nav"
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from "react";
import RangeSlider from "./RangeSlider";

const ProductListMain=(props)=>{
    
    //here retrieve all brand from product array and filter array
     let Brand=[...new Set(props.products.map(a =>  a.Brand))]

     //take price from product array and sort it for rangslider max value find
     let price=props.products[0].MaxsalesPrice>props.products[0].MaxsellingPrice ? props.products[0].MaxsalesPrice : props.products[0].MaxsellingPrice
  
    // when click brand or price then filter head set to that value
   const [filterhead,setfilterhead]=useState("")
    console.log(props.products[0].MaxsalesPrice)
    console.log(props.products[0].MaxsellingPrice)

    return(
        <div className="">
           
            <div className="p-2 md:p-5">
                <div  className="flex justify-between w-full">
                    <div className="w-8/12 flex space-x-2 ml-5  ">
                    
                        <div className="relative">

                                <button onClick={()=>filterhead=="price" ? setfilterhead("") : setfilterhead("price")} className=" bg-gray-200 rounded-xl px-5 py-1 flex items-center space-x-4 focus:outline-none relative" ><h1>Price</h1><IoIosArrowDown className="mt-1"/>
                       
                                </button>
                                {
                                    filterhead=="price" && 
                                        <div className="absolute left-0 top-10  shadow-xl rounded z-20  bg-gray-100  w-80 p-2 flex flex-col justify-center space-y-4 items-center">
                                               
                                                   <RangeSlider
                                                   maxval={price }
                                                   priceResult={props.priceResult}
                                                   />
                                                  
                                               

                                        </div>
                                }
                        </div>
                        
                        <div className="relative">
                            <button onClick={()=>filterhead=="Brand" ? setfilterhead("") : setfilterhead("Brand")}className="  bg-gray-200 rounded-xl px-5 py-1 flex items-center space-x-4 focus:outline-none" ><h1>Brand</h1><IoIosArrowDown className="mt-1"/>
                        
                            </button>
                            {
                                filterhead=="Brand" && 
                                    <div className="absolute left-0 top-10 z-20 bg-white">
                                            {
                                                Brand && Brand.map((item,key)=>{
                                                    return(
                                                        <h1>{item}</h1>
                                                    )
                                                })
                                            }
                                    </div>
                            }
                        </div>
                       
                        
                    </div>
                    <div>
                    <select defaultValue={props.sort} onChange={(e)=>props.SortSelect(e.target.value)} className="border  border-gray-400 rounded-lg px-2 text-sm font-semibold py-1 focus:outline-none  ">
                        <option value="newestfirst">Newest First</option>
                        <option value="Price-Low-to-High">Price-Low to High</option>
                        <option value="Price-High-to-Low">Price-High to Low</option>
                    </select>
                </div>
                </div>
                

            
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2 md:p-5">
                        {
                            props.products.map((item,key)=>{
                                return(
                                    <SingleProduct
                                    item={item}

                                    />
                                )
                                
                            })
                        }
                    </div>
                </div>
           
        </div>
       
    )
}
export default ProductListMain