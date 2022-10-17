import AddressMain from '../components/address/addressmain'
import React, { useState,useEffect,useContext } from 'react';
import { Usercontext } from '../components/context/userContext';
import {MobileHouseApi} from "helpers/axiosinstance";

const Address=(props)=>{
    const context=useContext(Usercontext)
    const search = props.location.search;
    const productId = new URLSearchParams(search).get('productId')
    const CheckoutType=new URLSearchParams(search).get('CheckoutType')
    const [product, setproduct] = useState("")
    useEffect(() => {

        if(CheckoutType=="Single")
        {
            
            MobileHouseApi.get('/getSingleProductDetailsCheckout',{params:{productId:productId}})
            .then((res)=>{
                    
                    setproduct(res.data.product)
            })
            .catch(error=>{
                console.log(error)
            })
        }
      
        if(CheckoutType=="Cart")
        {
          let items=[]
          context.cart && context.cart.map((item,key)=>{
              items.push(item)
          })
          setproduct(items)
        }
        // else
        // {
        // MobileHouseApi.get(`customerorderdetails`,{params: { productId: productId}})
        
        // .then(res=>{
        // let items=[]
        // items.push(res.data);
        // res.data.qty=orderqty
        // setproduct(items)
        // console.log(res.data)

        //   })  
        //  }
    }, [])

   
    return(
        <div>
              
                    {product!="" &&
                        <AddressMain
                            item={product}
                        
                        />
                    }
         
        </div>
    )
}
export default Address