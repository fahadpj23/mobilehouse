import axios from "axios"
import { useState ,useEffect ,useRef} from "react"

import { AiFillDelete } from 'react-icons/ai';
import {MobileHouseApi} from "helpers/axiosinstance";

const AddProductWindow=(props)=>{
    const imageref=useRef("")
    const product=props.operationitem
    
 
    const [imageset,setimageset]=useState(false)
    const [imageIndex,setimageIndex]=useState("")
    const [HSN,setHSN]=useState("")
    const [imagedelete,setimagedelete]=useState(false)
   console.log(props.productImage)

   //button click refers to the input tag name imagrref so we can select image from folder of device
   const uploadimageButtonclick=(btindex)=>{
       setimageset(true)
      setimageIndex(btindex)
     imageref.current.click();
   }


   // after select image product details set to productimageblob and product image
   const uploadimage=(imagedetails)=>{
    setimageset(false)
    props.productImageblob[imageIndex-1]=URL.createObjectURL(imagedetails.target.files[0])
    props.productImage[imageIndex-1]=imagedetails.target.files[0]
    console.log(imagedetails.target.files[0])
  
   }

   //delete slelected image
   const deleteImage=(index)=>{
    props.productImageblob[index]=""
    props.productImage[index]="deleted"
    setimagedelete(true)
   }

   useEffect(()=>{
    //to get HSN
    MobileHouseApi.get('getHSN')
    .then((res)=>{
        setHSN(res.data)
    })

    if(imagedelete==true)
    {
        setimagedelete(false)
    }
   },[imageset,imagedelete])
  
    return(
        <form className="w-8/12 overflow-auto" onSubmit={(e)=>props.handleSubmit(e)} method="post">
    
            <div className=" mt-5   grid grid-cols-1 md:grid-cols-2 gap-6">
              
                    
                    <div className=" text-sm">
                        <label>Name</label>
                        <input className="w-full border border-gray-400  rounded-md py-1 px-1" required name="Name" id="Name" defaultValue={product.name}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Purchase Price</h1>
                        <input  type="number" className="w-full border border-gray-400  rounded-md py-1 px-1" required  name="purchasePrice" id="purchasePrice" defaultValue={product.purchasePrice}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Selling Price</h1>
                        <input  type="number" className="w-full border border-gray-400  rounded-md py-1 px-1" required  name="sellingPrice" id="sellingPrice" defaultValue={product.sellingPrice}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Sales Price</h1>
                        <input  type="number" className="w-full border border-gray-400  rounded-md py-1 px-1"  name="salesPrice" id="salesPrice" defaultValue={product.salesPrice}/>
                    </div>
              
               
               
                     <div className=" text-sm">
                        <h1>MRP</h1>
                        <input  className="w-full border border-gray-400  rounded-md py-1 px-1" name="MRP" id="MRP" required defaultValue={product.mrp}/>
                    </div>
                    <div className=" text-sm">
                        <h1>Warranty</h1>
                        <input  type="text" className="w-full border border-gray-400  rounded-md py-1 px-1" required  name="Warranty" id="Warranty" defaultValue={product.warranty}/>
                    </div>

                    { HSN && <div className=" text-sm">
                        <h1>HSN</h1>
                        {console.log(product.HSN_Code)}
                        {/* <input  type="number" className="w-full border border-gray-400  rounded-md py-1 px-1"  name="GST" id="GST" defaultValue={product.GST}/> */}
                        <select defaultValue={product.HSN_Code} type="text"  id="HSN_Code" name="HSN_Code" required className="w-full border border-gray-400  rounded-md py-1 px-1" >

                        <option value="">--select--</option>
                            { HSN.Data.map((item, key) =>
                            <option className="truncate" key={key} value={item.HSN_Code}>{item.HSN_Code}-{item.Product}</option>
                            )}
                        </select>
                      
                    </div>}
                    <div className=" text-sm">
                        <h1>Tax</h1>
                        <select defaultValue={product.Tax} className="w-full border border-gray-400   rounded-md py-1 px-1" required id="Tax" name="Tax">
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
                        <input  className="w-full border border-gray-400  rounded-md py-1 px-1" required name="Brand" id="Brand" defaultValue={product.Brand}/>
                    </div>
             
                    <div className=" text-sm">  
                        <h1> Qty</h1>
                        <input  className="w-full border border-gray-400  rounded-md py-1 px-1" required  name="qty" id="qty" defaultValue={product.qty}/>
                    </div>
                    
            
                {
                    props.categoryattribute && props.categoryattribute!="NoAttribute" && props.categoryattribute.map((item,key)=>{
                        return(
                            <div key={key} className=" text-sm">
                                <h1>{item.attributeName}</h1>
                                <select defaultValue={product[item.attributeid]}  type="select" required  className="w-full border border-gray-400  rounded-md py-1 px-1"  name={item.attributeid} id={item.attributeid}>
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
            <div className="mt-3 space-y-1">
                <h1>Description</h1>
               
                <textarea rows="4" cols="50" name="Description" id="Description" required defaultValue={product.Description} className=" w-full border border-gray-400 rounded">
                </textarea>
            </div>
            <div className=" text-sm mt-4">
                        {/* <h1>Image</h1> */}
                        <div className="grid  grid-cols-2 sm:grid-cols-3 lg::grid-cols-5 gap-2">
                            <input onChange={(e)=>{uploadimage(e) }} ref={imageref} accept=".png,.jpg,.jpeg"  type="file" className="w-full hidden  border border-gray-400 rounded-md h-8 px-1"  name="image" id="image" />
                            <div className="rounded border border-gray-400">
                                <button type="button" onClick={()=>deleteImage(0)} className=" focus:outline-none hover:text-red-500 w-full  flex justify-end mt-1 mr-2 z-20"><AiFillDelete/></button>
                                <button type="button" onClick={()=>uploadimageButtonclick(1)} className="  pt-4 px-2  focus:outline-none w-full pb-2  flex flex-col items-center justify-center ">
                                    <img src={  props.productImageblob[0] ? props.productImageblob[0] : (props.productImage[0] && props.productImage[0]!="deleted" ) ? `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.productImage[0]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                    {/* <h1>image </h1> */}
                                </button>
                            </div>

                            <div className="rounded border border-gray-400">
                                <button type="button" onClick={()=>deleteImage(1)} className=" focus:outline-none hover:text-red-500 w-full  flex justify-end mt-1 mr-2 z-20"><AiFillDelete/></button>
                                <button type="button" onClick={()=>uploadimageButtonclick(2)} className="  pt-4 px-2  focus:outline-none w-full pb-2  flex flex-col items-center justify-center ">
                                    <img src={  props.productImageblob[1] ? props.productImageblob[1] : (props.productImage[1] && props.productImage[1]!="deleted" ) ? `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.productImage[1]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                    {/* <h1>image </h1> */}
                                </button>
                            </div>

                            <div className="rounded border border-gray-400">
                                <button type="button" onClick={()=>deleteImage(2)} className=" focus:outline-none hover:text-red-500 w-full  flex justify-end mt-1 mr-2 z-20"><AiFillDelete/></button>
                                <button  type="button" onClick={()=>uploadimageButtonclick(3)} className="  pt-4 px-2  focus:outline-none w-full pb-2  flex flex-col items-center justify-center ">
                                    <img src={  props.productImageblob[2] ? props.productImageblob[2] : (props.productImage[2] && props.productImage[2]!="deleted" ) ? `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.productImage[2]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                    {/* <h1>image </h1> */}
                                </button>
                            </div>

                            <div className="rounded border border-gray-400">
                                <button type="button" onClick={()=>deleteImage(3)} className=" focus:outline-none hover:text-red-500 w-full  flex justify-end mt-1 mr-2 z-20"><AiFillDelete/></button>
                                <button type="button" onClick={()=>uploadimageButtonclick(4)} className="  pt-4 px-2  focus:outline-none w-full pb-2  flex flex-col items-center justify-center ">
                                    <img src={  props.productImageblob[3] ? props.productImageblob[3] :(props.productImage[3] && props.productImage[3]!="deleted" ) ? `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.productImage[3]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                    {/* <h1>image </h1> */}
                                </button>
                            </div>

                            <div className="rounded border border-gray-400">
                                <button type="button" onClick={()=>deleteImage(4)} className=" focus:outline-none hover:text-red-500 w-full  flex justify-end mt-1 mr-2 z-20"><AiFillDelete/></button>
                                <button type="button" onClick={()=>uploadimageButtonclick(5)} className="  pt-4 px-2  focus:outline-none w-full pb-2  flex flex-col items-center justify-center ">
                                    <img src={  props.productImageblob[4] ? props.productImageblob[4] : (props.productImage[4] && props.productImage[4]!="deleted" ) ? `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.productImage[4]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                    {/* <h1>image </h1> */}
                                </button>
                            </div>
                            
                            
                            
                          
                           
                            
                        </div>
                       
                    </div>
                    {/* {productimageblob!=="" ?
                    <img src={productimageblob} alt="" className="object-contain h-48 overflow-hidden" />
                    :
                    product.image &&
                    <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${product.image}`} alt="" className="object-contain h-48 overflow-hidden "/>
                    } */}
            <div className="flex justify-end  space-x-3 w-full mt-8 ">
                    <button className="bg-red-500 text-white py-1 font-semibold rounded-md   px-1 w-8/12 md:w-3/12">RESET</button>
                    <button   type="submit"  value="submit" className="bg-blue-500 text-white py-1  font-semibold rounded-md  px-1 w-8/12 md:w-3/12">Save</button>
            </div>
            
        </form>
    )

    
}
export default AddProductWindow