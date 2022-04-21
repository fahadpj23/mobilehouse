import SideNav from "../sideNav"
import NavOperation from "../operation"
import { useState } from "react"
import FormLayout from "../form"
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';
const PurchaseMain=()=>{

    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")
    const[addpurchase,setaddpurchase]=useState(false)

    const addformdata=[
        {name:"name",type:"text"},
        {name:"status",type:"select",value:["active","disable"]},
        {name:"values",type:"text",more:"yes"}
    ]

    

    
    const tableOperation=(operation,attribute)=>{
        console.log(attribute)
        setoperationid(attribute.id)
    
        setoperationitem(attribute)
        setoperation(operation)
        setaddpurchase(true)
        
  }

  const AddNew=()=>{
    setaddpurchase(true)
}

    return(
        <div className="flex w-full">
             {
                    addpurchase==true && 
                        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                            <div className=" space-y-4  w-3/12 h-4/5 ">
                                <div className="max-h-full bg-white p-4 overflow-auto">
                                    <div className="w-full">
                                        <button onClick={()=>setaddpurchase(false)} className="flex focus:outline-none justify-end w-full text-right"><AiOutlineClose/></button>
                                        <h1 className="w-full flex justify-center text-xl font-semibold">{ operation=="" ? "ADD" : operation} Attribute</h1>
                                       
                                    </div>
                                    
                                    <div>
                                        <FormLayout
                                            formdata={addformdata}
                                            // handleSubmit={handleSubmit}
                                            
                                            operation={operation}
                                            operationitem={operationitem}
                                            // Mainname={operationitem.attributeName}
                                            // Mainstatus={operationitem.status}
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
                {/* {
                    attribute &&
                    <TableContent
                         Data={attribute}
                         tableOperation={tableOperation}
    
                    />
                } */}
            </div>
    </div>   
    )
}
export default PurchaseMain
