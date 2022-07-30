import SideNav from "../sideNav"
import NavOperation from "../operation"
import { useState,useEffect } from "react"
import FormLayout from "../form"
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';
import PurchaseAdd from "./purchaseAdd";
import { mobilehouseApi } from "axiosinstance";
import TableContent from "../table";
import MainLayoutAdmin from "../MainLayoutAdmin";
const PurchaseMain=()=>{

    let purchasetable=[];
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")
    const[addpurchase,setaddpurchase]=useState(false)
    const[purchase,setpurchase]=useState("")

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

  const purchaseaddclose=()=>{
      setaddpurchase(false)
      mobilehouseApi.get('/getPurchase')
      .then((res)=>{
          setpurchase(res.data)
      })
  }

  const AddNew=()=>{
    setaddpurchase(true)
    }

    useEffect(()=>{
        if(purchase==="")
        {
            mobilehouseApi.get('/getPurchase')
            .then((res)=>{
                setpurchase(res.data)
            })
        }
    },[])

    return(
        <div className="flex w-full h-screen overflow-auto">
             {
                    addpurchase===true && 
                        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0 z-20">
                            <div className=" space-y-4  w-full flex justify-center  h-4/5 ">
                                <div className="max-h-full w-9/12 bg-white p-4 overflow-auto">
                                    <div className="w-full">
                                        <button onClick={()=>setaddpurchase(false)} className="flex focus:outline-none justify-end w-full text-right"><AiOutlineClose/></button>
                                        {/* <h1 className="w-full flex justify-center text-xl font-semibold">{ operation==="" ? "ADD" : operation} Purchase</h1> */}
                                       
                                    </div>
                                    
                                    <div  className="w-full ">
                                        <PurchaseAdd
                                        purchasetable={purchasetable}
                                        purchaseaddclose={purchaseaddclose}
                                        />
                                      
                                    
                                    </div>
                                </div>
                              
                            </div>
                           
                        </div>
                }
             <MainLayoutAdmin>
                
               <NavOperation
               AddNew={AddNew }
               />
                {
                    purchase &&
                    <TableContent
                         Data={purchase}
                         tableOperation={tableOperation}
    
                    />
                }
             </MainLayoutAdmin>
          
    </div>   
    )
}
export default PurchaseMain
