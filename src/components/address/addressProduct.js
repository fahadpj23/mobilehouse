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
            <div className="">
                
                <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${productImage[0]}`} alt="" className=" overflow-hidden h-24 w-28 object-fill"/>

            </div>
            <div>
                <h1>{item.name}</h1>
                <h1>Standard Delivery</h1>
                <h1>Rs:      {item.salesPrice!=0 ? item.salesPrice : item.seliingPrice}</h1>
                <h1>qty:     {item.qty}</h1>
            </div>
        
        </div>
    )
}
export default AddressProduct