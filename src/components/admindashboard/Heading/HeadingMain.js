import SideNav from "../sideNav"

import { useState ,useEffect,useContext} from "react"
import FormLayout from '../form'
import MobileHouseApi from "../../../helpers/axiosinstance";
import { Usercontext } from "../../context/userContext";
import TableContent from "../table";
import NavOperation from '../operation'
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';
import HeadProductAdding from "./HeadProductAdding";
import { mobilehouseApi } from "axiosinstance";
const HeadingMain=(props)=>{
    const context=useContext(Usercontext )
    const [addHeading,setaddHeading]=useState(false)
    const [Heading,setHeading]=useState("")
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")
    const[HeadData,setHeadData]=useState("")
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
       
          MobileHouseApi.get('/editGetHead',{params:{HeadingId:operationHeading.id}},{headers:{accessToken:localStorage.getItem("accessToken")}})
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
        mobilehouseApi.post('/headingAdd',formData,{headers:{accessToken:localStorage.getItem("accessToken")}})
        .then((res)=>{
          if(res.data.success)
          {
            setaddHeading(false )
            context.notify(res.data.success)
            MobileHouseApi.get('/getHead',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
            setHeadData(res.data)
            })

          }
        })
    //  }
    }

      useEffect(()=>{
        if(HeadData==="")
        {
            MobileHouseApi.get('/getHead',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
            setHeadData(res.data)
            })
        }

      },[HeadData])
 
   
    return(
        <div className="flex w-full h-screen overflow-auto">
            {
                    addHeading===true && 
                       
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
                                        
                }
            <SideNav/>
            <div className="w-full h-fixedNoNav3 overflow-auto ">
                
            <NavOperation
            AddNew={AddNew}
            />
                {
                    HeadData &&
                    <TableContent
                         Data={HeadData}
                         tableOperation={tableOperation}

                    />
                }
                
                
            </div>
    </div>   
    )
}
export default HeadingMain