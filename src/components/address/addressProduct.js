const AddressProduct=(props)=>{
    let item=props.product;
    let images=[];
    let productImage=[];
    console.log(props)
    return(
        <div  className="space-y-3 flex space-x-3">
            <div className=" flex items-center">
                
                <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="" className=" overflow-hidden h-16 w-16 object-fill"/>

            </div>
            <div>
                <h1 className=" text-sm md:text-base font-semibold">{item.name}</h1>
                <h1 className="text-xs">Standard Delivery</h1>
                <h1  className="text-sm font-semibold">Rs:      {item.salesPrice ? item.salesPrice : item.seliingPrice}</h1>
                <h1  className="text-sm font-semibold">qty:     {item.qty??1}</h1>
            </div>
        
        </div>
    )
}
export default AddressProduct