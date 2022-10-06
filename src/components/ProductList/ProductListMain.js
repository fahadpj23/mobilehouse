import SingleProduct from "../Home/singleProducts"
import Nav from "components/Home/Nav"
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from "react";
import RangeSlider from "./RangeSlider";
import PaginateTable from "components/admindashboard/pagination";
const ProductListMain=(props)=>{
    
      
    
     //take price from product array and sort it for rangslider max value find
      let Maximumprice=props.products.length!=0 && props.products[0]?.MaxsalesPrice>props.products[0]?.MaxsellingPrice ? props.products[0]?.MaxsalesPrice : props.products[0]?.MaxsellingPrice 
  
    // when click brand or price then filter head set to that value
   const [filterhead,setfilterhead]=useState("")
   
    console.log(props.BrandChoosed.includes("HZ"))

    

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
                                                   maxval={Maximumprice }
                                                   priceResult={props.priceResult}
                                                   minprice={props.minprice}
                                                   maxprice={props.maxprice}
                                                   setfilterhead={setfilterhead}
                                                   />
                                                  
                                               

                                        </div>
                                }
                        </div>
                        
                        <div className="relative">
                            <button onClick={()=>filterhead=="Brand" ? setfilterhead("") : setfilterhead("Brand")}className="  bg-gray-200 rounded-xl px-5 py-1 flex items-center space-x-4 focus:outline-none" ><h1>Brand</h1><IoIosArrowDown className="mt-1"/>
                        
                            </button>
                            {
                                filterhead=="Brand" && 
                                    <div className="absolute left-0 top-9 z-10  space-y-3 p-4 w-48  bg-gray-100 shadow-xl flex flex-col h-72 ">
                                            <div className="space-y-4">
                                                <div className="space-y-2 h-52 overflow-auto  w-44">
                                                {
                                                    props.productBrand && props.productBrand.map((item,key)=>{
                                                        return(
                                                            <div className="flex space-x-3">
                                                                <input checked={props.BrandChoosed && props.BrandChoosed.includes((item.Brand).replace(/\s/g, ""))}  type="checkbox" onChange={(e)=>e.target.checked ? props.BrandChoose(e.target.value) : props.BrandRemove(e.target.value) } id={item.Brand} name={item.Brand} value={item.Brand} className="text-xs focus:outline-none font-semibold tracking-wide hover:bg-blue-300 text-left py-2 rounded px-1"/>
                                                                <h1>{item.Brand}</h1>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                </div>
                                                <button onClick={()=>(props.BrandFilter(),setfilterhead(""))}  className='w-full focus:outline-none bg-blue-600 py-1 tracking-wider text-white text-sm rounded-2xl'>View Result</button>
                                            </div>

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
                

            
                {props.products.length!=0 ?<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10 p-2 md:p-5">
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
                      :
                      <div className="h-fixedNoNavlg7 w-full flex justify-center items-center ">
                                 <img src='./productNotFound.jpg' alt="no Product Found"/>
                      </div>
                      }
                    <PaginateTable
                      handlePageClick={props.handlePageClick}
                      pageSize={props.TotalProduct/30}
                      pageNo={props.PageNo}
                     />
                   
                </div>
               
           
        </div>
       
    )
}
export default ProductListMain