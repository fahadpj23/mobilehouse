import { Link } from "react-router-dom"
const Ads=()=>{
    return(
        <div className="w-full">
            <div className="grid grid-cols-3 w-full gap-x-3 ">

           <Link  to={{pathname: "/ProductList",search: "?" + new URLSearchParams({Brand:"BOAT"}).toString()}}   className=""><img src= "/boat.jpg" alt="ads image" className="object-fill h-72 overflow-hidden" /></Link> 
            <img src= "/vivo-V15.jpg" alt="ads image" className="object-fill h-72 overflow-hidden" />
            <img src= "/slider3.jpg" alt="ads image" className="object-fill h-72 overflow-hidden" />
            </div>
        </div>
    )
}
export default Ads