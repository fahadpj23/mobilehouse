import Cartmain from "../components/cart/CartMain"
import { useState,useEffect ,useContext} from "react"
import { Usercontext } from 'components/context/userContext';
import { MobileHouseApi } from "helpers/axiosinstance";
const Cart=()=>{
    const context=useContext(Usercontext)

    return(
        <div>
            
                <Cartmain/>
            
        </div>
    )
}
export default Cart