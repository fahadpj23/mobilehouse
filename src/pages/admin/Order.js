


import { useNavigate } from 'react-router-dom';
import {useContext} from 'react'
import { AuthContext } from 'helpers/authcontext';
import MainLayoutAdmin from 'components/admindashboard/MainLayoutAdmin';
import TableContent from 'components/admindashboard/table';
import { MobileHouseApi } from 'helpers/axiosinstance';
function Order(){
    let navigate=useNavigate();
    const Auth=useContext(AuthContext)
    const DeliveryStatus=(val,orderDetails)=>{
        console.log(orderDetails)
        const formdata=new FormData()
        formdata.append('orderid',orderDetails.orderid)
        formdata.append('status',val)
        MobileHouseApi.post('/DeliveryStatusUpdate',formdata,{headers:{accessToken:localStorage.getItem("accessToken")}})
        .then((res)=>{
            console.log(res.data)
        })
    }
    return(
        <div>
          {Auth && Auth.authState=="authorized" ?
                 <MainLayoutAdmin>
                 <TableContent
                 controller="CustomerOrder"
                 DeliveryStatus={DeliveryStatus}
                 />
                 </MainLayoutAdmin>
              
            :
                navigate("/AdminLogin")
            }
        </div>
    )
    }
export default Order