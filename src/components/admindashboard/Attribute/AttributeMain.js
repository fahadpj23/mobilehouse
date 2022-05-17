import SideNav from "components/admindashboard/sideNav"
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';

import { useState,useContext,useEffect } from "react";
import FormLayout from '../form'
import MobileHouseApi from "helpers/axiosinstance";
import { Usercontext } from "components/context/userContext";
import TableContent from "../table";
import NavOperation from "../operation";
const AttributeMain=()=>{


    const context=useContext(Usercontext )
    const [addattribute,setaddattribute]=useState(false)
    const [attribute,setattribute]=useState("")
    const [operation,setoperation]=useState("")
    // when edit or view call then selected item data store in operation item
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")


    const addformdata=[
        {name:"attributeName",type:"text"},
        {name:"status",type:"select",value:[{value:1,name:"active"},{value:0,name:"disable"}],required:"true"},
        {name:"values",type:"text",more:"yes"}
    ]
    const attributevalues=[];

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data=new FormData(e.target)
        data.append("attributevalues",JSON.stringify( attributevalues))
        data.append("operation",operation)
        data.append("operationid",operationid )
        if(operationitem)
        {
            data.append("oldattributeName",operationitem.attributeName )
        }
       
        
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
            setoperationid("")
            setoperation("")
            setoperationitem("")
            MobileHouseApi.get('getattribute')
            .then((res)=>{
                setattribute(res.data)
            })
         }
        })
       
      }
      
      const AddNew=()=>{
        setaddattribute(true)
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
           
 console.log(operationitem)
    return(
        <div className="flex w-full">
             {
                    addattribute==true && 
                        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                            <div className=" space-y-4  w-4/12 h-4/5 ">
                                <div className="max-h-full bg-white p-4 overflow-auto">
                                    <div className="w-full">
                                        <button onClick={()=>setaddattribute(false)} className="flex focus:outline-none justify-end w-full text-right"><AiOutlineClose/></button>
                                        <h1 className="w-full flex justify-center text-xl font-semibold">{ operation=="" ? "ADD" : operation} Attribute</h1>
                                       
                                    </div>
                                    
                                    <div>
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            values={attributevalues}
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
                
            <NavOperation
            AddNew={AddNew}
            />
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