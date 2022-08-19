import SideNav from "../sideNav"
import TableContent from "../table";
import { useState ,useEffect,useContext} from "react"
import {MobileHouseApi} from "helpers/axiosinstance";
import MainLayoutAdmin from "../MainLayoutAdmin";
const OrderMain=(props)=>{
   
    const [OrderDetail, setOrderDetail] = useState("")
    
    //function for set delivery status
    const DeliveryStatus=(deliveryStatus,Orderdet)=>{
        console.log(Orderdet)
        const formData = new FormData();
        formData.append('orderid',Orderdet.orderid)
        formData.append('status',deliveryStatus)
      
        MobileHouseApi.post('/DeliveryStatusUpdate',formData,{headers:{accessToken:localStorage.getItem("accessToken")}})
        .then((res)=>{
           console.log(res.data)
        })
       
    }       
      useEffect(()=>{
        if(OrderDetail==="")
        {
            MobileHouseApi.get('/getOrder',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
             setOrderDetail(res.data)
            })
        }
       

      },[])

   
    return(
        <div className="flex w-full h-screen overflow-auto z-20">
           
              <MainLayoutAdmin>
           
                
                <div className="mt-10">
                    {
                        OrderDetail &&
                        <TableContent
                            Data={OrderDetail}
                            order="order"
                            DeliveryStatus={DeliveryStatus}
                            

                        />
                    }
                </div>
                
              </MainLayoutAdmin>
    </div>   
    )
}
export default OrderMain