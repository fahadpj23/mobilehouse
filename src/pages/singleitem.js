import React, { useState,useEffect } from 'react';
import {MobileHouseApi} from "helpers/axiosinstance";
import SingleItemMain from '../components/SingleItemMain/SingleItemMain'
import { useHistory } from 'react-router-dom';
import MainLayoutWebsite from 'components/MainLayoutWebsite';
import UploadSpinner from 'components/admindashboard/uploadstatus';
const SingleItem=(props)=>{
   

    let history=useHistory();
    const [singleitem, setsingleitem] = useState("")
    const [relateditems, setrelateditems] = useState("")
    const [variants, setvariants] = useState("")
    const [variantchoosed, setvariantchoosed] = useState(false)
    const [categoryVariant, setcategoryVariant] = useState("")
    const [reload, setreload] = useState(false)
    const [pageLoad, setpageLoad] = useState(false)
    
    const search = props.location.search;
    const productId = new URLSearchParams(search).get('productid')
        // if (history.action === 'replace') {
        //     console.log("fdfdf")
        //    }
    //    if (history.action === 'POP') {
    //      setreload(true)
    // setreload(history.action)
 
       
    console.log(history.action)

        if(history.action=="POP" || history.action=="PUSH")
        {
            
            setpageLoad(true)
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
                    setTimeout(() => {
                        setpageLoad(false)
                    }, 300);
                }
                else
                {
                    console.log(res.data.error)
                    setTimeout(() => {
                        setpageLoad(false)
                    }, 300);
                }
            })   
           
        }
     
    const singleitemset=(item1)=>{
      
        console.log(window.addEventListener)
        // setpageLoad(true)
            history.replace({pathname:'singleItem',search: "?" + new URLSearchParams({productid: item1.id}).toString() })
            MobileHouseApi.get(`/singleview`,{params: { productId: item1.id}})
            
            .then(res=>{
                if(res.data.product)
                {
                    const product=res.data.product;
                    
                     setsingleitem(product)
                    // MobileHouseApi.get(`/related`,{params: { category:product.category,variantid:product.variantid}})
                    // .then(res=>{
                    //     setrelateditems(res.data.relatedProduct)
                        
                    // })  
                    // MobileHouseApi.get(`/variantproduct`,{params: { variantid: product.variantid}})
                    // .then(res=>{
                    // setvariants(res.data.variants)
                        
                    // })  
                    // MobileHouseApi.get(`/categoryVariant`,{params: { category:product.category}})
                    // .then(res=>{
                    //     console.log(res.data.categoryVariant)
                    // setcategoryVariant(res.data.categoryVariant)
                        
                    // }) 
                    // setTimeout(() => {
                    //     setpageLoad(false)
                    // }, 300);
                }
                else
                {
                    console.log(res.data.error)
                    // setTimeout(() => {
                    //     setpageLoad(false)
                    // }, 300);
                }
            })   
            setvariantchoosed(true)   

    }
    
   

    useEffect(() => {
   
        if(singleitem=="" )
        {
            setpageLoad(true)  
           
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
                    setTimeout(() => {
                        setpageLoad(false)
                    }, 300);
                    }
                    else
                    {
                        console.log(res.data.error)
                        setTimeout(() => {
                            setpageLoad(false)
                        }, 300);
                      
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
            {pageLoad==true ? 
            <UploadSpinner/>
            :
           <MainLayoutWebsite>
                {singleitem &&<SingleItemMain
                singleitem={singleitem}
                relateditems={relateditems}
                variants={variants}
                singleitemset={singleitemset}
                categoryVariant={categoryVariant}
                /> }
            </MainLayoutWebsite>}
        </div>

    )
}
export default SingleItem