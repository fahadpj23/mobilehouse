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
    const search = props.location.search;
    const productId = new URLSearchParams(search).get('productid')
  



     
    const singleitemset=(item1)=>{
        console.log(item1)
            MobileHouseApi.get(`/singleview`,{params: { productId: item1.id}})
            
            .then(res=>{
                    const product=res.data.product;
                    
                    setsingleitem(product)
                    MobileHouseApi.get(`/related`,{params: { name: product.name, category:product.category,productId:product.id}})
                    .then(res=>{
                        setrelateditems(res.data)
                        
                    })  
                    MobileHouseApi.get(`/variantproduct`,{params: { variantid: product.variantid}})
                    .then(res=>{
                    setvariants(res.data)
                        
                    })  
            })   
            setvariantchoosed(true)   

    }

    useEffect(() => {
        if(singleitem=="")
        {
            MobileHouseApi.get(`/singleview`,{params: { productId: productId}})
            
            .then(res=>{
                    const product=res.data.product;
                    console.log(res.data.product)
                    setsingleitem(product)
                    MobileHouseApi.get(`/related`,{params: { name: product.name, category:product.category,productId:product.id}})
                    .then(res=>{
                        setrelateditems(res.data)
                        
                    })  
                    MobileHouseApi.get(`/variantproduct`,{params: { variantid: product.variantid}})
                    .then(res=>{
                    setvariants(res.data.variants)
                        
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
            //  singleitemset={singleitemset}
            /> }
        </div>
    )
}
export default SingleItem