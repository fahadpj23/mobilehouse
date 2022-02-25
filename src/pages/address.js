import AddressMain from '../components/address/addressmain'
import React, { useState,useEffect,useContext } from 'react';
import { Usercontext } from '../components/context/userContext';
import axios from "axios";
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
        axios.get(`http://localhost:9000/placeorder`,{params: { product: props.location.state.itemid,type:props.location.state.itemtype}})
        
        .then(res=>{
        const product=res.data;

        setproduct(product)

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