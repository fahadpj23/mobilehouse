import { Link } from "react-router-dom"
const HomeAds=(props)=>{
    console.log(props)
    return(
        <div className="w-full">
            <div className="grid grid-cols-3 w-full gap-x-3 ">
            {
                props.Ads && props.Ads.detail?.map((item,key)=>{
                    return(
                    <Link  to={{pathname: "/ProductList",search: "?" + new URLSearchParams({Brand:item.Brand,sort:"newestfirst"}).toString()}}   className="w-full"><img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="ads image" className="object-fill w-full h-64 sm:h-40 md:h-64 overflow-hidden rounded" /></Link> 
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