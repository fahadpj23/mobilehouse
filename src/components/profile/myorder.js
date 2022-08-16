import MyorderProduct from "./myorderProduct"
const Myorder=()=>{
    return(
        <div className="space-y-3">
            {
                [...Array(10)].map((item,key)=>{
                    return(
                        <div>
                            <MyorderProduct/>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Myorder