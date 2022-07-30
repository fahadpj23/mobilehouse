import SideNav from "../sideNav"

import { useState ,useEffect,useContext} from "react"
import FormLayout from '../form'
import MobileHouseApi from "../../../helpers/axiosinstance";
import { Usercontext } from "../../context/userContext";
import TableContent from "../table";
import NavOperation from '../operation'
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';
import BannerAdd from "./BannerAdd";
import MainLayoutAdmin from "../MainLayoutAdmin";
import { mobilehouseApi } from "axiosinstance";
const BannerMain=(props)=>{
    const context=useContext(Usercontext )
    const [addBanner,setaddBanner]=useState(false)
    const [Banner,setBanner]=useState("")
    // const [Heading,setHeading]=useState("")
    // const [operation,setoperation]=useState("")
    // const[operationitem,setoperationitem]=useState("")
    // const[operationid,setoperationid]=useState("")
    // const[HeadData,setHeadData]=useState("")
    // const[editData,seteditData]=useState("")
    // const[status,setstatus]=useState(1)
    
   
 
   
   

      const AddNew=()=>{
        setaddBanner(true)
     }

    //  const closeWindow=()=>{
    //     setaddBanner(false)
    //     setoperation("")
    //     setoperationitem("")
    //  }

     
    const BannerUpload=()=>{
      // if(Heading && headproduct.length!=0)
      // {
        const formData = new FormData();
        props.BannerImageArray.map((item,key)=>{
            formData.append("image"+ (key+1),item.image)
        })
        formData.append("images",JSON.stringify(props.BannerImageArray))
        mobilehouseApi.post('/AddBanner',formData)
        .then((res)=>{
          if(res.data.success)
          {
            setaddBanner(false)
            
            context.notify(res.data.success)
            MobileHouseApi.get('/getBannerData',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
            setBanner(res.data)
            })

          }
        })
    //  }
    }
    const tableOperation=(operation,attribute)=>{
        console.log(attribute)
        // setoperationid(attribute.id)
    
        // setoperationitem(attribute)
        // setoperation(operation)
        // setaddattribute(true)
        
  }

      useEffect(()=>{
        if(Banner==="")
        {
            MobileHouseApi.get('/getBannerData',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
            setBanner(res.data)
            })
        }

      },[Banner])
 
   console.log(Banner)
    return(
        <div className="flex w-full h-screen overflow-auto">
            {
                    addBanner===true && 
                       
                                  <BannerAdd
                                     BannerImageArray={props.BannerImageArray}
                                    //  addBanner={addBanner}
                                    BannerUpload={BannerUpload}
                                    setaddBanner={setaddBanner}
                                    // editData={editData[0]}
                                    // Heading={Heading}
                                    // setaddBanner={setaddBanner}
                                    // setstatus={setstatus}
                                    // status={status}
                                  />
                                        
                }
            <MainLayoutAdmin>
                
            <NavOperation
            AddNew={AddNew}
            />
                {
                    Banner &&
                    <TableContent
                         Data={Banner}
                         tableOperation={tableOperation}

                    />
                }
                
                
                </MainLayoutAdmin>
    </div>   
    )
}
export default BannerMain