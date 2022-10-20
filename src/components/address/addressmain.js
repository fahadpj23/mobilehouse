
import React, { useContext, useState} from 'react';
import { Usercontext } from '../context/userContext';
import { useHistory } from "react-router-dom";
import {MobileHouseApi} from "helpers/axiosinstance"
import AddressProduct from './addressProduct';
import Login from 'components/Home/login';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
const AddressMain=(props)=>{
    const history = useHistory();
    const context=useContext(Usercontext)

    
    
    const [LoginOpen, setLoginOpen] = useState(false)
    const [Address, setAddress] = useState()

    let item=props.item 
    console.log(item)
    let total=0
    console.log(item)
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()+'  '+today.getHours() + ':'+today.getMinutes();

    
    console.log(props.item)
   
    // props.item.map((item,key)=>{
    //     total=total+item.price*item.qty
    // })

    const LogOpen=(e)=>{
        e.preventDefault();
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        setAddress(e.target)
   
         const data=new FormData(e.target )
         var Address = {};
         data.forEach(function(value, key){
             Address[key] = value;
         });
       
        history.push({ pathname :"/Payment",state:{product:props.item,AddressInfo:JSON.stringify(Address)}});
     
        
    }
    console.log(item)
    return(
        <div>  
        
            
         
        <form id="" onSubmit={(e)=>{  handleSubmit(e)}} method="POST" className="lg:flex h-full lg:h-screen overflow-y-auto">
          
            <div className="w-full lg:w-8/12 h-full lg:h-fixedNoNavlg5 flex flex-col justify-center items-center">
                
                <div className="flex flex-col w-full lg:w-10/12 px-5 ml-0 lg:ml-10 ">
                    <h1 className="text-2xl font-semibold py-7">Add Shipping Address</h1>
                    <div  className="space-y-6">
                        <div className="flex w-full space-x-3 ">
                            <input id="name" name="name" required className="w-6/12 text-xs md:text-sm text-gray-600 border border-gray-400 focus:outline-none focus:border-green-500 rounded-sm py-2 px-2  " placeholder="Name"/>
                            <input id="company" name="company" className="w-6/12 text-xs md:text-sm text-gray-600 border border-gray-400 rounded-sm py-2 px-2 focus:outline-none focus:border-green-500" placeholder=" Company Name(Optional)"/>
                        </div>
                        <div className="flex space-x-3">
                            <input id="phone" name="phone"   pattern="[0-9]{10}" title="Phone Number must be 10 digit" required className="w-6/12 text-xs md:text-sm text-gray-600  border border-gray-400 rounded-sm py-2 px-2 focus:outline-none focus:border-green-500" placeholder="Phone Number"/>
                            <input id="pincode" name="pincode"  required pattern="[0-9]{6}" title="pincode must be 6 digit"   className="w-6/12 text-xs md:text-sm text-gray-600 border border-gray-400 rounded-sm py-2 px-2 focus:outline-none focus:border-green-500" placeholder=" pincode"/>
                        </div>
                        <textarea id="address" name="address" required placeholder="address" className=" text-xs md:text-sm border w-full h-24 focus:outline-none focus:border-green-500 px-2 border-gray-400 rounded-sm">

                        </textarea>
                        {/* <h1 className="w-full text-center bg-green-500 rounded focus:outline-none text-white font-medium py-1 md:py-3">Deliver here</h1> */}
                    </div>
                </div>
            </div>
            <hr className="w-0.5 bg-gray-200 lg:h-screen "></hr>
            <div className="px-5 w-full lg:w-4/12 ">
                <div className="w-full lg:w-10/12 justify-center h-fixedNoNavlg5 flex flex-col ">
                    <div>
                        {/* <h1 className="text-2xl text-green-500 font-semibold flex justify-center underline">Delivery</h1> */}
                        <h1 className="text-lg md:text-xl font-semibold my-5 ">Order Summary</h1>
                        <div className="space-y-2">
                            <h1 className="flex justify-between"><span> Total order</span><span className="text-red-500 pb-5">{ props.item &&  props.item.length}</span></h1>
                            {/* <h1 className="flex justify-between"><span>Delivery charge</span><span className="text-red-500">Free</span></h1> */}
                        </div>
                       
                    </div>
                    <div className='max-h-80 overflow-auto'>
                        <h1 className="text-lg md:text-xl font-semibold my-5 ">Delivery Summary</h1>
                        <div className="space-y-2">
                            {props.item && props.item.map((item1,key)=>{
                                return(
                                    <AddressProduct
                                    product={item1}
                                    />
                            
                                )
                            })} 
                        </div>
                           

                    </div>
                    <div className="space-y-5"> 
                    {props.item && props.item.map((item1,key)=>{
                           total=total +  (+item1.salesPrice ? +item1.salesPrice : +item1.sellingPrice) * (+item1.qty ? +item1.qty : 1)
                        })}   
                        <h1 className=" flex justify-between mt-8 text-lg font-bold"><span >Total Payable</span><span className="text-green-700 ">{total}</span></h1>
                        {/* <Link to={{pathname:"/Payment",state:{product:props.item}}}  className="w-full text-white py-2 focus:outline-none bg-primary">Place Order</Link> */}
                        {/* <Button className="w-full text-white py-2 focus:outline-none bg-primary">Place Order</Button> */}
                        <button type='submit'  className="w-full text-white py-2 focus:outline-none bg-primary">Place Order</button>
                    </div>
                 
                </div>
                
            </div>
                
        </form>
        </div>  
    )
}
export default AddressMain