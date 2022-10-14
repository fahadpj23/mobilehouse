
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
        <div className='p-8 w-screen h-screen'>
            <h1 className='flex space-x-1 items-center'><span>MyAccount</span><IoIosArrowForward/><span>MyOrders</span><span><IoIosArrowForward/></span><span>{orderId}</span></h1>

        
            <div className=' flex w-full h-full md:h-3/5  items-center justify-center mt-10'>

                    <div className='w-10/12 h-full border border-gray-300 rounded p-5'>
                        {orderDetails &&
                         <div className='flex flex-col-reverse md:flex-col'>
                            <div className='flex'>
                                    <div className='w-8/12 space-y-2'>
                                        <h1 className='font-semibold text-xl'>Product</h1>
                                        <div className='flex space-x-5'>
                                            <div>
                                                <img src={ `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${orderDetails.image}`} alt="" className=" h-36 w-36 " />
                                            </div>
                                            <div className='space-y-3'>
                                                <h1 className='w-8/12 font-semibold'>{orderDetails.name}</h1>
                                                <h1>{orderDetails.price}</h1>
                                                <h1 className='text-sm'>Seller:Mobile House</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='space-y-2 w-4/12'>
                                        <h1 className='font-semibold text-lg'>Delivery Address & Phone Number</h1>
                                        <h1 className='font-semibold mt-5' >{orderDetails.customername}</h1>
                                        <h1 className='text-gray-500 text-sm'>{orderDetails.address}</h1>
                                        <h1 className='text-gray-500  text-sm'>{orderDetails.phone}</h1>
                                        <h1 className='text-gray-500  text-sm'>{orderDetails.pincode}</h1>
                                        <button className='bg-green-500 text-white px-2 py-1 text-sm rounded '>Change</button>
                                    </div>
                            </div>
                            <div className='md:flex mt-10 '>
                                    <div className='w-6/12'>
                                        <h1 className='fonr-bold text-xl'>Arriving Friday</h1>

                                        <div className='md:flex items-center p-10 w-full'>
                                        
                                            <div className='relative w-full'>
                                                <div className=' w-11/12 h-1 bg-gradient-to-r from-green-500 via-green-500 to-gray-200  flex  items-center absolute top-2.5  '>  </div>                             
                                            
                                                
                                                <div className='absolute top-1 md:flex justify-between w-11/12'>
                                                                <div className='h-4 w-4 rounded-full border border-gray-500 z-20 bg-white '></div>
                                                                <div className='h-4 w-4 rounded-full border border-gray-500 z-20 bg-white'></div>
                                                                <div className='h-4 w-4 rounded-full border border-gray-500 z-20 bg-white'></div>
                                                                <div className='h-4 w-4 rounded-full border border-gray-500 z-20 bg-white'></div>
                                                </div>
                                                <div className='absolute -top-4 text-sm md:flex justify-between w-11/12'>
                                                            <h1>Ordered</h1>
                                                            <h1>Packed</h1>
                                                            <h1>Shipped</h1>
                                                            <h1>Delivered</h1>
                                                </div>
                                                <div className='absolute top-4 text-sm md:flex justify-between w-11/12'>
                                                            <h1>02-02-2022</h1>
                                                            <h1>02-02-2022</h1>
                                                            <h1>02-02-2022</h1>
                                                            <h1>02-02-2022</h1>
                                                </div>
                                            </div>
                                        

                                        
                                        </div>
                                    </div>
                                    <div className='flex space-x-2 items-end justify-end w-6/12'>
                                            <button className='bg-red-500 text-white px-2 py-1 rounded h-8 w-24'>Cancel</button>
                                            <button className=' px-2 py-1  border border-gray-300 h-8 rounded w-24'>Help?</button>
                                    </div>
                                
                                </div>
                        
                        
                        </div>}
                    </div>
            </div>
        </div>
    )
}
export default OrderDetailMain