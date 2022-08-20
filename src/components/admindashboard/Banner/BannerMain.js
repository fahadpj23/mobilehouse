import SideNav from "../sideNav"

import { useState ,useEffect,useContext} from "react"
import FormLayout from '../form'
import {MobileHouseApi} from "helpers/axiosinstance";
import { Usercontext } from "../../context/userContext";
import TableContent from "../table";
import NavOperation from '../operation'
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';
import BannerAdd from "./BannerAdd";
import MainLayoutAdmin from "../MainLayoutAdmin";

const BannerMain=(props)=>{
    const context=useContext(Usercontext )
 
    let BannerImageArray=[]
   
  console.log(props)
   
   

     
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
 

    return(
        <div >
                  
                                  <BannerAdd
                                     BannerImageArray={BannerImageArray}
                                    
                                      BannerUpload={BannerUpload}
                                      operation={props.operation}
                                      operationitem={props.operationitem}
                                      AddWindowClose={props.AddWindowClose}
                
                                  />
                               
                                        
             
               
    </div>   
    )
}
export default BannerMain