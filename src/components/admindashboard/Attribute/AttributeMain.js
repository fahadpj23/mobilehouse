import SideNav from "../sideNav"
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';

import { useState,useContext,useEffect } from "react";
import FormLayout from '../form'
import MobileHouseApi from "../../../helpers/axiosinstance";
import { Usercontext } from "../../context/userContext";
import TableContent from "../table";
const AttributeMain=()=>{


    const context=useContext(Usercontext )
    const [addattribute,setaddattribute]=useState(false)
    const [attribute,setattribute]=useState("")
    const [operation,setoperation]=useState("select")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")


    const addformdata=[
        {name:"name",type:"text"},
        {name:"status",type:"select",value:["active","disable"]},
        {name:"values",type:"text",more:"yes"}
    ]
    const attributevalues=[];

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data=new FormData(e.target)
        data.append("attributevalues",JSON.stringify( attributevalues))
        data.append("operation",operation)
        data.append("operationid",operationid )
        
        
        MobileHouseApi.post('/attributeAdd',data)
        .then((res)=>{
         if(res.data.error)
         {
                context.notify(res.data.error)
         }
         else
         {
            context.notify(res.data.success)
            setaddattribute(false)
            setoperation("select")
            MobileHouseApi.get('getattribute')
            .then((res)=>{
                setattribute(res.data)
            })
         }
        })
       
      }
   

      const tableOperation=(operation,attribute)=>{
            console.log(attribute)
            setoperationid(attribute.id)
        
            setoperationitem(attribute)
            setoperation(operation)
            setaddattribute(true)
            
      }

      useEffect(()=>{
        if(attribute=="")
        {
        MobileHouseApi.get('getattribute')
        .then((res)=>{
            setattribute(res.data)
        })
        }
        

      },[addattribute,attribute])
        console.log(attribute)
           

    return(
        <div className="flex w-full">
             {
                    addattribute==true && 
                        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                            <div className=" space-y-4  w-3/12 h-4/5 ">
                                <div className="max-h-full bg-white p-4 overflow-auto">
                                    <div className="w-full">
                                        <button onClick={()=>setaddattribute(false)} className="flex focus:outline-none justify-end w-full text-right"><AiOutlineClose/></button>
                                        <h1 className="w-full flex justify-center text-xl font-semibold">{ operation=="" ? "ADD" : operation} Attribute</h1>
                                       
                                    </div>
                                    
                                    <div>
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            attributevalues={attributevalues}
                                            operation={operation}
                                            operationitem={operationitem}
                                            Mainname={operationitem.attributeName}
                                            Mainstatus={operationitem.status}
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
                {
                    attribute &&
                    <TableContent
                         Data={attribute}
                         tableOperation={tableOperation}

                    />
                }
            </div>
    </div>   
    )
}
export default AttributeMain