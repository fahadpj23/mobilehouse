const MyorderProduct=(props)=>{
    return(
        <div className="w-10/12 border border-gray-400 p-5 rounded ">
            <div className="space-y-7">
                <div className="flex space-x-8">
                    <div className=" flex items-start">
                    <   img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.item.image}`} alt="" className=" overflow-hidden h-32 w-32 object-fill"/>

                    </div>
                    <div className="w-6/12 space-y-1 flex flex-col justify-center">
                            <h1 className="font-bold text-lg">{props.item.name}</h1>
                            <h1 className="text-gray-500 font-semibold text-sm space-x-2"><span>{props.item.customername}</span><span>|</span><span>Thrissur,Kerala</span></h1>
                            <h1 className="text-gray-500 font-semibold text-sm space-x-2"><span>{props.item.date}</span><span>|</span><span>Order ID : {props.item.orderId}</span></h1>
                    </div>
                </div>
                <div className="flex justify-between">
                        <div className="space-y-1">
                            <h1 className="text-gray-500 font-semibold text-sm">Payment</h1>
                            <h1 className="font-semibold">30Rs</h1>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-gray-500 font-semibold text-sm">Product ID</h1>
                            <h1 className="font-semibold">54551</h1>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-gray-500 font-semibold text-sm">qty</h1>
                            <h1 className="font-semibold">1</h1>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-gray-500 font-semibold text-sm">Order Status</h1>
                            <h1 className="font-bold text-green-700">pending</h1>
                        </div>
                </div>
            </div>
           
        </div>
    )
}
export default MyorderProduct