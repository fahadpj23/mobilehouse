


import SideNav from "components/admindashboard/sideNav"
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';
import NavOperation from "../operation";
import { useState,useContext,useEffect } from "react";
import FormLayout from '../form'
import MobileHouseApi from "helpers/axiosinstance";
import { Usercontext } from "components/context/userContext";
import TableContent from "../table";
import MainLayoutAdmin from "../MainLayoutAdmin";
const SupplierMain=()=>{


    const context=useContext(Usercontext )
    const [addsupplier,setaddsupplier]=useState(false)
    const [supplier,setsupplier]=useState("")
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")


 
    const addformdata=[
        {name:"supplierName",type:"text",required:"true"},
        {name:"phone",type:"number",required:"true"},
        {name:"address",type:"text",required:"true"},
        {name:"pincode",type:"number",required:"true"},
        {name:"status",type:"select",value:[{value:1,name:"active"},{value:0,name:"disable"}],required:"true"},

        
    ]

    const attributevalues=[];

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data=new FormData(e.target)
        
        if(operationitem)
        {
            data.append("oldattributeName",operationitem.attributeName )
        }
        data.append("operation",operation)
        data.append("operationid",operationid)
        
        MobileHouseApi.post('/SupplierAdd',data)
        .then((res)=>{
         if(res.data.error)
         {
                context.notify(res.data.error)
         }
         else
         {
            context.notify(res.data.success)
            setaddsupplier(false)
            setoperationid("")
            setoperation("")
            setoperationitem("")
            MobileHouseApi.get('getSupplier')
            .then((res)=>{
                setsupplier(res.data)
            })
         }
        })
       
      }
   
      const closeWindow=()=>{
        setaddsupplier(false)
        setoperation("")
        setoperationitem("")
     }

      const tableOperation=(operation,supplier)=>{
            console.log(supplier)
            setoperationid(supplier.id)
        
            setoperationitem(supplier)
            setoperation(operation)
            setaddsupplier(true)
            
      }
      
    const AddNew=()=>{
        setaddsupplier(true)
    }

      useEffect(()=>{
        if(supplier=="")
        {
        MobileHouseApi.get('getSupplier')
        .then((res)=>{
            setsupplier(res.data)
        })
        }
        

      },[addsupplier,supplier])
        console.log(supplier)
           
 console.log(operation)
    return(
        <div className="flex w-full">
             {
                    addsupplier==true && 
                       
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            attributevalues={attributevalues}
                                            operation={operation}
                                            operationitem={operationitem}
                                            Mainname={operationitem.attributeName}
                                            Mainstatus={operationitem.status}
                                            close={closeWindow}
                                            head="Supplier"
                                        />
                                    
                                   
                }
                 <MainLayoutAdmin>
                    <NavOperation
                            AddNew={AddNew }
                        />

               
                    {
                        supplier &&
                        <TableContent
                            Data={supplier}
                            tableOperation={tableOperation}

                        />
                    }
           
                </MainLayoutAdmin>
          
    </div>   
    )
}
export default SupplierMain