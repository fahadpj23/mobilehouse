import axios from "axios"
import { useState ,useEffect ,useRef} from "react"
import MobileHouseApi from "helpers/axiosinstance"
import { mobilehouseApi } from "axiosinstance"
import Paths from 'helpers/path'
const AddProductWindow=(props)=>{
    const imageref=useRef("")
    const product=props.operationitem
    
 
    const [imageset,setimageset]=useState(false)
    const [imageIndex,setimageIndex]=useState("")
    const [HSN,setHSN]=useState("")
   console.log(props.productImage)

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
        <form className="w-8/12 overflow-auto" onSubmit={(e)=>props.handleSubmit(e)} method="post">
    
            <div className=" mt-5   grid grid-cols-1 md:grid-cols-2 gap-6">
              
                    
                    <div className=" text-sm">
                        <label>Name</label>
                        <input className="w-full border-2 border-gray-400  rounded-md py-1 px-1" required name="Name" id="Name" defaultValue={product.name}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Purchase Price</h1>
                        <input  type="number" className="w-full border-2 border-gray-400  rounded-md py-1 px-1" required  name="purchasePrice" id="purchasePrice" defaultValue={product.purchasePrice}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Selling Price</h1>
                        <input  type="number" className="w-full border-2 border-gray-400  rounded-md py-1 px-1" required  name="sellingPrice" id="sellingPrice" defaultValue={product.sellingPrice}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Sales Price</h1>
                        <input  type="number" className="w-full border-2 border-gray-400  rounded-md py-1 px-1"  name="salesPrice" id="salesPrice" defaultValue={product.salesPrice}/>
                    </div>
              
               
               
                     <div className=" text-sm">
                        <h1>MRP</h1>
                        <input  className="w-full border-2 border-gray-400  rounded-md py-1 px-1" name="MRP" id="MRP" required defaultValue={product.mrp}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Warranty</h1>
                        <input  type="text" className="w-full border-2 border-gray-400  rounded-md py-1 px-1" required  name="Warranty" id="Warranty" defaultValue={product.warranty}/>
                    </div>

                    { HSN && <div className=" text-sm">
                        <h1>HSN</h1>
                        {console.log(product.HSN_Code)}
                        {/* <input  type="number" className="w-full border-2 border-gray-400  rounded-md py-1 px-1"  name="GST" id="GST" defaultValue={product.GST}/> */}
                        <select defaultValue={product.HSN_Code} type="text"  id="HSN_Code" name="HSN_Code" required className="w-full border-2 border-gray-400  rounded-md py-1 px-1" >

                        <option value="">--select--</option>
                            { HSN.Data.map((item, key) =>
                            <option className="truncate" key={key} value={item.HSN_Code}>{item.HSN_Code}-{item.Product}</option>
                            )}
                        </select>
                      
                    </div>}
                    <div className=" text-sm">
                        <h1>Tax</h1>
                        <select defaultValue={product.Tax} className="w-full border-2 border-gray-400   rounded-md py-1 px-1" required id="Tax" name="Tax">
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
                        <input  className="w-full border-2 border-gray-400  rounded-md py-1 px-1" required name="Brand" id="Brand" defaultValue={product.Brand}/>
                    </div>
             
                    <div className=" text-sm">  
                        <h1> Qty</h1>
                        <input  className="w-full border-2 border-gray-400  rounded-md py-1 px-1" required  name="qty" id="qty" defaultValue={product.qty}/>
                    </div>
                    
            
                {
                    props.categoryattribute && props.categoryattribute.map((item,key)=>{
                        return(
                            <div key={key} className=" text-sm">
                                <h1>{item.attributeName}</h1>
                                <select defaultValue={product[item.attributeid]}  type="select" required  className="w-full border-2 border-gray-400  rounded-md py-1 px-1"  name={item.attributeid} id={item.attributeid}>
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
                        <div className="grid  grid-cols-2 md:grid-cols-5 gap-2">
                            <input onChange={(e)=>{uploadimage(e) }} ref={imageref} accept=".png,.jpg,.jpeg"  type="file" className="w-full hidden  border-2 border-gray-400 rounded-md h-8 px-1"  name="image" id="image" />

                            <button type="button" onClick={()=>uploadimageButtonclick(1)} className="  p-2 rounded border border-gray-400 flex flex-col items-center justify-center">
                                <img src={  props.productImageblob[0] ? props.productImageblob[0] : props.productImage[0] ? `${Paths.ImagePath}/${props.productImage[0]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                <h1>image </h1>
                            </button>
                            <button type="button" onClick={()=>uploadimageButtonclick(2)} className="  p-2 rounded border border-gray-400 flex flex-col items-center justify-center">
                            <img src={  props.productImageblob[1] ? props.productImageblob[1] : props.productImage[1] ? `${Paths.ImagePath}/${props.productImage[1]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                <h1>image </h1>
                            </button>
                            <button  type="button" onClick={()=>uploadimageButtonclick(3)} className="  p-2 rounded border border-gray-400 flex flex-col items-center justify-center">
                            <img src={  props.productImageblob[2] ? props.productImageblob[2] : props.productImage[2] ? `${Paths.ImagePath}/${props.productImage[2]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                <h1>image </h1>
                            </button>
                            <button type="button" onClick={()=>uploadimageButtonclick(4)} className="  p-2 rounded border border-gray-400 flex flex-col items-center justify-center">
                            <img src={  props.productImageblob[3] ? props.productImageblob[3] : props.productImage[3] ? `${Paths.ImagePath}/${props.productImage[3]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                <h1>image </h1>
                            </button>
                            <button type="button" onClick={()=>uploadimageButtonclick(5)} className="  p-2 rounded border border-gray-400 flex flex-col items-center justify-center">
                            <img src={  props.productImageblob[4] ? props.productImageblob[4] : props.productImage[4] ? `${Paths.ImagePath}/${props.productImage[4]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                <h1>image </h1>
                            </button>
                            
                        </div>
                       
                    </div>
                    {/* {productimageblob!=="" ?
                    <img src={productimageblob} alt="" className="object-contain h-48 overflow-hidden" />
                    :
                    product.image &&
                    <img src={`${Paths.ImagePath}/${product.image}`} alt="" className="object-contain h-48 overflow-hidden "/>
                    } */}
            <div className="flex justify-end  space-x-3 w-full mt-8 ">
                    <button className="bg-red-500 text-white py-1 font-semibold rounded-md   px-1 w-8/12 md:w-3/12">RESET</button>
                    <button   type="submit"  value="submit" className="bg-blue-500 text-white py-1  font-semibold rounded-md  px-1 w-8/12 md:w-3/12">Save</button>
            </div>
            
        </form>
    )

    
}
export default AddProductWindow