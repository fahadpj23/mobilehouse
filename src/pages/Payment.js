
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { BsCircle } from 'react-icons/bs';
import { MobileHouseApi } from 'helpers/axiosinstance';
import { useState } from 'react';
import AddressProduct from 'components/address/addressProduct';
import { useNavigate } from 'react-router-dom';
const Payment=(props)=>{

    let navigate=useNavigate()
    const [paymentType,setpaymentType]=useState("CashOnDelivery")
    let total=0
    let total1=0
    let product=props.location.state.product && props.location.state.product
    let AddressInfo=props.location.state.AddressInfo && props.location.state.AddressInfo
    console.log(AddressInfo)
    product && product.map((item1,key)=>{
        total=total +  (item1.salesPrice ?? item1.sellingPrice) * (+item1.qty? item1.qty :1)
     })



  
    const cardPayment=()=>{
        let add=JSON.parse(AddressInfo)
        const Formdata=new FormData()
        Formdata.append("total",total)
        Formdata.append('product',JSON.stringify(product)  )
        Formdata.append('Address',JSON.stringify(JSON.parse(AddressInfo))  )
        Formdata.append('PaymentType',paymentType)  
        
       console.log(add)
        
         
        MobileHouseApi.post(`customerOrders`,Formdata,{headers:{UserToken:localStorage.getItem("UserToken")}})
        
        .then(res=>{
            const data=new FormData()
            
            data.append("items",JSON.stringify(product))
            data.append("orderId",res.data.orderId)
           MobileHouseApi.post('/create-checkout-session',data)
           .then((res)=>{
            window.location=res.data.url
           }) 
           
          })  
        
       
      }

      const OrderUpload=()=>{
      
      
   
        // const data=new FormData(AddressInfo.address)
        const data=new FormData()
        data.append("total",total)
        data.append('product',JSON.stringify(product)  )
        data.append('Address',JSON.stringify(JSON.parse(AddressInfo))  )
        data.append('PaymentType',paymentType)  
        
         
        MobileHouseApi.post(`customerOrders`,data,{headers:{UserToken:localStorage.getItem("UserToken")}})
        
        .then(res=>{
                if(res.data.orderId)
                {

                 navigate({ pathname :"/OrderSuccess",search : "?"+ new URLSearchParams({orderId    :res.data.orderId}) });
                  
                }
           
          })  
        }
        
    


    return(
        <div>
            <div className="flex h-screen w-screen  justify-center items-center">
                <div className='h-4/5 w-11/12 space-y-10 md:space-y-0 md:flex'>
                <div className="w-full md:w-7/12  flex flex-col justify-between items-center">
                    <div className="flex w-full">
                          
                            <div className='w-full md:w-8/12'>
                                <div className='flex items-center -space-x-1 px-6'>
                                    
                                        <IoIosCheckmarkCircle className='text-2xl text-black z-20'/>
                                    
                                   
                                
                                    <hr className='h-0.5  items-center w-4/12 bg-black'></hr>
                                    
                                        <IoIosCheckmarkCircle className='text-2xl text-black z-20'/>
                                    
                                   
                                    <hr className='h-0.5  items-center w-4/12 bg-black'></hr>
                                        <div className='border border-gray-700 h-5 w-6 z-20 rounded-full flex justify-center  items-center bg-white  '>
                                            <div className='bg-black rounded-full h-3 w-3 '></div>
                                        </div>
                                        {/* <IoIosCheckmarkCircle className='text-2xl text-black z-20'/> */}
                                    
                                  
                                    <hr className='h-0.5  w-4/12 bg-gray-500'></hr>
                                   
                                    <BsCircle className='z-20 bg-white text-xl'/>
                                    
                                    
                                </div>
                                <div className='flex justify-between ml-2 text-sm tracking-wider'>
                                    <h1>Billing</h1>
                                    <h1>Shipping</h1>
                                    <h1 className=''>Payment</h1>
                                    <h1 className=''>checkout</h1>
                                </div>
                            </div>
                            
                        

                    </div>
                    <div className='h-full md:h-2/5 flex space-y-5 flex-col items-center w-full '>
                        <h1 className='text-3xl font-semibold text-left  w-full mt-10 md:mt-0' >Payment</h1>
                        <hr className='w-full  border-y-2 border-gray-500'></hr>
                            <div className="flex flex-col  w-full space-y-5 font-semibold">
                                <div className='space-x-2'>
                                    <input checked="checked" type="radio" id="cash" name="payment"/>
                                    <label onClick={(e)=> setpaymentType("CashOnDelivery")}htmlFor="cash"/>Cash On Delivery<label/>
                                </div>
                                <hr className='w-full  border-y-2 border-gray-500'></hr>
                                {/* <div className='space-x-2'>
                                    <input  onClick={(e)=> setpaymentType("Card")} type="radio" id="card" name="payment"/>
                                    <label htmlFor="card"/>Debit/Credit Card<label/>
                                  
                                </div>
                                <hr className='w-full  border-y-2 border-gray-500'></hr> */}
                            </div>
                    </div>
                    <div className='w-full flex justify-between text-sm mt-5 md:mt-0 '>
                        <button className='bg-black text-white px-2 py-1 w-4/12 md:w-3/12  xl:w-1/12 tracking-wider font-semibold rounded'>BACK</button>
                       
                        <button onClick={()=>paymentType=="Card" ?  cardPayment() : OrderUpload()} className='bg-yellow-500 text-white px-2 py-1 tracking-wider font-semibold rounded'>CONTINUE</button>
                    </div>
                  
                </div>
                <div className="w-full md:w-5/12">
                        {
                            product && product.map((item,key)=>{

                                return(
                                    <div key={key}>
                                           <AddressProduct
                                            product={item}
                                            />
                                    </div>
                             
                                )
                            })
                        }
                </div>
            </div>
            </div>
        </div>
    )
}
export default Payment