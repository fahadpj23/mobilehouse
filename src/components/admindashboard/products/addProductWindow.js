import axios from "axios"
import { useState ,useEffect ,useRef} from "react"
import MobileHouseApi from "helpers/axiosinstance"
import { mobilehouseApi } from "axiosinstance"
const AddProductWindow=(props)=>{
    const imageref=useRef("")
    const product=props.operationitem
    
 
    const [imageset,setimageset]=useState(false)
    const [imageIndex,setimageIndex]=useState("")
    const [HSN,setHSN]=useState("")
   console.log(product)

   const uploadimageButtonclick=(btindex)=>{
       setimageset(true)
      setimageIndex(btindex)
     imageref.current.click();
   }


   const uploadimage=(imagedetails)=>{
    setimageset(false)
    props.productImageblob[imageIndex-1]=URL.createObjectURL(imagedetails.target.files[0])
    props.productImage[imageIndex-1]=imagedetails.target.files[0]
    console.log(imagedetails.target.files[0])
  
   }
   useEffect(()=>{
    MobileHouseApi.get('getHSN')
    .then((res)=>{
        setHSN(res.data)
    })
   },[imageset])
  
    return(
        <form onSubmit={(e)=>props.handleSubmit(e)} method="post">
    
            <div className=" mt-5 w-full  grid grid-cols-2 gap-6">
              
                    
                    <div className=" text-sm">
                        <label>Name</label>
                        <input className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1" name="Name" id="Name" defaultValue={product.name}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Purchase Price</h1>
                        <input  type="number" className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1"  name="purchasePrice" id="purchasePrice" defaultValue={product.purchasePrice}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Selling Price</h1>
                        <input  type="number" className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1"  name="sellingPrice" id="sellingPrice" defaultValue={product.sellingPrice}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Sales Price</h1>
                        <input  type="number" className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1"  name="salesPrice" id="salesPrice" defaultValue={product.salesPrice}/>
                    </div>
              
               
               
                     <div className=" text-sm">
                        <h1>MRP</h1>
                        <input  className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1" name="MRP" id="MRP" defaultValue={product.mrp}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Warranty</h1>
                        <input  type="text" className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1"  name="Warranty" id="Warranty" defaultValue={product.warranty}/>
                    </div>

                    <div className=" text-sm">
                        <h1>HSN</h1>
                        {/* <input  type="number" className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1"  name="GST" id="GST" defaultValue={product.GST}/> */}
                        <input defaultValue={product.HSN} type="text" list="data" id="HSN" name="HSN" className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1" />

                        <datalist id="data">
                            {HSN && HSN.Data.map((item, key) =>
                            <option key={key} value={item.HSN_code} />
                            )}
                        </datalist>
                      
                    </div>
                    <div className=" text-sm">
                        <h1>Tax</h1>
                        <select defaultValue={product.Tax} className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1" id="Tax" name="Tax">
                            <option value="">--select--</option>
                            <option value="0">GST_0</option>
                            <option value="3">GST_3</option>
                            <option value="5">GST_5</option>
                            <option value="12">GST_12</option>
                            <option value="18">GST_18</option>
                            <option value="28">GST_28</option>
                        </select>
                    </div>
                    
             
               
                  
                    <div className=" text-sm">
                        <h1>Brand</h1>
                        <input  className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1"  name="Brand" id="Brand" defaultValue={product.Brand}/>
                    </div>
             
                    <div className=" text-sm">  
                        <h1>Max Qty</h1>
                        <input  className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1"  name="qty" id="qty" defaultValue={product.qty}/>
                    </div>
                    
            
                {
                    props.categoryattribute && props.categoryattribute.map((item,key)=>{
                        return(
                            <div key={key} className=" text-sm">
                                <h1>{item.attributeName}</h1>
                                <select defaultValue={product[item.attributeName]}  type="select"  className="w-full border-2 border-gray-400 focus:outline-none rounded-md py-1 px-1"  name={item.attributeName} id={item.attributeName}>
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
            <div className=" text-sm mt-4">
                        {/* <h1>Image</h1> */}
                        <div className="flex space-x-2">
                            <input onChange={(e)=>{uploadimage(e) }} ref={imageref}  type="file" className="w-full hidden focus:outline-none border-2 border-gray-400 rounded-md h-8 px-1"  name="image" id="image" />

                            <button type="button" onClick={()=>uploadimageButtonclick(1)} className="  p-2 rounded border border-gray-400">
                                <img src={props.productImageblob[0] ? props.productImageblob[0] :  "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                <h1>image </h1>
                            </button>
                            <button type="button" onClick={()=>uploadimageButtonclick(2)} className="  p-2 rounded border border-gray-400">
                                <img src={props.productImageblob[1] ? props.productImageblob[1] :  "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                <h1>image </h1>
                            </button>
                            <button  type="button" onClick={()=>uploadimageButtonclick(3)} className="  p-2 rounded border border-gray-400">
                                <img src={props.productImageblob[2] ? props.productImageblob[2] :  "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                <h1>image </h1>
                            </button>
                            <button type="button" onClick={()=>uploadimageButtonclick(4)} className="  p-2 rounded border border-gray-400">
                                <img src={props.productImageblob[3] ? props.productImageblob[3] :  "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                <h1>image </h1>
                            </button>
                            <button type="button" onClick={()=>uploadimageButtonclick(5)} className="  p-2 rounded border border-gray-400">
                                <img src={props.productImageblob[4] ? props.productImageblob[4] :  "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                <h1>image </h1>
                            </button>
                            
                        </div>
                       
                    </div>
                    {/* {productimageblob!=="" ?
                    <img src={productimageblob} alt="" className="object-contain h-48 overflow-hidden" />
                    :
                    product.image &&
                    <img src={`http://localhost:9000/images/${product.image}`} alt="" className="object-contain h-48 overflow-hidden "/>
                    } */}
            <div className="flex justify-end  space-x-3 w-full mt-8 ">
                    <button className="bg-red-500 text-white py-1 font-semibold rounded-md  focus:outline-none px-1 w-3/12">RESET</button>
                    <button   type="submit"  value="submit" className="bg-blue-500 text-white py-1 focus:outline-none font-semibold rounded-md  px-1 w-3/12">Save</button>
            </div>
            
        </form>
    )

    
}
export default AddProductWindow