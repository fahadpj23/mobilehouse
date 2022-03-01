import { useHistory } from 'react-router-dom';
const SideNav=()=>{
    let history=useHistory();
    return(
       
             <div className=" md:w-3/12 lg:w-1/12 space-y-4 flex flex-col  pl-3  text-white bg-gray-600 h-screen ">
                <button onClick={()=>history.push("/Dashboard")}  className="mt-5 w-full text-left focus:outline-none">DASHBOARD</button>
                <button onClick={()=>history.push("/orders")}  className="mt-5 w-full text-left focus:outline-none">ORDERS</button>
                <button onClick={()=>history.push("/orders")} className="w-full text-left focus:outline-none">PURCHASE</button>
                <button onClick={()=>history.push("/ShopProduct")} className=" w-full text-left focus:outline-none">PRODUCT</button>
                <button  onClick={()=>history.push("/AddProduct")}className=" w-full text-left focus:outline-none">ADD PRODUCT</button>
             </div>
       
    )
}
export default SideNav