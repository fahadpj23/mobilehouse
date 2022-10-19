

const OrderProductDetails=(props)=>{

    return(

        <div className='space-y-6 md:space-y-0 md:flex '>
            <div className='w-full md:w-8/12 space-y-2'>
                <h1 className='font-semibold text-xl'>Product</h1>
                <div className='flex space-x-5'>
                    <div>
                        <img src={ `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.ProductDetails.image}`} alt="" className=" h-24 md:h-36 w-64 md:w-36  " />
                    </div>
                    <div className='space-y-3'>
                        <h1 className='w-full md:w-8/12 text-sm md:text-base font-semibold'>{props.ProductDetails.name}</h1>
                        <h1>{props.ProductDetails.price}</h1>
                        <h1 className='text-sm'>Seller:Mobile House</h1>
                    </div>
                </div>
            </div>
            <div className='space-y-2 w-full md:w-4/12'>
                <h1 className='font-semibold text-lg underline'>Delivery Address & Phone Number</h1>
                <h1 className='font-semibold mt-5' >{props.ProductDetails.customername}</h1>
                <h1 className='text-gray-500 text-sm'>{props.ProductDetails.address}</h1>
                <h1 className='text-gray-500  text-sm'>{props.ProductDetails.phone}</h1>
                <h1 className='text-gray-500  text-sm'>{props.ProductDetails.pincode}</h1>
                <button className='bg-green-500 text-white px-2 py-1 text-sm rounded '>Change</button>
            </div>
        </div>
    )
}
export default OrderProductDetails