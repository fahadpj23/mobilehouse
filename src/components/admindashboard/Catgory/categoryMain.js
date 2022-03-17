import SideNav from "../sideNav"
import { AiFillSetting } from 'react-icons/ai';
import { useState ,useEffect,useContext} from "react"
import FormLayout from '../form'
import MobileHouseApi from "../../../helpers/axiosinstance";
import { Usercontext } from "../../context/userContext";
const CategoryMain=(props)=>{
    const context=useContext(Usercontext )
    const [addcategory,setaddcategory]=useState(false)
    const attributevalues=[];
    const addformdata=[
        {name:"name",type:"text"},
        {name:"status",type:"select",value:["active","disable"]},
        {name:"attribute",type:"select",value:props.attributes,more:"yes"},
        
    ]

    const handleSubmit=(e)=>{
       
        const data=new FormData(e.target)
        data.append("attributevalues",JSON.stringify( attributevalues))
        MobileHouseApi.post('/categoryAdd',data)
        .then((res)=>{
         if(res.data.error)
         {
                context.notify(res.data.error)
         }
         else
         {
            context.notify(res.data.success)
            setaddcategory(false)
            // MobileHouseApi.get('getattrirbute')
            // .then((res)=>{
            //     setattribute(res.data)
            // })
         }
        })
        e.preventDefault();
      }
    
    
   
    return(
        <div className="flex w-full">
            {
                    addcategory==true && 
                        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                            <div className=" space-y-4  w-3/12 h-4/5 ">
                                <div className="max-h-full bg-white p-4 overflow-auto">
                                    <h1 className="w-full flex justify-center text-xl font-semibold">Add Catgeory</h1>
                                    <div>
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            attributevalues={attributevalues}
                                        />
                                    
                                    </div>
                                </div>
                              
                            </div>
                           
                        </div>
                }
            <SideNav/>
            <div className="w-10/12">
                
                <div className="w-full flex justify-end space-x-3">
                <button className="px-3 py-1 border border-gray-600">DELETE</button>
                <button onClick={()=>setaddcategory(true)}className="px-3 py-1 border border-gray-600 ">ADD NEW</button>
                   

                </div>
                <table className="min-w-full">
                    <tr >
                        <th>SL NO</th>
                        <th>Catgeory name</th>
                        <th>Approval</th>
                        <th>Status</th>
                        <th className="flex justify-center  mt-1"><AiFillSetting/></th>

                        
                    </tr>
                    <tr className="text-center">
                        <td>5645</td>
                        <td>5645</td>
                        <td>5645</td>
                        <td>5645</td>
                        <td>
                            <select>
                                <option>view</option>
                                <option>edit</option>
                                <option>delete</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
    </div>   
    )
}
export default CategoryMain