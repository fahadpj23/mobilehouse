import SideNav from "../sideNav"
import { AiFillSetting } from 'react-icons/ai';
import { useState,useContext } from "react";
import FormLayout from '../form'
import MobileHouseApi from "../../../helpers/axiosinstance";
import { Usercontext } from "../../context/userContext";
const AttributeMain=()=>{
    const context=useContext(Usercontext    )
    const [addattribute,setaddattribute]=useState(false)
    const addformdata=[
        {name:"name",type:"text"},
        {name:"status",type:"select",value:["active","disable"]},
        {name:"values",type:"text",more:"yes"}
    ]
    const attributevalues=[];

    const handleSubmit=(e)=>{
        console.log(e.target)
        const data=new FormData(e.target)
        data.append("attributevalues",JSON.stringify( attributevalues))
        MobileHouseApi.post('/attrubuteAdd',data)
        .then((res)=>{
         if(res.data.error)
         {
                context.notify(res.data.error)
         }
         else
         {
            context.notify(res.data.success)
            setaddattribute(false)
         }
        })
        e.preventDefault();
      }
   
    return(
        <div className="flex w-full">
             {
                    addattribute==true && 
                        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                            <div className=" space-y-4  w-3/12 h-4/5 ">
                                <div className="max-h-full bg-white p-4 overflow-auto">
                                    <h1 className="w-full flex justify-center text-xl font-semibold">Add Attribute</h1>
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
                <button className="w-2/12 px-3 py-1 border border-gray-600">DELETE</button>
                <button  className="w-2/12 px-3 py-1 border border-gray-600 ">EDIT</button>
                <button onClick={()=>setaddattribute(true)}className="px-3 w-2/12 py-1 border border-gray-600 ">ADD NEW</button>
                   

                </div>
                <table className="min-w-full">
                    <tr >
                        <th>SL NO</th>
                        <th>Attribute name</th>
                        <th>Values</th>
                        <th>Status</th>
                        <th className="flex justify-center  mt-1"><AiFillSetting/></th>

                        
                    </tr>
                    <tr className="text-center">
                        <td>5645</td>
                        <td>5645</td>
                        <th>Values</th>
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
export default AttributeMain