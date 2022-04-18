import { Link } from 'react-router-dom';
const OrderSuccess=(props)=>{
    console.log(props.location.state.orderID)
    return(
        <div  className="h-screen w-screen flex items-center justify-center flex-col bg-gray-100 space-y-4">
            <img src="./ordersuccess.png" alt="order success" />
            <h1 className="text-2xl">your order {props.location.state.orderID} has been Processed</h1>
            <Link  to={{pathname: "/"}} className=" w-1/12 bg-blue-500 px-3 py-1 text-center text-white font-semibold tracking-wider rounded">HOME</Link>
        </div>
    )
}
export default OrderSuccess