
import { useState ,useEffect,useContext} from "react"


import { Usercontext } from "../../context/userContext";


import HeadProductAdding from "./HeadProductAdding";
import {MobileHouseApi} from "helpers/axiosinstance";

const HeadingMain=(props)=>{
    const context=useContext(Usercontext )

    const [Heading,setHeading]=useState("")
    
 
  
    const[status,setstatus]=useState(1)
   
    
   
   
   
    const headproduct=[];

    
     

    const HeadingAdd=()=>{
      // if(Heading && headproduct.length!=0)
      // {
        const formData = new FormData();
        formData.append("head",Heading)
        formData.append("operation",props.operation)
        formData.append("operationid",props.operationid)
        formData.append("status",status)
        formData.append("products",JSON.stringify(headproduct))
        MobileHouseApi.post('/headingAdd',formData,{headers:{accessToken:localStorage.getItem("accessToken")}})
        .then((res)=>{
          if(res.data.success)
          {
            props.AddSucess()
          }
        })
    //  }
    }

     
 
   
    return(
        <div >
           
                                  <HeadProductAdding
                                    headproduct={headproduct}
                                    setHeading={setHeading}
                                    HeadingAdd={HeadingAdd}
                                   
                                    Heading={Heading}
                                    AddWindowClose={props.AddWindowClose}
                                    setstatus={setstatus}
                                    status={status}
                                  />
                     
    </div>   
    )
}
export default HeadingMain