import AddressMain from '../components/address/addressmain'
import React, { useState,useEffect,useContext } from 'react';
import { Usercontext } from '../context/userContext';
import {MobileHouseApi} from "helpers/axiosinstance";

import { useSearchParams } from "react-router-dom";
    
const Address=(props)=>{
  

    let [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams)
    // const productId = new URLSearchParams(search).get('productId')
    // let {productId}=useParams()
    // useEffect(() => {

    //     if(CheckoutType=="Single")
    //     {
            
    //         MobileHouseApi.get('/getSingleProductDetailsCheckout',{params:{productId:productId}})
    //         .then((res)=>{
                    
    //                 setproduct(res.data.product)
    //         })
    //         .catch(error=>{
    //             console.log(error)
    //         })
    //     }
      
    //     if(CheckoutType=="Cart")
    //     {
    //       let items=[]
    //       context.cart && context.cart.map((item,key)=>{
    //           items.push(item)
    //       })
    //       setproduct(items)
    //     }
    //     // else
    //     // {
    //     // MobileHouseApi.get(`customerorderdetails`,{params: { productId: productId}})
        
    //     // .then(res=>{
    //     // let items=[]
    //     // items.push(res.data);
    //     // res.data.qty=orderqty
    //     // setproduct(items)
    //     // console.log(res.data)

    //     //   })  
    //     //  }
    // }, [])

   
    return(
        <div>
              
                    {/* {product!="" &&
                        <AddressMain
                            item={product}
                        
                        />
                    } */}
         
         <h1>dsds</h1>
         
        </div>
    )
}
export default Address