import ProductTable from "../ProductTable"
import {MobileHouseApi} from "helpers/axiosinstance";
import { useState,useContext,useEffect,useMemo } from "react";
import { Usercontext } from "context/userContext";
import { debounce } from 'lodash';
import { AiOutlineClose } from 'react-icons/ai';

const PurchaseAdd=(props)=>{
 
    const context=useContext(Usercontext )
    const[searchProduct,setsearchProduct]=useState("")
    const[purchaseTable,setpurchaseTable]=useState([])
    const [purchasedetails, setpurchasedetails] = useState({paymentmethod:props.operationitem.paymentMethod??"cash",invoiceno:props.operationitem.invoiceNo??"",invoiceDate:props.operationitem.InvoiceDate??"",supplier:props.operationitem.supplier??""})
    const[suppliers,setsuppliers]=useState("")
    const[productadded,setproductadded]=useState(false)
    const[otherexpense,setotherexpense]=useState(0)
    let GrandTotal=0;
    let subTotal=0;
    let TaxAmount=0;

    //product search
    const ProductSearch=()=>{
        let searchval=document.getElementById('serachinput').value
        MobileHouseApi.get('/purchaseProductSearch',{params:{searchval}})
        .then((res)=>{
          
            setsearchProduct(res.data)
           
        })
        
    }


    const debounceFn= useMemo(() => debounce(ProductSearch, 500), []);

    const upload=()=>{
        let formData = new FormData()
        formData.append('invoiceno',purchasedetails.invoiceno)
        formData.append('invoiceDate',purchasedetails.invoiceDate)
        formData.append('supplier',purchasedetails.supplier)
        formData.append('paymentMethod',purchasedetails.paymentmethod)
        formData.append('products',JSON.stringify( purchaseTable))
        formData.append('otherexpense',otherexpense)
        formData.append('TaxAmount',TaxAmount)
        formData.append('GrandTotal',GrandTotal)
        formData.append('operation',props.operation)
        formData.append('operationId',props.operationitem.id)
       
        if(purchaseTable.length!=0)
        {
            MobileHouseApi.post('purchaseupload',formData,{headers:{accessToken:localStorage.getItem('accessToken')}})
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
        
        //craate a shallow copy and update and set to usestate array(PurchaseTable)
        let productarray=[...purchaseTable]
        productarray && productarray.map((item,key)=>{
            if(product.productId===item.productId)
            {
                    item.subTotal= ((product.price * qty  ) ).tofixed(2)
                    item.taxAmount= ((product.price * qty  ) * product.Tax /100).tofixed(2)
                    item.netAmount= ((product.price * qty  ) +(product.price * qty ) * product.Tax /100).tofixed(2)
                    item.qty=qty

                    // setpurchaseTable(purchaseTable)
                   
            }
        })
        setpurchaseTable(productarray)
        
    
   
    }

     //product add in to purchase table
    const productAdd=(product)=>{

        //set search value as null.for close product suggestion div
        document.getElementById('serachinput').value=""
        //default qty set as 1 to product
        product.qty=1
        
        //check product contain in purchase table using some function.
        if(purchaseTable && purchaseTable.some((pro)=>pro.productId===product.productId)===false)
        {
            product.subTotal= (+product.price  * +product.qty).tofixed(2)
            product.taxAmount= ((+product.price  * +product.Tax /100)).tofixed(2)
            product.netAmount= ((+product.price  * +product.qty  ) +(+product.price * +product.Tax /100)).tofixed(2)
            setpurchaseTable([...purchaseTable,product])
            // purchaseTable.push(product)
        }
        else
        {
        //if product already conatin then qty change
            purchaseTable && purchaseTable.map((item1,key1)=>{
                if(product.productId===item1.productId)
                {
                   
                        product.subTotal= (+product.price * (+item1.qty + 1 ) ) .toFixed(2)
                        product.taxAmount= ((+product.price * +item1.qty + 1  ) * +product.Tax /100).toFixed(2)
                        product.netAmount= ((+product.price * +item1.qty + 1  ) +(+product.price * +item1.qty + 1 ) * +product.Tax /100).toFixed(2)
                        item1.qty=item1.qty + 1 
                                    
                }
            })
        }
     }

    const removeproduct=(index)=>{
        console.log(index)
        // setBillProducts((prevBillProducts:any)=>prevBillProducts.filter((product:any)=>product.id != id))
        setpurchaseTable((prevPurchaseTable)=>prevPurchaseTable.filter((product)=>product.productId!=index))
        // purchaseTable.splice(index, 1)
        // setremproduct(!remproduct)
        console.log(purchaseTable)
    }

    useEffect(()=>{
        if(props.operation)
        {
            MobileHouseApi.get('/getPurchaseProduct',{params:{purchaseId:props.operationitem.id}, headers:{accessToken:localStorage.getItem('accessToken')}})
            .then((res)=>{
               setpurchaseTable(res.data.products)
            })
            .catch((Err)=>console.log(Err))
        }
        if(suppliers==="")
        {
            MobileHouseApi.get('/getSupplier')
            .then((res)=>{
                setsuppliers(res.data.supplier)
            })
        }
   
    },[purchasedetails])
    console.log(purchasedetails)
    return(
        <div  className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-200 fixed top-0">
            <div className="w-11/12 h-fixedNoNav p-3 space-y-4 overflow-auto bg-white relative">
                <button onClick={()=>props.AddWindowClose(false)} className="absolute top-2  right-2"><AiOutlineClose/></button>

                <div className="  grid grid-cols-2 md:grid-cols-5 gap-3 w-8/12 ">
                    <div className="text-xs space-y-1">
                        <h1>invoice no</h1>
                        <input onChange={(e)=>setpurchasedetails({...purchasedetails, ['invoiceno'] : e.target.value})} defaultValue={purchasedetails.invoiceno} className=" border focus:outline-none border-gray-400 rounded px-2 w-full text-xs py-1" ></input>
                    </div>
                    <div className="text-xs space-y-1">
                        <h1>invoice Date</h1>
                        <input type="date" onChange={(e)=>setpurchasedetails({...purchasedetails, ['invoiceDate'] : e.target.value})} defaultValue={purchasedetails.invoiceDate} className=" border focus:outline-none border-gray-400 rounded px-2 w-full text-xs py-1" ></input>
                    </div>
                    
                    <div className="text-xs space-y-1">
                        <h1>Payment Type</h1>
                        <select onChange={(e)=>setpurchasedetails({...purchasedetails, ['paymentmethod'] : e.target.value})} defaultValue={purchasedetails.paymentMethod}  className=" border focus:outline-none border-gray-400 rounded px-2 w-full  text-xs py-1" name="payment type">
                                <option value="cash">cash</option>
                                <option value="credit">credit</option>
                                <option value="UPI">UPI</option>
                        </select>
                    </div>
                   
                    <div className="text-xs space-y-1">
                    <h1>Supplier</h1>
                        <select  onChange={(e)=>setpurchasedetails({...purchasedetails, ['supplier'] : e.target.value})} value={purchasedetails.supplier} className=" border focus:outline-none border-gray-400 rounded px-2 w-full text-xs py-1" name="vendor">
                                <option>-- select --</option>
                                {
                                    suppliers && suppliers.map((item,key)=>{
                                        return(
                                            <option key={key} value={item.id}>{item.supplierName}</option>
                                        )
                                    })
                                }
                               
                               
                        </select>
                    </div>
                    
                </div>
                <div>
                    <div className="space-y-6 md:space-y-0 md:flex space-x-0 md:space-x-2 h-full">
                        <div className="w-full md:w-7/12 overflow-auto">
                             <ProductTable
                             products={purchaseTable}
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
                <div className="w-full md:flex justify-between space-y-5 md:space-y-0">
                    <div className="w-full md:w-3/12">
                        <div className="text-sm space-y-1">
                            <h1>other expense</h1>
                            <input value={otherexpense} onChange={(e)=>setotherexpense(e.target.value)} className="w-8/12 focus:outline-none text-sm py-1 px-2 rounded border border-gray-400" type="number" />
                        </div>
                     
                    </div>
                    <div className="w-full md:w-7/12 flex   justify-start md:justify-end ">
                        <div className="w-full md:w-6/12 flex flex-col justify-between h-56 border border-gray-400 p-2 rounded">
                            {
                                purchaseTable && purchaseTable.map((item,key)=>{
                                    subTotal= +subTotal +(+item.price * +item.qty)
                                    TaxAmount= +TaxAmount + ((+item.price* +item.qty)*item.Tax/100)
                                    GrandTotal= +GrandTotal+ ((item.price*item.qty)+ ((+item.price* +item.qty)*item.Tax/100))
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
        </div>
    )
}
export default PurchaseAdd