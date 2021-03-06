import { useState } from "react"
import { BiDotsVerticalRounded } from 'react-icons/bi';
const TableOperation=(props)=>{
    const[operationsview,setoperationsview]=useState(false)
    const item=props.item

    return(

        <button className={`focus:outline-none ${operationsview && "relative" }`} onClick={()=>setoperationsview(!operationsview)}><BiDotsVerticalRounded/>
                            {operationsview==true &&
                                <div className="flex flex-col space-y-2 absolute top-2 bg-gray-600  text-sm  text-white w-20 right-1  mt-2 py-1">
                                    <button  className="focus:outline-none" onClick={(e)=>(props.tableOperation("view",item),setoperationsview(false))}>view</button>
                                    <button  className="focus:outline-none" onClick={(e)=>(props.tableOperation("edit",item),setoperationsview(false))}>edit</button>
                                    <button  className="focus:outline-none" onClick={(e)=>(props.tableOperation("delete",item),setoperationsview(false))}>delete</button>
                                    {props.type=="product" && <button  className="focus:outline-none" onClick={(e)=>(props.tableOperation("variant",item),setoperationsview(false))}>Variant</button>}
                                </div>
                            }
         </button>
    )
}
export default TableOperation