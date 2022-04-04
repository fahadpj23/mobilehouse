import SingleProduct from "../Home/singleProducts"
const ProductListMain=(props)=>{
    return(
        <div className="grid grid-cols-6 gap-4 p-5">
            {
                props.products.map((item,key)=>{
                    return(
                        <SingleProduct
                        item={item}
                        />
                    )
                    
                })
            }
        </div>
    )
}
export default ProductListMain