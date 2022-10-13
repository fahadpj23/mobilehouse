
import { IoIosArrowForward } from 'react-icons/io';
import { useEffect,useState } from 'react';
import { MobileHouseApi } from 'axiosinstance';
const OrderDetailMain=()=>{

    let orderId=new URLSearchParams(window.location.search).get('OrderId')
    const [orderDetails,setorderDetails]=useState("")

    useEffect(()=>{
        if(orderDetails=="")
        {
            MobileHouseApi.get('SingleOrderDetails',{headers:{UserToken:localStorage.getItem('UserToken')},params:{orderId:orderId}})
            .then((res)=>{
               setorderDetails(res.data.OrderDetail)
            })
            .catch(Error)
                console.log(Error)
        }

    },[])
    console.log(orderDetails)
    return(
        <div>
            <h1 className='flex space-x-1 items-center'><span>MyAccount</span><IoIosArrowForward/><span>MyOrders</span><span><IoIosArrowForward/></span><span>{orderId}</span></h1>
            {orderDetails && <div>
                <div className='flex'>
                        <div>
                            <h1>Product</h1>
                            <div className='flex'>
                                <div>
                                     <img src={ `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${orderDetails.image}`} alt="" className=" h-48 w-48 " />
                                </div>
                                <div>
                                    <h1>{orderDetails.name}</h1>
                                    <h1>{orderDetails.price}</h1>
                                    <h1>Seller:Mobile House</h1>
                                </div>
                            </div>
                        </div>
                </div>
               
            </div>}
        </div>
    )
}
export default OrderDetailMain