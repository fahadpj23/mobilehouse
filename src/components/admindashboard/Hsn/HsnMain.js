import MainLayoutAdmin from "../MainLayoutAdmin";



import SideNav from "components/admindashboard/sideNav"
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';

import { useState,useContext,useEffect } from "react";
import FormLayout from '../form'
import MobileHouseApi from "helpers/axiosinstance";
import { Usercontext } from "components/context/userContext";
import TableContent from "../table";
import NavOperation from "../operation";
const HsnMain=()=>{


    const context=useContext(Usercontext )
    const [addHsn,setaddHsn]=useState(false)
    const [attribute,setattribute]=useState("")
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")


    const addformdata=[
         {name:"HSN_Code",type:"number",required:"true"},
        {name:"Product",type:"text",required:"true"},
        {name:"CGST",type:"number",required:"true"},
        {name:"SGST",type:"number",required:"true"},
        {name:"IGST",type:"number",required:"true"},
         {name:"status",type:"select",value:[{value:1,name:"active"},{value:0,name:"disable"}],required:"true"},
    
    ]
    const attributevalues=[];

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data=new FormData(e.target)
        
        data.append("operation",operation)
        data.append("operationid",operationid )
        if(operationitem)
        {
            data.append("oldattributeName",operationitem.attributeName )
        }
       
        
        MobileHouseApi.post('/HSNcodePost',data)
        .then((res)=>{
         if(res.data.error)
         {
                context.notify(res.data.error)
         }
         else
         {
            context.notify(res.data.success)
            setaddHsn(false)
            setoperationid("")
            setoperation("")
            setoperationitem("")
            MobileHouseApi.get('getHSN')
            .then((res)=>{
                setattribute(res.data)
            })
         }
        })
       
      }
      
      const AddNew=()=>{
        setaddHsn(true)
     }

      const tableOperation=(operation,HSN)=>{
           
            setoperationid(HSN.id)
        
            setoperationitem(HSN)
            setoperation(operation)
            setaddHsn(true)
            
      }

      useEffect(()=>{
        if(attribute==="")
        {
        MobileHouseApi.get('/getHSN')
        .then((res)=>{
            setattribute(res.data)
        })
        }
        

      },[addHsn,attribute])
        console.log(attribute)
           
 console.log(operationitem)
    return(
        <div className="flex w-full">
             {
                    addHsn===true && 
                        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                            <div className=" space-y-4  w-4/12 h-4/5 ">
                                <div className="max-h-full bg-white p-4 overflow-auto">
                                    <div className="w-full">
                                        <button onClick={()=>setaddHsn(false)} className="flex focus:outline-none justify-end w-full text-right"><AiOutlineClose/></button>
                                        <h1 className="w-full flex justify-center text-xl font-semibold">{ operation==="" ? "ADD" : operation} Attribute</h1>
                                       
                                    </div>
                                    
                                    <div>
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            attributevalues={attributevalues}
                                            operation={operation}
                                            operationitem={operationitem}
                                            // Mainname={operationitem.attributeName}
                                            Mainstatus={operationitem.status}
                                        />
                                    
                                    </div>
                                </div>
                              
                            </div>
                           
                        </div>
                }

            <div>
                <MainLayoutAdmin>
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
           
                </MainLayoutAdmin>
            
            </div>
            
           
                
           
    </div>   
    )
}
export default HsnMain