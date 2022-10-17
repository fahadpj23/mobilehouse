
import { IoIosArrowForward } from 'react-icons/io';
import { useEffect,useState } from 'react';
import { MobileHouseApi } from 'axiosinstance';
import OrderProductDetails from './OrderProductDetails';
const CancelOrderMain=()=>{

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
        <div className='p-4 md:p-8 w-screen h-full md:h-screen'>
            <h1 className='flex space-x-1 items-center'><span>MyAccount</span><IoIosArrowForward/><span>MyOrders</span><span><IoIosArrowForward/></span><span>{orderId}</span></h1>

        
            <div className=' flex w-full h-full md:h-4/5  items-center justify-center mt-10'>

                    <div className='w-full md:w-10/12 h-full border border-gray-300 rounded p-1 md:p-5'>
                        {orderDetails &&
                         <div className='flex flex-col-reverse md:flex-col'>
                           

                           <OrderProductDetails
                            ProductDetails={orderDetails}
                           />
                            <div className='  mt-10 space-y-5'>
                                    <h1 className='font-semibold'>Cancel Order</h1>
                                    <div className='flex'>
                                            <div className='w-5/12'>
                                                <select className='border border-gray-300 p-1 focus:outline-none rounded text-sm'>
                                                    <option>Quality issue</option>
                                                    <option>Items was broken/damaged on arrival</option>
                                                    <option>Size fit issue</option>
                                                    <option>color Style issue</option>
                                                    <option>product is defective</option>
                                                    <option>item Missing</option>
                                                    <option>Received Differnet item</option>
                                                    <option>none of the above</option>
                                                </select>
                                           </div>
                                           <div className='w-7/12  '>
                                                   <textarea placeholder='comments' className='w-11/12 border p-4 h-32 rounded focus:outline-none border-gray-300'/>
                                           </div>
                                    </div>
                                    <div className='flex justify-end'>
                                        <button className='w-2/12 bg-green-500 text-white py-1 rounded'>Submit</button>
                                    </div>
                                   
                            </div>
                        
                        
                        </div>}
                    </div>
            </div>
        </div>
    )
}
export default CancelOrderMain