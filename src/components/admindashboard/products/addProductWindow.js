import axios from "axios"
import { useState } from "react"
const AddProductWindow=(props)=>{
   
    const product=props.operationitem
    const [productimage,setproductimage]=useState("")
   console.log(product)
    return(
        <form onSubmit={(e)=>props.handleSubmit(e)} method="post">
    
            <div className=" mt-5 w-full  grid grid-cols-2 gap-6">
              
                    
                    <div className=" text-sm">
                        <label>Name</label>
                        <input className="w-full border-2 border-gray-400 rounded-md py-1 px-1" name="Name" id="Name" defaultValue={product.name}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Purchase Price</h1>
                        <input  type="number" className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name="purchasePrice" id="purchasePrice" defaultValue={product.purchasePrice}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Selling Price</h1>
                        <input  type="number" className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name="sellingPrice" id="sellingPrice" defaultValue={product.sellingPrice}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Sales Price</h1>
                        <input  type="number" className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name="salesPrice" id="salesPrice" defaultValue={product.salesPrice}/>
                    </div>
              
               
               
                     <div className=" text-sm">
                        <h1>MRP</h1>
                        <input  className="w-full border-2 border-gray-400 rounded-md py-1 px-1" name="MRP" id="MRP" defaultValue={product.mrp}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Warranty</h1>
                        <input  type="text" className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name="Warranty" id="Warranty" defaultValue={product.warranty}/>
                    </div>
                    <div className=" text-sm">
                        <h1>GST</h1>
                        <input  type="number" className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name="GST" id="GST" defaultValue={product.GST}/>
                    </div>
             
               
                    <div className=" text-sm">
                        <h1>Image</h1>
                        <input onChange={(e)=>setproductimage(URL.createObjectURL(e.target.files[0]))}  type="file" className="w-full focus:outline-none border-2 border-gray-400 rounded-md h-8 px-1"  name="image" id="image" />
                    </div>
                    {productimage!=="" ?
                    <img src={productimage} alt="" className="object-contain h-48 overflow-hidden" />
                    :
                    product.image &&
                    <img src={`http://localhost:9000/images/${product.image}`} alt="" className="object-contain h-48 overflow-hidden "/>
                    }
                    <div className=" text-sm">
                        <h1>Brand</h1>
                        <input  className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name="Brand" id="Brand" defaultValue={product.Brand}/>
                    </div>
             
                    <div className=" text-sm">  
                        <h1>Max Qty</h1>
                        <input  className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name="qty" id="qty" defaultValue={product.qty}/>
                    </div>
                    
            
                {
                    props.categoryattribute && props.categoryattribute.map((item,key)=>{
                        return(
                            <div key={key} className=" text-sm">
                                <h1>{item.attributeName}</h1>
                                <select defaultValue={product[item.attributeName]}  type="select"  className="w-full border-2 border-gray-400 rounded-md py-1 px-1"  name={item.attributeName} id={item.attributeName}>
                                    <option>--select--</option> 
                                    {
                                        item.value.map((item1,key1)=>
                                            <option value={item1.id}>{item1.value}</option>

                                        )
                                    }
                                </select>
                            </div>
                        )
                    })
                }

            </div>
            <div className="flex justify-end  space-x-3 w-full mt-8 ">
                    <button className="bg-red-500 text-white py-1 font-semibold rounded-md  focus:outline-none px-1 w-3/12">RESET</button>
                    <button   type="submit"  value="submit" className="bg-blue-500 text-white py-1 focus:outline-none font-semibold rounded-md  px-1 w-3/12">Save</button>
            </div>
            
        </form>
    )

    
}
export default AddProductWindow