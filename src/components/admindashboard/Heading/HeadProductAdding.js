import { useState ,useEffect } from "react"
import {MobileHouseApi} from "helpers/axiosinstance";
import { MdDelete } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

const HeadProductAdding=(props)=>{
 
    console.log(props)
    const [searchValue,setsearchValue]=useState("")
    const [products,setproducts]=useState("")
    const [productdelete,setproductdelete]=useState(false)
    const [editDataset,seteditDataset]=useState(false)
    const searchProduct=(searchItem)=>{
        setsearchValue(searchItem)
      
       MobileHouseApi.get('headProduct',{params:{searchitem:searchItem},headers:{accessToken:localStorage.getItem("accessToken")}})
       .then((res)=>{
           setproducts(res.data.products)
       })
   }
   console.log(props.operationitem)
   const addProduct=(productDetail)=>{
    if(props.headproduct.some((product)=>product.id==productDetail.id)==false)
        props.headproduct.push(productDetail)
    else
        console.log("already inserted")
    setsearchValue("")
   }

   const deleteProduct=(productId)=>{
    
    props.headproduct.map((item,key)=>{
        if(item.id==productId)
        {
            if(props.headproduct.length==1)
            {
                props.headproduct.length=0
                setproductdelete(!productdelete)
            }
            else
            {
                props.headproduct.splice(key,1)
                setproductdelete(!productdelete)
            }
        }
    })
  
   }

//    useEffect(()=>{
//         if(props.editData && editDataset==false)
//         {
//             props.headproduct.length=0;
//             console.log(props.editData)
//             props.setHeading(props.editData.Heading)
//             props.setstatus(props.editData.status)
//             props.editData.products && props.editData.products.map((item,key)=>{
                
//                 props.headproduct.push(item)
                
//             })
//             console.log(props.headproduct)
//             seteditDataset(true)
//         }
//    },[editDataset])
//    console.log(props.headproduct)
//    console.log(props.status)
    return(
        <form method="post" onSubmit={(e)=>props.HeadingAdd(e)}  className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                <div className="flex flex-col w-11/12 md:w-7/12 h-4/5 bg-white justify-between p-5 overflow-auto">
                    <div className="space-y-3 relative">
                         <button onClick={()=>props.AddWindowClose()} className="absolute right-1 top-1 focus:outline-none"><AiOutlineClose/></button>
                        <div className="md:flex md:space-x-3 space-y-3 md:space-y-0 pt-5 md:pt-0">
                            <input  defaultValue={props.operationitem.Heading} required type="text" name="HeadName" id="HeadName" className="w-full md:w-4/12 py-1  px-1 focus:outline-none border border-gray-400 rounded" placeholder="Heading"/>
                            <div className="flex space-x-2 items-center">
                                <h1>Status</h1>
                                <select  defaultValue={props.operationitem.status} name="status" id="status" className="border border-gray-400 w-full py-1  px-1 focus:outline-none rounded">
                                    <option value="1">active</option>
                                    <option value="0">disable</option>
                                </select>
                            </div>
                           
                        </div>
                        <hr className="w-full border bg-gray-500"></hr>
                        <div className="relative">
                        <input type="text" onChange={(e)=>searchProduct(e.target.value)} value={searchValue}  autoComplete="off" placeholder="search product" className="w-full md:w-6/12 py-1 border border-gray-400 rounded px-1 focus:outline-none " />
                                            {searchValue &&  <div className="w-full shadow-sm h-96 overflow-auto absolute top-9 bg-white z-20">
                                            { products && products.map((item1,key1)=>{
                                                return(
                                                    <div className="flex justify-between items-center w-full">
                                                        <h1 className="truncate w-6/12">{item1.name}</h1>
                                                        <img src={   `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item1.image}`} alt="" className="object-contain h-14 w-14 overflow-hidden" />
                                                        <button type="button"  onClick={()=>addProduct(item1)} className="px-2 h-8 md:block hidden w-20 bg-red-500 focus:outline-none text-white rounded  ">ADD +</button>
                                                        <button type="button"  onClick={()=>addProduct(item1)} className="px-2 h-8 block md:hidden w-10 text-2xl bg-red-500 focus:outline-none text-white rounded  "> +</button>

                                                    </div>
                                                )
                                            })}
                                            </div>}
                        {
                            props.headproduct && 
                                <div className="grid grid-cols-2  lg:grid-cols-4 gap-2 mt-5 overflow-auto h-96">
                                        {
                                            props.headproduct.map((item1,key)=>{
                                                return(
                                                    <div className="relative border rounded border-gray-300 p-2  flex flex-col items-center justify-center h-56 ">
                                                            <button onClick={()=>deleteProduct(item1.id)} className="absolute  top-1 right-1 "><MdDelete/></button>
                                                            <img src={   `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item1.image}`} alt="" className="object-contain h-18 md:h-28 w-18 md:w-28 overflow-hidden" />
                                                            <h1 className="truncate w-full text-xs md:text-base text-center">{item1.name}</h1>
                                                            <h1 className="text-xs md:text-base text-center">Rs : {item1.sellingPrice}</h1>

                                                    </div>

                                                )
                                            
                                            })
                                        }

                                </div>
                        }
                        </div>
                        
                    </div>  
                    <div className="w-full flex justify-end  mt-2">
                        <button type="submit" className="w-5/12 md:w-2/12 bg-red-500 text-white rounded p-2">Save</button> 
                    </div>    

                </div>
        </form>
    )
}
export default HeadProductAdding