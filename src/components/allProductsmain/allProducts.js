import SingleProduct from '../Home/singleProducts'
const AllProduct=(props)=>{
    console.log(props.product)
    return(
        <div className="w-full flex justify-center">
            <div className="w-10/12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                {props.product && props.product.map((item,key)=>{
                    return(
                        <SingleProduct
                        item={item}
                    />
                    )
                    
                })}

            </div>
        </div>
    )
}
export default AllProduct