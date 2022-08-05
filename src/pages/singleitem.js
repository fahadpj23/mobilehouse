import React, { useState,useEffect } from 'react';
import {MobileHouseApi} from "helpers/axiosinstance";
import SingleItemMain from '../components/SingleItemMain/SingleItemMain'
import { useHistory } from 'react-router-dom';
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
        // if (history.action === 'PUSH') {
        //     console.log("fdfdf")
        //    }
    //    if (history.action === 'POP') {
    //      setreload(true)
    // setreload(history.action)
    console.log(history.action)
       
   

        if(history.action=="POP")
        {
            
            console.log("111111111111")  
            history.action="dsds"
            MobileHouseApi.get(`/singleview`,{params: { productId: productId}})
            
            .then(res=>{
                    const product=res.data.product;
                    
                    setsingleitem(product)
                    MobileHouseApi.get(`/related`,{params: { name: product.name, category:product.category,productId:product.id}})
                    .then(res=>{
                        setrelateditems(res.data)
                        
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
            })   
           
        }
     
    const singleitemset=(item1)=>{
      
        console.log(window.addEventListener)
            history.push({pathname:'singleItem',search: "?" + new URLSearchParams({productid: item1.id}).toString() })
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
                    setvariants(res.data.variants)
                        
                    })  
                    MobileHouseApi.get(`/categoryVariant`,{params: { category:product.category}})
                    .then(res=>{
                        console.log(res.data.categoryVariant)
                    setcategoryVariant(res.data.categoryVariant)
                        
                    })  
            })   
            setvariantchoosed(true)   

    }
    
    

    useEffect(() => {
   
        if(singleitem=="" )
        {
            console.log("2222222222")  
           
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
                    MobileHouseApi.get(`/categoryVariant`,{params: { category:product.category}})
                    .then(res=>{
                        console.log(res.data.categoryVariant)
                        setcategoryVariant(res.data.categoryVariant)
                        
                    })   
            })
        }
      

    
        if(variantchoosed==true)
        {
            setvariantchoosed(false)
        }   
    }, [variantchoosed,reload])
   
    return(
        <div className="">
           
            {singleitem &&<SingleItemMain
             singleitem={singleitem}
             relateditems={relateditems}
             variants={variants}
             singleitemset={singleitemset}
             categoryVariant={categoryVariant}
            /> }
        </div>
    )
}
export default SingleItem