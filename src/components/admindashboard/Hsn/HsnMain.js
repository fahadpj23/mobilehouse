import MainLayoutAdmin from "../MainLayoutAdmin";



import SideNav from "components/admindashboard/sideNav"
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';

import { useState,useContext,useEffect } from "react";
import FormLayout from '../form'
import {MobileHouseApi} from "helpers/axiosinstance";
import { Usercontext } from "components/context/userContext";
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
        
        data.append("operation",operation)
        data.append("operationid",operationid )
        if(operationitem)
        {
            data.append("oldHSNName",operationitem.HSNName )
        }
       
        
        MobileHouseApi.post('/HSNcodePost',data)
        .then((res)=>{
         if(res.data.error)
         {
                context.notify(res.data.error,"error")
         }
         else
         {
            context.notify(res.data.success,"success")
            setaddHsn(false)
            setoperationid("")
            setoperation("")
            setoperationitem("")
           
         }
        })
       
      }
      
      const AddNew=()=>{
        setaddHsn(true)
     }

     const closeWindow=()=>{
        setaddHsn(false)
        setoperation("")
        setoperationitem("")
     }

      const tableOperation=(operation,HSN)=>{
           if(operation=="edit")
           {
            setoperationid(HSN.id)
        
            setoperationitem(HSN)
            setoperation(operation)
            setaddHsn(true)
           }
            
      }

     
           
 console.log(operationitem)
    return(
        <div className="flex w-full h-screen overflow-auto z-20">
             {
                    addHsn===true && 
                        <div className='w-screen fixed bg-gray-200 h-screen opacity-100 flex items-center justify-center  z-50  '>
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            HSNvalues={HSNvalues}
                                            operation={operation}
                                            operationitem={operationitem}
                                            // Mainname={operationitem.HSNName}
                                            Mainstatus={operationitem.status}
                                            close={closeWindow}
                                            head="HSN"
                                           
                                        />
                        </div>
                                    
                                  
                }

            <div>
                <MainLayoutAdmin>
                <div className="w-full">
                <NavOperation
                    AddNew={AddNew}
                />
                    
                        <TableContent
                           
                            tableOperation={tableOperation}
                            controller={props.controller}

                        />
                 
                </div>
                </MainLayoutAdmin>
            
            </div>
            
           
                
           
    </div>   
    )
}
export default HsnMain