import AddressMain from '../components/address/addressmain'
import React, { useState,useEffect } from 'react';
import axios from "axios";
const Address=(props)=>{

    const [product, setproduct] = useState("")
    useEffect(() => {
        axios.get(`http://localhost:9000/placeorder`,{params: { product: props.location.state.itemid,type:props.location.state.itemtype}})
        
        .then(res=>{
        const product=res.data;
        setproduct(product[0])

          })  
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