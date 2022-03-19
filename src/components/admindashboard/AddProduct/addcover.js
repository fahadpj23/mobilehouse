import axios from "axios"
import { useState } from "react"
const AddCover=(props)=>{
   
   
   
   
    return(
        <form onSubmit={(e)=>props.handleSubmit(e)} method="post">
    
            <div className=" mt-5 w-6/12 grid grid-cols-2 gap-6">
              
                    
                    <div className=" text-sm">
                        <label>Name</label>
                        <input className="w-full border-2 border-gray-400 rounded-md py-1 px-1" name="Name" id="Name"/>
                    </div>
                    <div className=" text-sm">
                        <h1>Price</h1>
                        <input  type="number" className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name="Price" id="Price"/>
                    </div>
              
               
               
                     <div className=" text-sm">
                        <h1>MRP</h1>
                        <input  className="w-full border-2 border-gray-400 rounded-md py-1 px-1" name="MRP" id="MRP"/>
                    </div>
                    <div className=" text-sm">
                        <h1>Warranty</h1>
                        <input  type="text" className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name="Warranty" id="Warranty"/>
                    </div>
             
               
                    <div className=" text-sm">
                        <h1>Image</h1>
                        <input  type="file" className="w-full focus:outline-none border-2 border-gray-400 rounded-md h-8 px-1"  name="image" id="image" />
                    </div>
                    <div className=" text-sm">
                        <h1>Brand</h1>
                        <input  className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name="Brand" id="Brand"/>
                    </div>
             
                    <div className=" text-sm">  
                        <h1>Max Qty</h1>
                        <input  className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name="qty" id="qty"/>
                    </div>
                    
            
                {
                    props.categoryattribute && props.categoryattribute.map((item,key)=>{
                        return(
                            <div key={key} className=" text-sm">
                                <h1>{item. attributeName}</h1>
                                <input type="text"  className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name={item.attributeName} id={item.attributeName}/>
                            </div>
                        )
                    })
                }

            </div>
            <div className="flex justify-end  space-x-3 w-6/12 mt-8 ">
                    <button className="bg-red-500 text-white py-1 font-semibold rounded-md  px-1 w-3/12">RESET</button>
                    <button   type="submit"  value="submit" className="bg-blue-500 text-white py-1 font-semibold rounded-md  px-1 w-3/12">Save</button>
            </div>
            
        </form>
    )

    
}
export default AddCover