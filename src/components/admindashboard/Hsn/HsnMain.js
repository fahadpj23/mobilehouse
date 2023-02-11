import MainLayoutAdmin from "../MainLayoutAdmin";



import SideNav from "components/admindashboard/sideNav"
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';

import { useState,useContext,useEffect } from "react";
import FormLayout from '../form'
import {MobileHouseApi} from "helpers/axiosinstance";
import { Usercontext } from "context/userContext";
import TableContent from "../table";
import NavOperation from "../operation";
const HsnMain=(props )=>{


    const context=useContext(Usercontext )
    const [addHsn,setaddHsn]=useState(false)
  
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")


    const addformdata=[
         {name:"HSN_Code",type:"number",required:"true"},
        {name:"Product",type:"text",required:"true"},
        {name:"CGST",type:"number",required:"true"},
        {name:"SGST",type:"number",required:"true"},
        {name:"IGST",type:"number",required:"true"},
         {name:"status",type:"select",value:[{value:"",name:"--select--"},{value:1,name:"active"},{value:0,name:"disable"}],required:"true"},
    
    ]
    const HSNvalues=[];

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data=new FormData(e.target)
        
        data.append("operation",props.operation)
        data.append("operationid",props.operationitem.id )
        
       
        
        MobileHouseApi.post('/HSNcodePost',data,{withCredentials:true})
        .then((res)=>{
         if(res.data.error)
         {
                context.notify(res.data.error,"error")
         }
         else
         {
            context.notify(res.data.success,"success")
            props.AddSucess()
           
         }
        })
       
      }
      
 
    
           
 
    return(
        <div className="">
            
                      
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            HSNvalues={HSNvalues}
                                            operation={props.operation}
                                            operationitem={props.operationitem}
                                            AddWindowClose={props.AddWindowClose}
                                           
                                        />
                    
            </div>
              
            
           
                
           
     
    )
}
export default HsnMain