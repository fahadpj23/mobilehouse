import { Link } from 'react-router-dom';
const OrderSuccess=(props)=>{
   
    return(
        <div  className="h-screen w-screen flex items-center justify-center flex-col  space-y-4">
            <img src="./ordersuccess.png" alt="order success" />
            <h1 className="text-2xl">Your order has been Processed</h1>
            <h1 className="text-2xl">order Id : {props.location.state.orderID}</h1>
            <Link  to={{pathname: "/"}} className=" w-1/12 bg-blue-500 px-3 py-1 text-center text-white font-semibold tracking-wider rounded">HOME</Link>
        </div>
    )
}
export default OrderSuccess