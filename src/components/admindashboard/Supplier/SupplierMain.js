


import SideNav from "components/admindashboard/sideNav"
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';
import NavOperation from "../operation";
import { useState,useContext,useEffect } from "react";
import FormLayout from '../form'
import {MobileHouseApi} from "helpers/axiosinstance";
import { Usercontext } from "components/context/userContext";
import TableContent from "../table";
import MainLayoutAdmin from "../MainLayoutAdmin";
const SupplierMain=(props)=>{


    const context=useContext(Usercontext )
    const [addsupplier,setaddsupplier]=useState(false)
    const [supplier,setsupplier]=useState("")
  

 
    const addformdata=[
        {name:"supplierName",type:"text",required:"true"},
        {name:"phone",type:"number",required:"true"},
        {name:"address",type:"text",required:"true"},
        {name:"pincode",type:"number",required:"true"},
        {name:"status",type:"select",value:[{value:1,name:"active"},{value:0,name:"disable"}],required:"true"},

        
    ]

  
    console.log(props.operationitem)
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data=new FormData(e.target)
        
        if(props.operationitem)
        {
            data.append("oldattributeName",props.operationitem.attributeName )
        }
        data.append("operation",props.operation)
        data.append("operationid",props.operationitem.id)
        
        MobileHouseApi.post('/SupplierAdd',data,{headers:{accessToken:localStorage.getItem("accessToken")}})
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
   
      

     
           
 console.log("ds")
    return(
        <div className="flex w-full">
            
                       
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            operation={props.operation}
                                            operationitem={props.operationitem}
                                            AddWindowClose={props.AddWindowClose}
                                           
                                        />
                                    
                                   
              
    </div>   
    )
}
export default SupplierMain