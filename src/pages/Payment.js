
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { BsCircle } from 'react-icons/bs';
import { MobileHouseApi } from 'helpers/axiosinstance';
import AddressProduct from 'components/address/addressProduct';
const Payment=(props)=>{
    let product=props.location.state.product && props.location.state.product
    const cardPayment=()=>{

        product.qty=1
        const data=new FormData()
    
        data.append("items",JSON.stringify(product))
       MobileHouseApi.post('/create-checkout-session',data)
       .then((res)=>{
        window.location=res.data.url
       })
      }
      console.log(product)
    return(
        <div>
            <div className="flex h-screen w-screen  justify-center items-center">
                <div className='h-4/5 w-11/12 flex'>
                <div className="w-7/12  flex flex-col justify-between items-center">
                    <div className="flex w-full">
                          
                            <div className='w-8/12'>
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
                    <div className='h-2/5 flex space-y-5 flex-col items-center w-full '>
                        <h1 className='text-3xl font-semibold text-left  w-full' >Payment</h1>
                        <hr className='w-full  border-y-2 border-gray-500'></hr>
                            <div className="flex flex-col  w-full space-y-5 font-semibold">
                                <div className='space-x-2'>
                                    <input type="radio" id="cash" name="payment"/>
                                    <label htmlFor="cash"/>Cash On Delivery<label/>
                                </div>
                                <hr className='w-full  border-y-2 border-gray-500'></hr>
                                <div className='space-x-2'>
                                    <input  onClick={(e)=>e.target.checked==true && cardPayment()} type="radio" id="card" name="payment"/>
                                    <label htmlFor="card"/>Debit/Credit Card<label/>
                                   
                                </div>
                                <hr className='w-full  border-y-2 border-gray-500'></hr>
                            </div>
                    </div>
                    <div className='w-full flex justify-between text-sm '>
                        <button className='bg-black text-white px-2 py-1 w-1/12 tracking-wider font-semibold rounded'>BACK</button>
                        <button className='bg-yellow-500 text-white px-2 py-1 tracking-wider font-semibold rounded'>CONTINUE</button>
                    </div>
                </div>
                <div className="w-5/12">
                        {
                            product && product.map((item,key)=>{
                                return(
                                <AddressProduct
                                product={item}
                                />
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