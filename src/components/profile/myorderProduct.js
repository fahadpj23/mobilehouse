const MyorderProduct=(props)=>{
    return(
        <div className="w-full md:w-10/12 border border-gray-400 p-5 rounded ">
            <div className="space-y-7">
                <div className="flex space-x-8">
                    <div className=" flex items-start">
                    <   img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.item.image}`} alt="" className=" overflow-hidden h-20 md:h-32  w-20 md:w-32 object-fill"/>

                    </div>
                    <div className="w-10/12 space-y-1 flex flex-col justify-center">
                            <h1 className="font-bold  text-sm md:text-lg">{props.item.name}</h1>
                            <h1 className="text-gray-500 font-semibold text-xs md:text-sm space-x-2"><span>{props.item.customername}</span><span>|</span><span>Thrissur,Kerala</span></h1>
                            <h1 className="text-gray-500 font-semibold text-xs md:text-sm space-x-0 sm:space-x-2 flex   "><span>{props.item.date}</span><span className="hidden sm:flex">|</span><span>Order ID : {props.item.orderid}</span></h1>
                    </div>
                </div>
                <div className="flex justify-between">
                        <div className="space-y-1">
                            <h1 className="text-gray-500 font-semibold text-xs md:text-sm">Payment</h1>
                            <h1 className="font-semibold text-xs md:text-sm">{props.item.Total}Rs</h1>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-gray-500 font-semibold text-xs md:text-sm">Product ID</h1>
                            <h1 className="font-semibold text-xs md:text-sm">{props.item.productid}</h1>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-gray-500 font-semibold text-xs md:text-sm">qty</h1>
                            <h1 className="font-semibold text-xs md:text-sm">1</h1>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-gray-500 font-semibold text-xs md:text-sm">Order Status</h1>
                            <h1 className="font-bold text-green-700 text-xs md:text-sm">{props.item.status==1 ? "Pending" : props.item.status==2 ? "Packed" : props.item.status==3 ? "Delivered" : "Received"}</h1>
                        </div>
                </div>
            </div>
           
        </div>
    )
}
export default MyorderProduct