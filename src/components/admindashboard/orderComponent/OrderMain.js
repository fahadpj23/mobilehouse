import axios from "axios"
import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import  { mobilehouseApi } from "../../../axiosinstance";
import SideNav from "../sideNav";
const OrderMain=()=>{
    let history=useHistory();
    const [orderitems, setorderitems] = useState("")
useEffect(() => {
    mobilehouseApi.get(`orderdetails`)    
        .then(res=>{
        
            setorderitems(res.data)
          })  
}, [])


    return(
        <div className="flex">
        <SideNav/>
        <div className="w-9/12 lg:w-10/12 overflow-auto">
        <div className="ml-6">
            <h1 className="text-2xl  text-green-500 font-semibold">Orders</h1>
            <table className="min-w-full mt-5">
                <tr>
                    <th>Sl NO</th>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Item ID</th>
                    <th>Order Item</th>
                    <th>qty</th>
                    <th>Order Date</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Deliver Status</th>

                </tr>
                {
                    orderitems!="" && orderitems.map((item,key)=>{
                        return(
                            <tr className="text-center">
                                <td>{key+1}</td>
                                <td>{item.orderid}</td>
                                <td>{item.customername}</td>
                                <td>{item.productid}</td>
                                <td>{item.productname}</td>
                                <td>{item.qty}</td>
                                <td>{item.date}</td>
                                <td>{item.price}</td>
                                <td>{item.total}</td>
                                <td>pending</td>
                             </tr>
                        )
                    })
                }
                
            </table>
        </div>
        </div>
    </div>
        
    )
}
export default OrderMain