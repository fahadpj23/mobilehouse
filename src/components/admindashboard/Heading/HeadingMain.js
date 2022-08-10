import SideNav from "../sideNav"

import { useState ,useEffect,useContext} from "react"
import FormLayout from '../form'

import { Usercontext } from "../../context/userContext";
import TableContent from "../table";
import NavOperation from '../operation'
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';
import HeadProductAdding from "./HeadProductAdding";
import {MobileHouseApi} from "helpers/axiosinstance";
import MainLayoutAdmin from "../MainLayoutAdmin";
const HeadingMain=(props)=>{
    const context=useContext(Usercontext )
    const [addHeading,setaddHeading]=useState(false)
    const [Heading,setHeading]=useState("")
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")
 
    const[editData,seteditData]=useState("")
    const[status,setstatus]=useState(1)
    
   
    const Headingvalues=[];
   
   

      const AddNew=()=>{
        setaddHeading(true)
     }

     const closeWindow=()=>{
        setaddHeading(false)
        setoperation("")
        setoperationitem("")
     }

      const tableOperation=(operation,operationHeading)=>{
        console.log(operation)
        console.log(operationHeading)
        
          MobileHouseApi.get('/editGetHead',{params:{HeadingId:operationHeading.id},headers:{accessToken:localStorage.getItem("accessToken")}})
          .then((res)=>{
            if(res.data.headEdit)
            {
              seteditData(res.data.headEdit)
              setoperation(operation)
              setoperationid(operationHeading.id)
              // res.data.headEdit && setHeading(res.data.headEdit[0].Heading);
              // res.data.headEdit && res.data.headEdit[0].products.map((item,key)=>{
              //   headproduct.push(item)
              // })
              setaddHeading(true )
            }
           
              
           
          })       
       
    }

    const HeadingAdd=()=>{
      // if(Heading && headproduct.length!=0)
      // {
        const formData = new FormData();
        formData.append("head",Heading)
        formData.append("operation",operation)
        formData.append("operationid",operationid)
        formData.append("status",status)
        formData.append("products",JSON.stringify(props.headproduct))
        MobileHouseApi.post('/headingAdd',formData,{headers:{accessToken:localStorage.getItem("accessToken")}})
        .then((res)=>{
          if(res.data.success)
          {
            setaddHeading(false )
            context.notify(res.data.success)
            // MobileHouseApi.get('/getHead',{headers:{accessToken:localStorage.getItem("accessToken")}})
            // .then((res)=>{
            // setHeadData(res.data)
            // })

          }
        })
    //  }
    }

     
 
   
    return(
        <div className="flex w-full h-screen overflow-auto z-20 relative">
            {
                    addHeading===true && 
                      <div className="w-full z-20 absolute left-0 right-0">
                                  <HeadProductAdding
                                    headproduct={props.headproduct}
                                    setHeading={setHeading}
                                    HeadingAdd={HeadingAdd}
                                    editData={editData[0]}
                                    Heading={Heading}
                                    setaddHeading={setaddHeading}
                                    setstatus={setstatus}
                                    status={status}
                                  />
                      </div>
                                        
                }
             <MainLayoutAdmin>
                
            <NavOperation
            AddNew={AddNew}
            />
                
                   
                    <TableContent
                        //  Data={HeadData}
                         tableOperation={tableOperation}
                         controller={props.controller}

                    />
                
                
                
                </MainLayoutAdmin>
    </div>   
    )
}
export default HeadingMain