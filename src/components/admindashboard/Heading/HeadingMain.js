
import { useState ,useEffect,useContext} from "react"


import { Usercontext } from "../../../context/userContext";


import HeadProductAdding from "./HeadProductAdding";
import {MobileHouseApi} from "helpers/axiosinstance";

const HeadingMain=(props)=>{
    const context=useContext(Usercontext )

    const [HeadingName,setHeadingName]=useState("")

    const[status,setstatus]=useState(1)

    const headproduct=props.operationitem.products ?? [];

    
     

    const HeadingAdd=(e)=>{
    
      e.preventDefault();
      const data=new FormData(e.target)
       
     
        data.append("operation",props.operation)
        data.append("operationid",props.operationitem.id)
 
        data.append("products",JSON.stringify(headproduct))
        MobileHouseApi.post('/headingAdd',data,{headers:{accessToken:localStorage.getItem("accessToken")}})
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
           
                                  <HeadProductAdding
                                    headproduct={headproduct}
                                   
                                    HeadingAdd={HeadingAdd}
                                    operationitem={props.operationitem}
                                   
                                    AddWindowClose={props.AddWindowClose}
                                    setstatus={setstatus}
                                    status={status}
                                    setHeadingName={setHeadingName}
                                    HeadingName={HeadingName}
                                  />
                     
    </div>   
    )
}
export default HeadingMain