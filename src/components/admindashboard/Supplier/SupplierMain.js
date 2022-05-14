


import SideNav from "components/admindashboard/sideNav"
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';
import NavOperation from "../operation";
import { useState,useContext,useEffect } from "react";
import FormLayout from '../form'
import MobileHouseApi from "helpers/axiosinstance";
import { Usercontext } from "components/context/userContext";
import TableContent from "../table";
const SupplierMain=()=>{


    const context=useContext(Usercontext )
    const [addsupplier,setaddsupplier]=useState(false)
    const [supplier,setsupplier]=useState("")
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")


 
    const addformdata=[
        {name:"name",type:"text"},
        {name:"phone",type:"number"},
        {name:"Address",type:"text"},
        {name:"Pincode",type:"number"},
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
   

      const tableOperation=(operation,attribute)=>{
            console.log(attribute)
            setoperationid(attribute.id)
        
            setoperationitem(attribute)
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
           
 console.log(operationitem)
    return(
        <div className="flex w-full">
             {
                    addsupplier==true && 
                        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                            <div className=" space-y-4  w-3/12 h-4/5 ">
                                <div className="max-h-full bg-white p-4 overflow-auto">
                                    <div className="w-full">
                                        <button onClick={()=>setaddsupplier(false)} className="flex focus:outline-none justify-end w-full text-right"><AiOutlineClose/></button>
                                        <h1 className="w-full flex justify-center text-xl font-semibold">{ operation=="" ? "ADD" : operation} Supplier</h1>
                                       
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
                        <NavOperation
                            AddNew={AddNew }
                        />

                </div>
                {
                    supplier &&
                    <TableContent
                         Data={supplier}
                         tableOperation={tableOperation}

                    />
                }
            </div>
    </div>   
    )
}
export default SupplierMain