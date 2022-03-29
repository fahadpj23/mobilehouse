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
        MobileHouseApi.get(`placeorder`,{params: { productId: props.location.state.itemid}})
        
        .then(res=>{
        let items=[]
        items.push(res.data);

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
                    qty={props.location.state.orderqty}
                />
            }
           
        </div>
    )
}
export default Address