import SideNav from "../sideNav"
import { AiFillSetting } from 'react-icons/ai';
import { useState,useContext,useEffect } from "react";
import FormLayout from '../form'
import MobileHouseApi from "../../../helpers/axiosinstance";
import { Usercontext } from "../../context/userContext";
const AttributeMain=()=>{


    const context=useContext(Usercontext )
    const [addattribute,setaddattribute]=useState(false)
    const [attribute,setattribute]=useState("")
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")


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
        data.append("operation",operation)
        data.append("operationid",operationid )
        
        
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
            MobileHouseApi.get('getattribute')
            .then((res)=>{
                setattribute(res.data)
            })
         }
        })
        e.preventDefault();
      }
   

      const attributeOperation=(operation,attribute)=>{
          console.log(attribute)
          setoperationid(attribute.id)
        // if(operation=="edit")
        // {
        //     MobileHouseApi.get('/editattribute',{params:{"attributeid":attributeid}})
        //     .then((res)=>{
        //         console.log(res.data)
        //     })
        // }
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
        

      },[addattribute])
        
           

    return(
        <div className="flex w-full">
             {
                    addattribute==true && 
                        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                            <div className=" space-y-4  w-3/12 h-4/5 ">
                                <div className="max-h-full bg-white p-4 overflow-auto">
                                    <h1 className="w-full flex justify-center text-xl font-semibold">{ operation=="" ? "ADD" : operation} Attribute</h1>
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
                <table className="min-w-full">
                    <tr >
                        <th>SL NO</th>
                        <th>Attribute name</th>
                        <th>Values</th>
                        <th>Status</th>
                        <th className="flex justify-center  mt-1"><AiFillSetting/></th>

                        
                    </tr>
                    {
                        attribute!="" && attribute.map((item,key)=>{
                            return(
                                <tr className="text-center">
                                <td>{key+1}</td>
                                <td>{item.attributeName}</td>
                                <th>{
                                (item.values).toString()
                                }</th>
                                <td>{item.status}</td>
                                <td>
                                    <select onChange={(e)=>{e.target.value!= "select" && attributeOperation(e.target.value,item)}}>
                                        <option value="select">select</option>
                                        <option value="view">view</option>
                                        <option value="edit">edit</option>
                                        <option value="delete">delete</option>
                                    </select>
                                </td>
                            </tr>
                            )
                        })
                    }
                    
                </table>
            </div>
    </div>   
    )
}
export default AttributeMain