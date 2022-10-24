import PurchaseTable from "./purchaseTable"
import {MobileHouseApi} from "helpers/axiosinstance";
import { useState,useContext,useEffect,useMemo } from "react";
import { Usercontext } from "components/context/userContext";
import { debounce } from 'lodash';


const PurchaseAdd=(props)=>{
 
    const context=useContext(Usercontext )
    const[searchProduct,setsearchProduct]=useState("")
    const[purchaseTable,setpurchaseTable]=useState([])
    const [purchasedetails, setpurchasedetails] = useState({paymentmethod:"cash",invoiceno:"",supplier:""})
    const[suppliers,setsuppliers]=useState("")
    const[searchValue,setsearchValue]=useState("")
    const[productadded,setproductadded]=useState(false)
    const[changeqty,setchangeqty]=useState(false)
    const[remproduct,setremproduct]=useState(false)
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
        formData.append('supplier',purchasedetails.supplier)
        formData.append('paymentMethod',purchasedetails.paymentmethod)
        formData.append('products',JSON.stringify( purchaseTable))
        formData.append('otherexpense',otherexpense)
        formData.append('TaxAmount',TaxAmount)
        formData.append('GrandTotal',GrandTotal)
       
        if(purchaseTable.length!=0)
        {
            MobileHouseApi.post('purchaseupload',formData)
            .then((res)=>{
               if(res.data.success)
               {
                context.notify(res.data.success,"success")
                props.purchaseaddclose()
               }
            })
        }
    }

    const qtychange=(product,qty)=>{
        purchaseTable && purchaseTable.map((item,key)=>{
            if(product.id===item.id)
            {
                    product.taxAmount= (product.purchasePrice * qty  ) * product.GST /100
                    product.netAmount= (product.purchasePrice * qty  ) +(product.purchasePrice * qty ) * product.GST /100
                    item.productqty=qty
                    setchangeqty(!changeqty)
            }
        })
   
    }
    const productAdd=(product)=>{
        product.productqty=1
     
        if(purchaseTable && purchaseTable.some((pro)=>pro.id===product.id)===false)
        {
            product.taxAmount= (product.purchasePrice * 1 ) * product.GST /100
            product.netAmount= (product.purchasePrice * 1 ) +(product.purchasePrice * 1 ) * product.GST /100
            purchaseTable.push(product)
        }
        else
        {
            purchaseTable && purchaseTable.map((item1,key1)=>{
                if(product.id===item1.id)
                {
                    if( item1.productqty+1 > item1.qty)
                    {
                        product.taxAmount= (product.purchasePrice * item1.productqty + 1  ) * product.GST /100
                        product.netAmount= (product.purchasePrice * item1.productqty + 1  ) +(product.purchasePrice * item1.productqty + 1 ) * product.GST /100
                        item1.productqty=item1.productqty + 1 
                    }
                    else
                    {
                        console.log("maxqty reached")
                    }
                  
                }
            })
        }
        setproductadded(true)
        
    }

    const removeproduct=(index)=>{
        
        purchaseTable.splice(index, 1)
        setremproduct(!remproduct)
        console.log(purchaseTable)
    }

    useEffect(()=>{

        if(suppliers==="")
        {
            MobileHouseApi.get('/getSupplier')
            .then((res)=>{
                setsuppliers(res.data.Data)
            })
        }
        if(productadded===true)
        {
            setproductadded(false)
        }
        
    },[productadded,changeqty,remproduct])
    console.log(searchProduct)
    return(
        <div  className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
            <div className="w-11/12 h-fixedNoNav p-3 space-y-4 overflow-auto bg-white">
                <div className=" space-x-2 grid grid-cols-2 md:grid-cols-5 gap-3 ">
                    <div className="text-xs space-y-1">
                        <h1>invoice no</h1>
                        <input onChange={(e)=>setpurchasedetails({...purchasedetails, ['invoiceno'] : e.target.value})} className=" border focus:outline-none border-gray-400 rounded px-2 w-full text-xs py-1" ></input>
                    </div>
                    
                    <div className="text-xs space-y-1">
                        <h1>Payment Type</h1>
                        <select onChange={(e)=>setpurchasedetails({...purchasedetails, ['paymentmethod'] : e.target.value})}  className=" border focus:outline-none border-gray-400 rounded px-2 w-full  text-xs py-1" name="payment type">
                                <option value="cash">cash</option>
                                <option value="credit">credit</option>
                                <option value="UPI">UPI</option>
                        </select>
                    </div>
                   
                    <div className="text-xs space-y-1">
                    <h1>Supplier</h1>
                        <select  onChange={(e)=>setpurchasedetails({...purchasedetails, ['supplier'] : e.target.value})}  className=" border focus:outline-none border-gray-400 rounded px-2 w-full text-xs py-1" name="vendor">
                                <option>-- select --</option>
                                {
                                    suppliers && suppliers.map((item,key)=>{
                                        return(
                                            <option value= {item.id}>{item.supplierName}</option>
                                        )
                                    })
                                }
                               
                               
                        </select>
                    </div>
                    
                </div>
                <div>
                    <div className="space-y-6 md:space-y-0 md:flex space-x-0 md:space-x-2 h-full">
                        <div className="w-full md:w-7/12 overflow-auto">
                             <PurchaseTable
                             purchasetable={purchaseTable}
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
                                                 
                                                  <button onClick={()=>productAdd(item)} className="flex justify-between w-full md:text-base text-xs hover:bg-gray-200  px-1 border-b  py-1 focus:outline-none border-gray-300 ">
                                                      <h1 className="w-7/12 text-sm text-left">{item.name}</h1>
                                                      <h1 className="w-2/12 text-sm">Rs: {item.purchasePrice}</h1>
                                                      <div className="h-full">
                                                      <button className="bg-green-500 md:block hidden text-white px-2  py-1 text-xs rounded tracking-wider font-semibold">ADD+</button>
                                                      <button className="bg-green-500 block md:hidden text-white px-1 tracking-wider font-semibold text-2xl h-8 focus:outline-none ">+</button>
                                                      </div>

                                                  </button>
                                              )
                                          })  
                                          :
                                          <div>
                                              <h1 className="mt-2">no Product found</h1>
                                          </div>
                                        }
                                    </div>}
                                    <button className="bg-gray-600 text-white rounded px-2 py-1">catalaog</button>
                                </div>
                                <div className="border border-gray-400 h-72 rounded">

                                </div>
                                
                        </div>
                             
                    </div>
                </div>
                <div className="w-full md:flex justify-between space-y-5 md:space-y-0">
                    <div className="w-full md:w-5/12">
                        <div className="text-sm space-y-1">
                            <h1>other expense</h1>
                            <input value={otherexpense} onChange={(e)=>setotherexpense(e.target.value)} className="w-8/12 focus:outline-none text-sm py-1 px-2 rounded border border-gray-400" type="number" />
                        </div>
                     
                    </div>
                    <div className="w-full md:w-7/12 flex   justify-start md:justify-end ">
                        <div className="w-full md:w-6/12 flex flex-col justify-between h-56 border border-gray-400 p-2 rounded">
                            {
                                purchaseTable && purchaseTable.map((item,key)=>{
                                    subTotal= +subTotal +(+item.purchasePrice * +item.productqty)
                                    TaxAmount= +TaxAmount + ((+item.purchasePrice* +item.productqty)*item.GST/100)
                                    GrandTotal= +GrandTotal+ ((item.purchasePrice*item.productqty)+ ((+item.purchasePrice* +item.productqty)*item.GST/100))
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
                                            <h1>RS:{otherexpense}</h1>
                                    </div>
                                    
                                </div>
                                <div className="space-y-2  " >
                                    <div className="flex w-full justify-between font-semibold">
                                            <h1>Net Amount</h1>
                                            <h1>RS:{GrandTotal}</h1>
                                    </div>
                                    <div className="space-x-2 flex justify-end">
                                        <button className="px-2 w-5/12 bg-red-500 text-white py-1 rounded font-semibold">Clear</button>
                                        <button  onClick={()=>upload()} className="px-2 w-5/12 bg-green-500 text-white py-1 rounded font-semibold">Checkout</button>
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