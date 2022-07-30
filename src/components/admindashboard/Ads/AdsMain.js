import SideNav from "../sideNav"

import { useState ,useEffect,useContext} from "react"
import FormLayout from '../form'
import MobileHouseApi from "../../../helpers/axiosinstance";
import { Usercontext } from "../../context/userContext";
import TableContent from "../table";
import NavOperation from '../operation'
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';
import MainLayoutAdmin from "../MainLayoutAdmin";
// import AdsAdd from "./AdsAdd";
import { mobilehouseApi } from "axiosinstance";
import AdsAdd from "./AdsAdd";
const AdsMain=(props)=>{
    const context=useContext(Usercontext )
    const [addAds,setaddAds]=useState(false)
    const [Ads,setAds]=useState("")
    const[operationid,setoperationid]=useState("")
    const [operation,setoperation]=useState("")
 
    const[status,setstatus]=useState(1)
    // const [Heading,setHeading]=useState("")
  
    // const[operationitem,setoperationitem]=useState("")
     
    // const[HeadData,setHeadData]=useState("")
    // const[editData,seteditData]=useState("")
    
    
   
 
   
   

      const AddNew=()=>{
        setaddAds(true)
     }

    //  const closeWindow=()=>{
    //     setaddAds(false)
    //     setoperation("")
    //     setoperationitem("")
    //  }

     
    const AdsUpload=()=>{
      // if(Heading && headproduct.length!=0)
      // {
        console.log(props.AdsImageArray)
        if(props.AdsImageArray.length==3)
        {
            props.AdsImageArray.map((item,key)=>{
                console.log(item)
                if(item.Brand!="" && item.image!=""  && item.position!="")
                {

                    if(props.AdsImageArray.length==key+1)
                    {
                        const formData = new FormData();
                        props.AdsImageArray.map((item,key)=>{
                            formData.append("image"+ (key+1),item.image)
                        })
                        formData.append("AdsImageArray",JSON.stringify(props.AdsImageArray))
                        formData.append("status",status)
                        formData.append("operation",operation)
                        mobilehouseApi.post('/AddAds',formData,{headers:{accessToken:localStorage.getItem("accessToken")}})
                        .then((res)=>{
                        if(res.data.success)
                        {
                            setaddAds(false)
                            props.AdsImageArray.length=0;
                            context.notify(res.data.success) 
                            MobileHouseApi.get('/getAdsData',{headers:{accessToken:localStorage.getItem("accessToken")}})
                            .then((res)=>{
                            setAds(res.data)
                            })

                        }
                        })
                    }
                }
                else
                {
                    console.log("fill all things ")
                }
            })
        }
        else
        {
            console.log(" fill all")
        }
       
     
    }
    const tableOperation=(operation,Ads)=>{
        console.log(Ads)
        setoperationid(Ads.id)
        setoperation(operation)
        setaddAds(true)
        
  }

        useEffect(()=>{
            if(Ads==="")
            {
                MobileHouseApi.get('/getAdsData',{headers:{accessToken:localStorage.getItem("accessToken")}})
                .then((res)=>{
                setAds(res.data)
                })
            }

        },[Ads])
 
   console.log(Ads)
    return(
        <div className="flex w-full h-screen overflow-auto relative ">
            {
                    addAds===true && 
                                <div className="w-full z-20 absolute left-0 right-0">
                                  <AdsAdd
                                     AdsImageArray={props.AdsImageArray}
                                     addAds={addAds}
                                     setaddAds={setaddAds}
                                     AdsUpload={AdsUpload}
                                     setstatus={setstatus}
                                     status={status}
                                     operation={operation}
                                     operationid={operationid}
                                  />
                                  </div>
                                        
                }
             <MainLayoutAdmin>
                
            <NavOperation
            AddNew={AddNew}
            />
                {
                    Ads &&
                    <TableContent
                         Data={Ads}
                         tableOperation={tableOperation}

                    />
                }
                
                
            </MainLayoutAdmin>
    </div>   
    )
}
export default AdsMain