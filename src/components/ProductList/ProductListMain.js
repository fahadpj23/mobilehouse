import SingleProduct from "../Home/singleProducts"
import Nav from "components/Home/Nav"
const ProductListMain=(props)=>{
    return(
        <div className="">
            <Nav/>
            <div className="p-5">
                <div className="flex justify-end w-full">
                    <select className="border  border-gray-400 rounded-lg px-2 text-sm font-semibold py-1 focus:outline-none  ">
                        <option>Newest First</option>
                        <option>Popularity</option>
                        <option>Price-Low to High</option>
                        <option>Price-High To Low</option>
                    </select>
                </div>

            
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-5">
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
                </div>
           
        </div>
       
    )
}
export default ProductListMain