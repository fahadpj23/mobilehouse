import { Link } from "react-router-dom"
const HomeAds=(props)=>{
    console.log(props)
    return(
        <div className="w-full  p-2">
            <div className="grid grid-cols-3 w-full gap-x-3  ">
            {
                props.Ads && props.Ads.detail?.map((item,key)=>{
                    return(
                    <div className="p-3 space-y-5  shadow-lg border border-gray-200   rounded">
                        <Link  to={{pathname: "/ProductList",search: "?" + new URLSearchParams({type:'Brand',Brand:item.Brand,sort:"newestfirst"}).toString()}}   className="w-full"><img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="ads image" className="object-fill w-full h-64 sm:h-40 md:h-64 overflow-hidden rounded" /></Link> 
                        <div className="flex justify-end">
                            <button className="bg-blue-500 text-white text-sm rounded-lg py-1 px-3 ">Shop Now</button>
                            
                        </div>
                    </div>
                    )

                })
            }
           {/* <Link  to={{pathname: "/ProductList",search: "?" + new URLSearchParams({Brand:"BOAT"}).toString()}}   className=""><img src= "/boat.jpg" alt="ads image" className="object-fill h-72 overflow-hidden" /></Link> 
            <img src= "/vivo-V15.jpg" alt="ads image" className="object-fill h-72 overflow-hidden" />
            <img src= "/slider3.jpg" alt="ads image" className="object-fill h-72 overflow-hidden" /> */}
            </div>
        </div>
    )
}
export default HomeAds