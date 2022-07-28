
import React, { useContext, useState} from 'react';
import { Usercontext } from '../context/userContext';
import { useHistory } from "react-router-dom";
import MobileHouseApi from '../../helpers/axiosinstance';
import Paths from 'helpers/path'
const AddressMain=(props)=>{
    const history = useHistory();
    const context=useContext(Usercontext)
    const [name, setname] = useState("")
    const [pincode, setpincode] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    // const [productid, setproductid] = useState(props.item.id)
    // const [productname, setproductname] = useState(props.item.name)
    // const [qty, setqty] = useState(props.qty) 
    // const [total, settotal] = useState(props.item.price*props.qty)

    let item=props.item 
    let total=0
    console.log(item)
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()+'  '+today.getHours() + ':'+today.getMinutes();

    
    console.log(props.item)
   
    // props.item.map((item,key)=>{
    //     total=total+item.price*item.qty
    // })
    const placeorder=()=>{
        
        
       
        let formData = new FormData();
        formData.append('name',name)
        formData.append('pincode',pincode)
        formData.append('phone',phone)
        formData.append('address',address)
        
        formData.append('product',JSON.stringify(item)  )
        // formData.append('qty',qty)
        // formData.append('productname',productname)
        // formData.append('total',total)
        console.log(formData)
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        
        MobileHouseApi.post(`customerOrders`,formData)
        
        .then(res=>{
                if(res.data.orderId)
                {
                    history.push({ pathname :"/OrderSuccess",state:{orderID:res.data.orderId}});
                }
                else
                {
                    res.data.error.map((item,key)=>{
                        if(key===0)
                        {
                            context.notify(` ${item.param} can't be empty`  )
                        }
                    })
                   
                }
        
          
          })  
    }
    return(
        <div className="flex  h-screen overflow-y-auto">
            <div className="w-8/12 h-fixedNoNavlg5 flex flex-col justify-center items-center">
                <div className="flex flex-col w-10/12 px-5 ml-10 ">
                    <h1 className="text-2xl font-semibold py-7">Add Shipping Address</h1>
                    <div className="space-y-6">
                        <div className="flex w-full space-x-3 ">
                            <input onChange={(e)=>setname(e.target.value)} className="w-6/12 text-gray-600 border border-gray-400 focus:outline-none focus:border-green-500 rounded-sm py-2 px-2  " placeholder="Name"/>
                            <input className="w-6/12 text-gray-600 border-2 border-gray-400 rounded-sm py-2 px-2 focus:outline-none focus:border-green-500" placeholder=" Company Name(Optional)"/>
                        </div>
                        <div className="flex space-x-3">
                            <input onChange={(e)=>setphone(e.target.value)}className="w-6/12 text-gray-600  border-2 border-gray-400 rounded-sm py-2 px-2 focus:outline-none focus:border-green-500" placeholder="Phone Number"/>
                            <input onChange={(e)=>setpincode(e.target.value)} className="w-6/12 text-gray-600 border-2 border-gray-400 rounded-sm py-2 px-2 focus:outline-none focus:border-green-500" placeholder=" pincode"/>
                        </div>
                        <textarea onChange={(e)=>setaddress(e.target.value)} placeholder="address" className=" border-2 w-full h-24 focus:outline-none focus:border-green-500 px-2 border-gray-400 rounded-sm">

                        </textarea>
                        <h1 className="w-full text-center bg-green-500 focus:outline-none text-white font-medium py-3">Deliver here</h1>
                    </div>
                </div>
            </div>
            <hr className="w-0.5 bg-gray-200 h-screen "></hr>
            <div className=" ml-5 w-4/12 ">
                <div className="w-10/12 justify-center h-fixedNoNavlg5 flex flex-col ">
                    <div>
                        <h1 className="text-2xl text-green-500 font-semibold flex justify-center underline">Delivery</h1>
                        <h1 className="text-xl font-semibold my-5 ">Order Summary</h1>
                        <div className="space-y-2">
                            <h1 className="flex justify-between"><span> Total order</span><span className="text-red-500">{ props.item &&  props.item.length}</span></h1>
                            <h1 className="flex justify-between"><span>Delivery charge</span><span className="text-red-500">Free</span></h1>
                        </div>
                       
                    </div>
                    <div className='max-h-64 overflow-auto'>
                        <h1 className="text-xl font-semibold my-5 ">Delivery Summary</h1>
                         {props.item && props.item.map((item1,key)=>{
                            return(
                             <div key={key} className="space-y-3 flex space-x-3">
                                <div className="">
                                    {console.log(item1)}
                                    <img src={`${Paths.ImagePath}/${item1.image}`} alt="" className=" overflow-hidden h-24 w-28 object-fill"/>
    
                                </div>
                                <div>
                                    <h1>{item1.name}</h1>
                                    <h1>Standard Delivery</h1>
                                    <h1>Rs:      {item1.salesPrice ?? item1.seliingPrice}</h1>
                                    <h1>qty:     {item1.qty}</h1>
                                </div>
                             
                         </div>
                            )
                        })} 
                           

                    </div>
                    <div className="space-y-5"> 
                    {props.item && props.item.map((item1,key)=>{
                           total=total +  (item1.salesPrice ?? item1.seliingPrice) * +item1.qty
                        })}   
                        <h1 className=" flex justify-between mt-8 text-lg font-semibold"><span >Total Payable</span><span className="text-green-500 ">{total}</span></h1>
                        <button onClick={()=>placeorder()} className="w-full text-white py-2 focus:outline-none bg-primary">Place Order</button>
                    </div>
                 
                </div>
                
            </div>
                
        </div>
    )
}
export default AddressMain