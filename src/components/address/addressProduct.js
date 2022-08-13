const AddressProduct=(props)=>{
    let item=props.product;
    let images=[];
    let productImage=[];
    if(item.image)
     {
        images=item.image.split(';')
     }
     images && images.map((item,key)=>{
        item && productImage.push(item.replace(/^\s+|\s+$/gm,''))
    })
    return(
        <div  className="space-y-3 flex space-x-3">
            <div className=" flex items-center">
                
                <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${productImage[0]}`} alt="" className=" overflow-hidden h-16 w-16 object-fill"/>

            </div>
            <div>
                <h1 className=" text-sm md:text-base font-semibold">{item.name}</h1>
                <h1 className="text-xs">Standard Delivery</h1>
                <h1  className="text-sm font-semibold">Rs:      {item.salesPrice!=0 ? item.salesPrice : item.seliingPrice}</h1>
                <h1  className="text-sm font-semibold">qty:     {item.qty}</h1>
            </div>
        
        </div>
    )
}
export default AddressProduct