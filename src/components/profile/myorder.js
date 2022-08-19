import MyorderProduct from "./myorderProduct"
import { useEffect ,useState} from "react"
import { MobileHouseApi } from "helpers/axiosinstance"
const Myorder=()=>{

    const [MyOrder, setMyOrder] = useState("")

    useEffect(()=>{
        MobileHouseApi.get('/MyOrderDetails')
        .then((res)=>{
            setMyOrder(res.data.MyOrder)
        })
    },[])

    return(
        <div className="space-y-3">
            { MyOrder&&
                MyOrder.map((item,key)=>{
                    return(
                        <div>
                            <MyorderProduct
                            item={item}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Myorder