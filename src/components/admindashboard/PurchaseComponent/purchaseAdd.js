import PurchaseTable from "./purchaseTable"
import MobileHouseApi from "../../../helpers/axiosinstance"
import { useState } from "react"
const PurchaseAdd=(props)=>{
 
    const[searchProduct,setsearchProduct]=useState("")
    const[searchValue,setsearchValue]=useState("")
    let GrandTotal=0;
    let subTotal=0;
    let TaxAmount=0;

    //product search
    const ProductSearch=(searchelement)=>{
        setsearchValue(searchelement)
        MobileHouseApi.get('/purchaseProductSearch',{params:{searchelement}})
        .then((res)=>{
          
            setsearchProduct(res.data)
           
        })
    }

    const productAdd=(product)=>{
        product.productqty=1
     
        if(props.purchasetable.some((pro)=>pro.id==product.id)==false)
        {
            props.purchasetable.push(product)
        }
        else
        {
            props.purchasetable.map((item1,key1)=>{
                if(product.id==item1.id)
                {

                    item1.productqty+1 > item1.qty ?console.log("maxqty reached") : item1.productqty=item1.productqty + 1 
                }
            })
        }
        console.log(props.purchasetable)
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
                                    {searchValue && <div className="absolute top-8 w-full space-y-2  p-2 -left-2 h-96 shadow-xl bg-gray-200 overflow-auto">
                                        {
                                          searchProduct && 
                                          searchProduct.products ?
                                          searchProduct.products.map((item,key)=>{
                                              return(
                                                 
                                                  <button onClick={()=>productAdd(item)} className="flex justify-between w-full hover:bg-gray-300 py-1 px-1 ">
                                                      <h1>{item.name}</h1>
                                                      <h1>{item.price}</h1>
                                                      <button className="bg-green-500 text-white px-2 text-sm py-1 tracking-wider font-semibold">ADD+</button>

                                                  </button>
                                              )
                                          })  
                                          :
                                          <div>
                                              <h1 className="mt-2">no Product found</h1>
                                          </div>
                                        }
                                    </div>}
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
                            {
                                props.purchasetable.map((item,key)=>{
                                    subTotal= +subTotal +(+item.price* +item.qty)
                                    TaxAmount= +TaxAmount + ((+item.price* +item.qty)*item.GST/100)
                                    GrandTotal= +GrandTotal+ ((item.price*item.qty)+ ((+item.price* +item.qty)*item.GST/100))
                                })
                            }
                                <div className="text-sm  space-y-2" >
                                    <div className="flex w-full justify-between">
                                            <h1>subtotoal</h1>
                                            <h1>RS:{subTotal}</h1>
                                    </div>
                                    <div className="flex w-full justify-between">
                                            <h1>tax amount</h1>
                                            <h1>RS:{TaxAmount}</h1>
                                    </div>
                                    <div className="flex w-full justify-between">
                                            <h1>otherexpense</h1>
                                            <h1>RS:545</h1>
                                    </div>
                                    
                                </div>
                                <div className="space-y-2  " >
                                    <div className="flex w-full justify-between font-semibold">
                                            <h1>Net Amount</h1>
                                            <h1>RS:{GrandTotal}</h1>
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