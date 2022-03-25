import SingleProduct from '../Home/singleProducts'
import SideNav from '../admindashboard/sideNav'
const AllProduct=(props)=>{
    console.log(props.product)
    return(
        <div className="w-full flex ">
             <SideNav/>
            <div className="w-10/12">
                
            <div className="w-full flex justify-end space-x-3">
                <button className="px-3 py-1 border border-gray-600">DELETE</button>
                <button className="px-3 py-1 border border-gray-600 ">ADD NEW</button>
                   

                </div>
            </div>
        </div>
    )
}
export default AllProduct