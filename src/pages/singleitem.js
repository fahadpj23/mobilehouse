import React, { useState,useEffect } from 'react';
import MobileHouseApi from '../helpers/axiosinstance';
import SingleItemMain from '../components/SingleItemMain/SingleItemMain'
import { useHistory } from 'react-router-dom';
const SingleItem=(props)=>{
   

    let history=useHistory();
    const [singleitem, setsingleitem] = useState("")
    const [relateditems, setrelateditems] = useState("")
    const [variants, setvariants] = useState("")
    const [variantchoosed, setvariantchoosed] = useState(false)


     
    const singleitemset=(item1)=>{
        console.log(item1)
            MobileHouseApi.get(`/singleview`,{params: { productId: item1.id}})
            
            .then(res=>{
                    const product=res.data;
                    setsingleitem(product)
                    MobileHouseApi.get(`/related`,{params: { name: product.name, category:product.category,productId:product.id}})
                    .then(res=>{
                        setrelateditems(res.data)
                        
                    })  
                    MobileHouseApi.get(`/variantproduct`,{params: { name: product.name,price :product.price,mrp:product.mrp, category:product.category,productId:product.id}})
                    .then(res=>{
                    setvariants(res.data)
                        
                    })  
            })   
            setvariantchoosed(true)   

    }

    useEffect(() => {
        if(singleitem=="")
        {
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
                    setvariants(res.data)
                        
                    })  
            })
        }  
        if(variantchoosed==true)
        {
            setvariantchoosed(false)
        }   
    }, [variantchoosed])
   
    return(
        <div className="mt-10">
           
            {singleitem!="" &&<SingleItemMain
            singleitem={singleitem}
             relateditems={relateditems}
             variants={variants}
             singleitemset={singleitemset}
            /> }
        </div>
    )
}
export default SingleItem