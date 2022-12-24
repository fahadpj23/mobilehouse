import { Link } from 'react-router-dom';
import MainLayoutWebsite from "Layout/MainLayoutWebsite";
const OrderSuccess=(props)=>{
    // const orderId=new URLSearchParams(window.location.search).get('orderId') && new URLSearchParams(window.location.search('orderId'))
    const orderId = new URLSearchParams(window.location.search).get('orderId') && new URLSearchParams(window.location.search).get('orderId')
    
    return(
        <div>
               
     
                <div  className="h-fixedNoNavlg5 md:h-screen w-full flex items-center justify-center flex-col  space-y-4">
                  
                        <img src="./ordersuccess.png" alt="order success"  className='h-1/5 md:h-56' />
                  
                    <h1 className="text-sm md:text-xl">Your order has been Processed</h1>
                    <h1 className="text-sm md:text-xl">order Id : {orderId && orderId}</h1>
                    <Link  to={{pathname: "/"}} className=" w-6/12 md:w-1/12 bg-blue-500 px-3 py-1 text-center text-white font-semibold tracking-wider rounded">HOME</Link>
                </div>
               
        </div>
    )
}
export default OrderSuccess