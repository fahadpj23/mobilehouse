

import { useState ,useEffect,useContext} from "react"
import {MobileHouseApi} from "helpers/axiosinstance";
import { Usercontext } from "../../../context/userContext";

import BannerAdd from "./BannerAdd";


const BannerMain=(props)=>{
    const context=useContext(Usercontext )
    const [Banner,setBanner]=useState(false)
    const [BannerImageArray,setBannerImageArray]=useState([])

   
   
  console.log(props)
   
   
  // remove all banner from image banner array

    const BannerImageremove=()=>{
      setBannerImageArray([])
    }

     //upload banner
    const BannerUpload=()=>{
     
        const formData = new FormData();
        BannerImageArray.map((item,key)=>{
            formData.append("image"+ (key+1),item.image)
        })
        formData.append("images",JSON.stringify(BannerImageArray))
        formData.append("operation",props.operation)
        formData.append("operationid",props.operationitem.id)
        formData.append("position",props.operationitem.position)
        MobileHouseApi.post('/AddBanner',formData)
        .then((res)=>{
          if(res.data.success)
          {
          
            
            context.notify(res.data.success,"success")
            props.AddSucess()

          }
        })
   
    }
 
    useEffect(()=>{
        if(Banner==false)
        {
          MobileHouseApi.get('/BannerFetch')
          .then((res)=>{
           
           
            setBannerImageArray(props.operation ? [] :res.data.banner)
            setBanner(true )
           
          })
          .catch((Error)=>{ console.log(Error)})
        }
    })
    return(
        <div >
                                {
                                  Banner && 
                                  <BannerAdd
                                     BannerImageArray={BannerImageArray}
                                    
                                      BannerUpload={BannerUpload}
                                      operation={props.operation}
                                      operationitem={props.operationitem}
                                      AddWindowClose={props.AddWindowClose}
                                      Banner={Banner}
                                      BannerImageremove={BannerImageremove}
                
                                  />
                                }
                               
                                        
             
               
    </div>   
    )
}
export default BannerMain