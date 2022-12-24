

import { useState ,useEffect,useContext} from "react"

import {MobileHouseApi} from "helpers/axiosinstance";
import { Usercontext } from "context/userContext";

// import AdsAdd from "./AdsAdd";

import AdsAdd from "./AdsAdd";
const AdsMain=(props)=>{
    const context=useContext(Usercontext )

  
    const[status,setstatus]=useState(1)

    
    let AdsImageArray=props.operationitem.details ?  props.operationitem.details  : [];
   
 

   
    console.log(AdsImageArray)
     
    const AdsUpload=()=>{
  
        console.log(AdsImageArray)
        if(AdsImageArray.length==3)
        {
            AdsImageArray.map((item,key)=>{
                console.log(item)
                if(item.Brand!="" && item.image!=""  && item.position!="")
                {

                    if(AdsImageArray.length==key+1)
                    {
                        const formData = new FormData();
                        AdsImageArray.map((item,key)=>{
                            formData.append("image"+ (key+1),item.image)
                        })
                        formData.append("AdsImageArray",JSON.stringify(AdsImageArray))
                        formData.append("status",status)
                        formData.append("operation",props.operation)
                        formData.append("operationid",props.operationitem.id)
                        MobileHouseApi.post('/AddAds',formData,{withCredentials:true})
                        .then((res)=>{
                        if(res.data.success)
                        {
                            context.notify(res.data.success,"success ")
                            props.AddSucess()

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
  

      
    return(
        <div >
           
                                  <AdsAdd
                                     AdsImageArray={AdsImageArray}
                                     AddWindowClose={props.AddWindowClose}
                                     AdsUpload={AdsUpload}
                                     
                                     operation={props.operation}
                                     operationitem={props.operationitem}
                                    
                                  />
                                  
                                        
             
    </div>   
    )
}
export default AdsMain