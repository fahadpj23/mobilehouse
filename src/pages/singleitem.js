import React, { useState,useEffect } from 'react';
import MobileHouseApi from '../helpers/axiosinstance';
import SingleItemMain from '../components/SingleItemMain/SingleItemMain'
const SingleItem=(props)=>{
    
    const [singleitem, setsingleitem] = useState("")
    const [relateditems, setrelateditems] = useState("")
    useEffect(() => {
        MobileHouseApi.get(`/singleview`,{params: { productId: props.location.state.itemid}})
        
        .then(res=>{
                const product=res.data;
                setsingleitem(product)
                MobileHouseApi.get(`/related`,{params: { name: product.name, category:product.category,productId:product.id}})
                .then(res=>{
                    setrelateditems(res.data)
                    
                })  
                MobileHouseApi.get(`/variantproduct`,{params: { name: product.name,price :product.price,mrp:product.mrp, category:product.category,productId:product.id}})
                .then(res=>{
                   console.log(res.data)
                    
                })  
        })      
    }, [])
    console.log(singleitem) 
    return(
        <div className="mt-10">
           
            {singleitem!="" &&<SingleItemMain
            singleitem={singleitem}
             relateditems={relateditems}
            /> }
        </div>
    )
}
export default SingleItem