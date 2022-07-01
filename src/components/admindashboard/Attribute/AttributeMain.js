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

    // create form data
    const addformdata=[
        {name:"attributeName",type:"text",required:true},
        {name:"status",type:"select",value:[{value:"",name:"--select--"},{value:1,name:"active"},{value:0,name:"disable"}],required:"true"},
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
       
        
        MobileHouseApi.post('/attributeAdd',data,{headers:{accessToken:localStorage.getItem("accessToken")}})
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
            MobileHouseApi.get('getattribute',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                setattribute(res.data)
            })
         }
        })
       
      }
      
      const AddNew=()=>{
        setaddattribute(true)
     }
     
     // close add window
     const closeWindow=()=>{
        setaddattribute(false)
        setoperation("")
        setoperationitem("")
     }

     // when click edit view delete then it will work
      const tableOperation=(operation,attribute)=>{
            console.log(attribute)
            setoperationid(attribute.id)
        
            setoperationitem(attribute)
            setoperation(operation)
            setaddattribute(true)
            
      }

      useEffect(()=>{
        if(attribute==="")
        {
        MobileHouseApi.get('getattribute',{headers:{accessToken:localStorage.getItem("accessToken")}})
        .then((res)=>{
            setattribute(res.data)
        })
        }
        

      },[addattribute,attribute])
        console.log(attribute)
           
 console.log(operationitem)
    return(
        <div className="flex w-full h-screen overflow-auto">
             {
                    addattribute===true && 
                    
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            values={attributevalues}
                                            operation={operation}
                                            operationitem={operationitem}
                                            Mainname={operationitem.attributeName}
                                            Mainstatus={operationitem.status}
                                            close={closeWindow}
                                            head="Attribute"
                                        />
                                    
                                   
                }
            <SideNav/>
            <div className="w-full h-fixedNoNav3 overflow-auto  ">
               
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