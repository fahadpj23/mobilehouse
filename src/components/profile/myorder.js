import MyorderProduct from "./myorderProduct"
import { useEffect ,useState} from "react"
import { MobileHouseApi } from "helpers/axiosinstance"
import { Link } from "react-router-dom"
const Myorder=()=>{

    const [MyOrder, setMyOrder] = useState("")

    useEffect(()=>{
        MobileHouseApi.get('/MyOrderDetails',{headers:{UserToken:localStorage.getItem("UserToken")}})
        .then((res)=>{
            setMyOrder(res.data.MyOrder)
        })
    },[])

    return(
        <div className="space-y-3">
            { MyOrder&&

                MyOrder.length!=0 ?
                MyOrder.map((item,key)=>{
                    return(
                        <div>
                            <MyorderProduct
                            item={item}
                            />
                        </div>
                    )
                })
                :
                <div className="w-full  flex items-center justify-center">
                    <div className="w-5/12 h-60 space-y-5">

                        <img src="/noOrder.png" alt="no Order image" className="object-contain"/>
                        <div className="space-y-5 w-full flex flex-col justify-center items-center">

                            <h1 className="font-semibold text-xl">NO ORDER FOUND</h1>
                            <h1>Look like you haven't made your order yet</h1>
                            <Link  to={{pathname: "/"}} className=" w-6/12 md:w-3/12 bg-blue-500 px-3 py-1 text-center text-white font-semibold tracking-wider rounded">HOME</Link>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}
export default Myorder