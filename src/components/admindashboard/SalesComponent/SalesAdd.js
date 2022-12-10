
import {MobileHouseApi} from "helpers/axiosinstance";
import { useState,useContext,useEffect,useMemo } from "react";
import { Usercontext } from "context/userContext";
import { debounce } from 'lodash';
import { AiOutlineClose } from 'react-icons/ai';
import ProductTable from "../ProductTable";
const SalesAdd=(props)=>{
 
    const context=useContext(Usercontext )
    const[searchProduct,setsearchProduct]=useState("")
    const[salesTable,setsalesTable]=useState([])
    const [salesDetails, setsalesDetails] = useState({CustomerName:props.operationitem.CustomerName??"",CustomerPhone:props.operationitem.CustomerPhone??"",PaymentMethod:props.operationitem.PaymentMethod??"cash"})
   

    const[otherexpense,setotherexpense]=useState(0)
    let GrandTotal=0;
    let subTotal=0;
    let TaxAmount=0;

    //product search
    const ProductSearch=()=>{
        let searchval=document.getElementById('serachinput').value
        MobileHouseApi.get('/salesProductSearch',{params:{searchval}})
        .then((res)=>{
          
            setsearchProduct(res.data)
           
        })
        
    }


    const debounceFn= useMemo(() => debounce(ProductSearch, 500), []);

    const upload=()=>{
        let formData = new FormData()
       
        formData.append('customerName',salesDetails.CustomerName)
        formData.append('customerPhone',salesDetails.CustomerPhone)
        formData.append('PaymentMethod',salesDetails.PaymentMethod)
        formData.append('products',JSON.stringify( salesTable))
       
        formData.append('subTotal',subTotal)
        formData.append('TaxAmount',TaxAmount)
        formData.append('GrandTotal',GrandTotal)
        formData.append('operation',props.operation)
        formData.append('operationId',props.operationitem.id)
       
        if(salesTable.length!=0)
        {
            MobileHouseApi.post('salesUpload',formData,{headers:{accessToken:localStorage.getItem('accessToken')}})
            .then((res)=>{
               if(res.data.success)
               {
                context.notify(res.data.success,"success")
                props.AddSucess()
               }
            })
        }
    }



    const qtychange=(product,qty)=>{
        
        //craate a shallow copy and update and set to usestate array(salesTable)
        console.log(qty)
        let productarray=[...salesTable]
        productarray && productarray.map((item,key)=>{
            if(product.productId===item.productId)
            {
                product.subTotal= ((product.price * qty )/(1+(product.Tax/100))).toFixed(2)
                product.taxAmount= ((product.price * qty ) -(product.price * qty )/(1+(product.Tax/100))).toFixed(2)
                product.netAmount= ((product.price * qty )).toFixed(2)
                    item.qty=qty

                    // setsalesTable(salesTable)
                   
            }
        })
        setsalesTable(productarray)
        
    
   
    }

     //product add in to purchase table
    const productAdd=(product)=>{

        //set search value as null.for close product suggestion div
        document.getElementById('serachinput').value=""
        //default qty set as 1 to product
        product.qty=1
        
        //check product contain in purchase table using some function.
        if(salesTable && salesTable.some((pro)=>pro.productId===product.productId)===false)
        {
            product.subTotal= ((product.price * product.qty )/(1+(product.Tax/100))).toFixed(2)
            product.taxAmount= ((product.price * product.qty ) -(product.price * product.qty )/(1+(product.Tax/100))).toFixed(2)
            product.netAmount= ((product.price * product.qty )).toFixed(2)
            setsalesTable([...salesTable,product])
            // salesTable.push(product)
        }
        else
        {
        //if product already conatin then qty change
            salesTable && salesTable.map((item1,key1)=>{
                if(product.productId===item1.productId)
                {
                   
                        product.subTotal= (product.price * (item1.qty + 1 ) ) .toFixed(2)
                        product.taxAmount= ((product.price * item1.qty + 1  ) * product.GST /100).toFixed(2)
                        product.netAmount= ((product.price * item1.qty + 1  ) +(product.price * item1.qty + 1 ) * product.GST /100).toFixed(2)
                        item1.qty=item1.qty + 1 
                                    
                }
            })
        }
     }

    const removeproduct=(index)=>{
        setsalesTable((prevsalesTable)=>prevsalesTable.filter((product)=>product.productId!=index))
       
    }

    useEffect(()=>{
        if(props.operation)
        {
            MobileHouseApi.get('/getSalesProduct',{params:{salesId:props.operationitem.id}, headers:{accessToken:localStorage.getItem('accessToken')}})
            .then((res)=>{
               setsalesTable(res.data.products)
            })
            .catch((Err)=>console.log(Err))
        }
    
        
    },[salesDetails])
    console.log(salesDetails)
    return(
        <div  className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-200 fixed top-0">
            <div className="w-11/12 h-fixedNoNav p-3 space-y-4 overflow-auto bg-white relative">
                <button onClick={()=>props.AddWindowClose(false)} className="absolute top-2  right-2"><AiOutlineClose/></button>

                <div className="  grid grid-cols-2 md:grid-cols-5 gap-3 w-8/12 ">
                    <div className="text-xs space-y-1">
                        <h1>Customer Name</h1>
                        <input onChange={(e)=>setsalesDetails({...salesDetails, ['CustomerName'] : e.target.value})} defaultValue={salesDetails.CustomerName} className=" border focus:outline-none border-gray-400 rounded px-2 w-full text-xs py-1" ></input>
                    </div>
                    <div className="text-xs space-y-1">
                        <h1>Customer Phone</h1>
                        <input onChange={(e)=>setsalesDetails({...salesDetails, ['CustomerPhone'] : e.target.value})} defaultValue={salesDetails.CustomerPhone} className=" border focus:outline-none border-gray-400 rounded px-2 w-full text-xs py-1" ></input>
                    </div>
                    
                    <div className="text-xs space-y-1">
                        <h1>Payment Type</h1>
                        <select onChange={(e)=>setsalesDetails({...salesDetails, ['PaymentMethod'] : e.target.value})} defaultValue={salesDetails.PaymentMethod}  className=" border focus:outline-none border-gray-400 rounded px-2 w-full  text-xs py-1" name="payment type">
                                <option value="cash">cash</option>
                                <option value="credit">credit</option>
                                <option value="UPI">UPI</option>
                        </select>
                    </div>
                   
                    
                    
                </div>
                <div>
                    <div className="space-y-6 md:space-y-0 md:flex space-x-0 md:space-x-2 h-full">
                        <div className="w-full md:w-7/12 overflow-auto">
                             <ProductTable
                             products={salesTable}
                             qtychange={qtychange}
                             removeproduct={removeproduct}
                             />  
                        </div>
                        <div className="w-full md:w-5/12 space-y-2">
                                <div className="flex space-x-2 relative ">
                                    <input id="serachinput" onChange={(e)=>debounceFn()} type="text" className="focus:outline-none border rounded px-2 text-sm border-gray-400 w-full" placeholder="search item"/>
                                    {document.getElementById('serachinput')?.value!="" &&  searchProduct && <div className="absolute top-8 w-full   px-2 -left-2 h-64 shadow-xl bg-gray-50 overflow-auto border border-gray-200">
                                        {
                                          
                                          searchProduct.products ?
                                          searchProduct.products.map((item,key)=>{
                                              return(
                                                 
                                                  <div key={key} onClick={()=>productAdd(item)} className="flex justify-between w-full md:text-base text-xs hover:bg-gray-200  px-1 border-b  py-1 focus:outline-none border-gray-300 ">
                                                      <h1 className="w-7/12 text-sm text-left">{item.name}</h1>
                                                      <h1 className="w-2/12 text-sm">Rs: {item.price}</h1>
                                                      <div className="h-full">
                                                      <button className="bg-green-500 md:block hidden text-white px-2  py-1 text-xs rounded tracking-wider font-semibold">ADD+</button>
                                                      <button className="bg-green-500 block md:hidden text-white px-1 tracking-wider font-semibold text-2xl h-8 focus:outline-none ">+</button>
                                                      </div>

                                                  </div>
                                              )
                                          })  
                                          :
                                          <div>
                                              <h1 className="mt-2">no Product found</h1>
                                          </div>
                                        }
                                    </div>}
                                    <button className="bg-gray-700 text-white rounded px-2 py-1">catalaog</button>
                                </div>
                                <div className="border border-gray-400 h-72 rounded">

                                </div>
                                
                        </div>
                             
                    </div>
                </div>
                
                  
                    <div className="w-full flex justify-end ">
                        <div className="w-full md:w-5/12 flex flex-col justify-between h-56 border border-gray-400 p-2 rounded">
                            {
                                salesTable && salesTable.map((item,key)=>{
                                  
                                    subTotal= +subTotal + +item.subTotal
                                    TaxAmount= +TaxAmount + +item.taxAmount
                                    GrandTotal= +GrandTotal+ +item.netAmount
                                })
                            }
                                <div className="text-xs  space-y-2" >
                                    <div className="flex w-full justify-between">
                                            <h1>Sub Total</h1>
                                            <h1>RS: {(subTotal).toFixed(2)}</h1>
                                    </div>
                                    <div className="flex w-full justify-between">
                                            <h1>Tax Amount</h1>
                                            <h1>RS: {(TaxAmount).toFixed(2)}</h1>
                                    </div>
                                    <div className="flex w-full justify-between">
                                            <h1>Other Expense</h1>
                                            <h1>RS: {(otherexpense).toFixed(2)}</h1>
                                    </div>
                                    
                                </div>
                                <div className="space-y-2  " >
                                    <div className="flex w-full justify-between ">
                                            <h1>Net Amount</h1>
                                            <h1>RS: {(GrandTotal).toFixed(2)}</h1>
                                    </div>
                                    <div className="space-x-2 flex justify-end">
                                        <button className="px-2 w-full bg-red-500 text-white py-1 rounded  tracking-wider">Clear</button>
                                        <button  onClick={()=>upload()} className="px-2 w-full bg-green-700 text-white py-1 rounded  tracking-wider">Checkout</button>
                                    </div>
                                </div>
                        </div>
                       
                        
                    </div>

              
            </div>
        </div>
    )
}
export default SalesAdd