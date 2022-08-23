

import { useState,useContext,useEffect } from "react";
import FormLayout from '../form'
import {MobileHouseApi} from "helpers/axiosinstance";
import { Usercontext } from "components/context/userContext";

const AttributeMain=(props)=>{


    const context=useContext(Usercontext )

 
   

    // create form data
    const addformdata=[
        {name:"attributeName",type:"text",required:true},
        {name:"status",type:"select",value:[{value:1,name:"active"},{value:0,name:"disable"}],required:"true"},
        {name:"values",type:"text",more:"yes"}
    ]
    const attributevalues=[];

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data=new FormData(e.target)
        data.append("attributevalues",JSON.stringify( attributevalues))
        data.append("operation",props.operation)
        data.append("operationid",props.operationitem.id )
     
        
        MobileHouseApi.post('/attributeAdd',data,{headers:{accessToken:localStorage.getItem("accessToken")}})
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
                                            values={attributevalues}
                                            operation={props.operation}
                                            operationitem={props.operationitem}
                                            AddSucess={props.AddSucess}
                                            AddWindowClose={props.AddWindowClose}                                 
                                            head="Attribute"
                                        />
                 
                                    
                                   
                
           
          
         
            
    </div>   
    )
}
export default AttributeMain