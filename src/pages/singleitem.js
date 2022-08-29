import React, { useState,useEffect } from 'react';
import {MobileHouseApi} from "helpers/axiosinstance";
import SingleItemMain from '../components/SingleItemMain/SingleItemMain'
import { useHistory } from 'react-router-dom';
import MainLayoutWebsite from 'components/MainLayoutWebsite';
const SingleItem=(props)=>{
   

    let history=useHistory();
    const [singleitem, setsingleitem] = useState("")
    const [relateditems, setrelateditems] = useState("")
    const [variants, setvariants] = useState("")
    const [variantchoosed, setvariantchoosed] = useState(false)
    const [categoryVariant, setcategoryVariant] = useState("")
    const [reload, setreload] = useState(false)
  
    const search = props.location.search;
    const productId = new URLSearchParams(search).get('productid')
        // if (history.action === 'replace') {
        //     console.log("fdfdf")
        //    }
    //    if (history.action === 'POP') {
    //      setreload(true)
    // setreload(history.action)
 
       
    console.log(history.action)

        if(history.action=="POP" || history.action=="REPLACE")
        {
            
            console.log("111111111111")  
            history.action="dsds"
            MobileHouseApi.get(`/singleview`,{params: { productId: productId}})
            
            .then(res=>{
                  if(res.data.product)
                    {
                    const product=res.data.product;
                    console.log(product)
                    setsingleitem(product)
                    MobileHouseApi.get(`/related`,{params: {  category:product.category,variantid:product.variantid}})
                    .then(res=>{
                        setrelateditems(res.data.relatedProduct)
                        
                    })  
                    MobileHouseApi.get(`/variantproduct`,{params: { variantid: product.variantid}})
                    .then(res=>{
                    setvariants(res.data.variants)
                        
                    })  
                    MobileHouseApi.get(`/categoryVariant`,{params: { category:product.category}})
                    .then(res=>{
                        console.log(res.data.categoryVariant)
                    setcategoryVariant(res.data.categoryVariant)
                        
                    })  
                }
                else
                {
                    console.log(res.data.error)
                }
            })   
           
        }
     
    const singleitemset=(item1)=>{
      
        console.log(window.addEventListener)
            history.replace({pathname:'singleItem',search: "?" + new URLSearchParams({productid: item1.id}).toString() })
            MobileHouseApi.get(`/singleview`,{params: { productId: item1.id}})
            
            .then(res=>{
                if(res.data.product)
                {
                    const product=res.data.product;
                    
                    setsingleitem(product)
                    MobileHouseApi.get(`/related`,{params: { category:product.category,variantid:product.variantid}})
                    .then(res=>{
                        setrelateditems(res.data.relatedProduct)
                        
                    })  
                    MobileHouseApi.get(`/variantproduct`,{params: { variantid: product.variantid}})
                    .then(res=>{
                    setvariants(res.data.variants)
                        
                    })  
                    MobileHouseApi.get(`/categoryVariant`,{params: { category:product.category}})
                    .then(res=>{
                        console.log(res.data.categoryVariant)
                    setcategoryVariant(res.data.categoryVariant)
                        
                    })  
                }
                else
                {
                    console.log(res.data.error)
                }
            })   
            setvariantchoosed(true)   

    }
    
   

    useEffect(() => {
   
        if(singleitem=="" )
        {
            console.log("2222222222")  
           
            MobileHouseApi.get(`/singleview`,{params: { productId: productId}})
            
            .then(res=>{
                    if(res.data.product)
                    {
                    const product=res.data.product;
                   
                    setsingleitem(product)
                    MobileHouseApi.get(`/related`,{params: { category:product.category,variantid:product.variantid}})
                    .then(res=>{
                        setrelateditems(res.data.relatedProduct)
                        
                    })  
                    MobileHouseApi.get(`/variantproduct`,{params: { variantid: product.variantid}})
                    .then(res=>{
                    setvariants(res.data.variants)
                        
                    }) 
                    MobileHouseApi.get(`/categoryVariant`,{params: { category:product.category}})
                    .then(res=>{
                        console.log(res.data.categoryVariant)
                        setcategoryVariant(res.data.categoryVariant)
                        
                    })
                    }
                    else
                    {
                        console.log(res.data.error)
                    }   
            })
        }
      

    
        if(variantchoosed==true)
        {
            setvariantchoosed(false)
        }   
    }, [variantchoosed,reload])
   
    return(
        <div className="">
           <MainLayoutWebsite>
                {singleitem &&<SingleItemMain
                singleitem={singleitem}
                relateditems={relateditems}
                variants={variants}
                singleitemset={singleitemset}
                categoryVariant={categoryVariant}
                /> }
            </MainLayoutWebsite>
        </div>

    )
}
export default SingleItem