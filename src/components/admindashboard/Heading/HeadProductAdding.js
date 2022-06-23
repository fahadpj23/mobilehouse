import { useState ,useEffect } from "react"
import MobileHouseApi from "helpers/axiosinstance"
import { MdDelete } from 'react-icons/md';
const HeadProductAdding=(props)=>{
 
    const [searchValue,setsearchValue]=useState("")
    const [products,setproducts]=useState("")
    const [productdelete,setproductdelete]=useState(false)
    const [editDataset,seteditDataset]=useState(false)
    const searchProduct=(searchItem)=>{
        setsearchValue(searchItem)
       MobileHouseApi.get('headProduct',{params:{searchitem:searchItem}})
       .then((res)=>{
           setproducts(res.data.products)
       })
   }

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

   useEffect(()=>{
        if(props.editData && editDataset==false)
        {
            console.log(props.editData)
            props.setHeading(props.editData.Heading)
            props.editData.products && props.editData.products.map((item,key)=>{
                
                props.headproduct.push(item)
                
            })
            console.log(props.headproduct)
            seteditDataset(true)
        }
   },[editDataset])
   console.log(props.headproduct)

    return(
        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                <div className="flex flex-col w-7/12 h-4/5 bg-white justify-between p-5">
                    <div className="space-y-3">
                        <input onChange={(e)=>props.setHeading(e.target.value)} value={props.Heading} type="text" className="w-4/12 py-1  px-1 focus:outline-none border border-gray-400 rounded" placeholder="Heading"/>
                        <hr className="w-full border bg-gray-500"></hr>
                        <div className="relative">
                        <input type="text" onChange={(e)=>searchProduct(e.target.value)} value={searchValue}  autoComplete="off" placeholder="search product" className="w-6/12 py-1 border border-gray-400 rounded px-1 focus:outline-none " />
                                            {searchValue &&  <div className="w-full shadow-sm h-96 overflow-auto absolute top-9 bg-white z-20">
                                            { products && products.map((item1,key1)=>{
                                                return(
                                                    <div className="flex justify-between items-center w-full">
                                                        <h1 className="truncate w-6/12">{item1.name}</h1>
                                                        <img src={   `http://localhost:9000/images/${item1.image}`} alt="" className="object-contain h-14 w-14 overflow-hidden" />
                                                        <button type="button"  onClick={()=>addProduct(item1)} className="px-2 h-8 w-20 bg-red-500 focus:outline-none text-white rounded  ">ADD +</button>

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
                                                    <div className="relative border rounded border-gray-300 p-2 w-8/12 flex flex-col items-center justify-center  ">
                                                            <button onClick={()=>deleteProduct(item1.id)} className="absolute  top-1 right-1 "><MdDelete/></button>
                                                            <img src={   `http://localhost:9000/images/${item1.image}`} alt="" className="object-contain h-28 w-28 overflow-hidden" />
                                                            <h1 className="truncate w-full ">{item1.name}</h1>
                                                            <h1>RS:{item1.sellingprice}</h1>

                                                    </div>

                                                )
                                            
                                            })
                                        }

                                </div>
                        }
                        </div>
                        
                    </div>  
                    <div className="w-full flex justify-end">
                        <button onClick={()=>props.HeadingAdd()} className="w-2/12 bg-red-500 text-white rounded p-2">Save</button> 
                    </div>    

                </div>
        </div>
    )
}
export default HeadProductAdding