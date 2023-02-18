

import MainLayoutAdmin from 'Layout/MainLayoutAdmin';
import TableContent from 'components/admindashboard/table';
import { MobileHouseApi } from 'helpers/axiosinstance';
function Order(){
   
    const DeliveryStatus=(val,orderDetails)=>{
        console.log(orderDetails)
        const formdata=new FormData()
        formdata.append('orderid',orderDetails.orderid)
        formdata.append('status',val)
        MobileHouseApi.post('/DeliveryStatusUpdate',formdata)
        .then((res)=>{
            console.log(res.data)
        })
    }
    return(
        <div>
         
                 <MainLayoutAdmin>
                 <TableContent
                 controller="CustomerOrder"
                 DeliveryStatus={DeliveryStatus}
                 />
                 </MainLayoutAdmin>
              
           
        </div>
    )
    }
export default Order