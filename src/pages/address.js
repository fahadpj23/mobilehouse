import AddressMain from '../components/address/addressmain'
import React, { useState,useEffect,useContext } from 'react';
import { Usercontext } from '../components/context/userContext';
import axios from "axios";
import MobileHouseApi from '../helpers/axiosinstance';
const Address=(props)=>{
    const context=useContext(Usercontext)
    const [product, setproduct] = useState("")
    useEffect(() => {
        if(props.location.state.checkouttype)
        {
          let items=[]
          context.cart && context.cart.map((item,key)=>{
              items.push(item)
          })
          setproduct(items)
        }
        else
        {
        MobileHouseApi.get(`orderDetails`,{params: { productId: props.location.state.itemid}})
        
        .then(res=>{
        let items=[]
        items.push(res.data);
        res.data.qty=props.location.state.orderqty
        setproduct(items)

          })  
        }
    }, [])

    console.log(props.location.state)
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