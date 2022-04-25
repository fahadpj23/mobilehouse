import PurchaseTable from "./purchaseTable"
import MobileHouseApi from "../../../helpers/axiosinstance"
import { useState } from "react"
const PurchaseAdd=()=>{
 
    const[searchProduct,setsearchProduct]=useState("")
    const ProductSearch=(searchelement)=>{
        MobileHouseApi.get('/purchaseProductSearch',{params:{searchelement}})
        .then((res)=>{
            setsearchProduct(res.data.products)
        })
    }

    return(
        <div>
            <div className="w-full p-3 space-y-4">
                <div className=" space-x-2 grid grid-cols-5 gap-3">
                    <div>
                        <h1>invoice no</h1>
                        <input className=" border focus:outline-none border-gray-400 rounded px-2 w-full text-sm py-1" placeholder="invoice no"></input>
                    </div>
                    
                    <div>
                        <h1>Payment Type</h1>
                        <select  className=" border focus:outline-none border-gray-400 rounded px-2 w-full  text-sm py-1" name="payment type">
                                <option>cash</option>
                                <option>credit</option>
                        </select>
                    </div>
                   
                    <div>
                    <h1>vendor</h1>
                        <select  className=" border focus:outline-none border-gray-400 rounded px-2 w-full text-sm py-1" name="vendor">
                                <option>--select--</option>
                                <option>nanma</option>
                                <option>tharakan</option>
                        </select>
                    </div>
                    
                </div>
                <div>
                    <div className="flex space-x-2 h-full">
                        <div className="w-7/12">
                             <PurchaseTable/>  
                        </div>
                        <div className="w-5/12 space-y-2">
                                <div className="flex space-x-2 relative ">
                                    <input onChange={(e)=>ProductSearch(e.target.value)} type="text" className=" border rounded px-2  border-gray-400 w-full" placeholder="search item"/>
                                    <div className="absolute top-7 w-full space-y-2 bg-white p-2 -left-1 h-96 overflow-auto">
                                        {
                                          searchProduct && searchProduct.map((item,key)=>{
                                              return(
                                                  <div className="flex justify-between w-full hover:bg-gray-300 py-1 px-1 ">
                                                      <h1>{item.name}</h1>
                                                      <h1>{item.price}</h1>
                                                      <button className="bg-green-500 text-white px-2 text-sm py-1 tracking-wider font-semibold">ADD+</button>

                                                  </div>
                                              )
                                          })  
                                        }
                                    </div>
                                    <button className="bg-gray-400 text-white rounded px-2 py-1">catalaog</button>
                                </div>
                                <div className="border border-gray-400 h-96 rounded">

                                </div>
                                
                        </div>
                             
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <div className="w-5/12">
                        <div>
                            <h1>other expense</h1>
                            <input className="w-8/12 rounded border border-gray-400" type="number" />
                        </div>
                     
                    </div>
                    <div className="w-7/12 flex   justify-end ">
                        <div className="w-6/12 flex flex-col justify-between h-56 border border-gray-400 p-2 rounded">
                                <div className="text-sm  space-y-2" >
                                    <div className="flex w-full justify-between">
                                            <h1>subtotoal</h1>
                                            <h1>RS:545</h1>
                                    </div>
                                    <div className="flex w-full justify-between">
                                            <h1>tax amount</h1>
                                            <h1>RS:545</h1>
                                    </div>
                                    <div className="flex w-full justify-between">
                                            <h1>otherexpense</h1>
                                            <h1>RS:545</h1>
                                    </div>
                                    
                                </div>
                                <div className="space-y-2  " >
                                    <div className="flex w-full justify-between font-semibold">
                                            <h1>Net Amount</h1>
                                            <h1>RS:545</h1>
                                    </div>
                                    <div className="space-x-2 flex justify-end">
                                        <button className="px-2 w-5/12 bg-red-500 text-white py-1 rounded font-semibold">Clear</button>
                                        <button className="px-2 w-5/12 bg-green-500 text-white py-1 rounded font-semibold">Checkout</button>
                                    </div>
                                </div>
                        </div>
                       
                        
                    </div>

                </div>
            </div>
        </div>
    )
}
export default PurchaseAdd