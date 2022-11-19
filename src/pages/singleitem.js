import React, { useState,useEffect } from 'react';
import {MobileHouseApi} from "helpers/axiosinstance";
import SingleItemMain from '../components/SingleItemMain/SingleItemMain'
import { useNavigate ,useParams} from 'react-router-dom';
import MainLayoutWebsite from 'components/MainLayoutWebsite';

const SingleItem=(props)=>{
   
    let {productId}=useParams()
    let navigate=useNavigate();
    const [singleitem, setsingleitem] = useState("")
    
    const [relateditems, setrelateditems] = useState("")
    const [variants, setvariants] = useState("")
    const [categoryVariant, setcategoryVariant] = useState("")
    const [pageLoad, setpageLoad] = useState(false)
   
    
       


     
    const singleitemset=(item1)=>{
      
        
            navigate({pathname:`/singleItem/${item1.id}`, },{replace:true})
           

    }
    
   

    useEffect(() => {
          
      
            window.scrollTo(0, 0)
            setsingleitem("")
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
        
      

    
      
    }, [productId])
   

 
    return(
        <div className="">
            {pageLoad==true ?
                    <MainLayoutWebsite>
                        <div class="  rounded-md p-4  w-full mx-auto">
                    <div class="animate-pulse space-y-7 md:space-y-0 md:flex space-x-4">
                        <div className='w-full md:w-5/12 flex flex-col space-y-5 justify-center items-center h-full'>
                            <div class=" bg-gray-200 h-56 md:h-96 w-56 md:w-96"></div>
                            <div className='flex space-x-5'>
                                <div class=" bg-gray-200 h-20 w-20"></div>
                                <div class=" bg-gray-200 h-20 w-20"></div>
                                <div class=" bg-gray-200 h-20 w-20"></div>
                            </div>
                            <div className='flex space-x-5 justify-between'>
                                
                                <div class=" bg-gray-200 h-10 w-36 md:w-48"></div>
                                <div class=" bg-gray-200 h-10 w-36 md:w-48"></div>
                            </div>
                        </div>
                    
                        <div class="flex-1 flex-col space-y-6 py-1 items-center justify-center h-full space-y-5">
                            <div class="h-4 bg-gray-200  w-52 md:w-96 rounded"></div>
                            <div className='flex space-x-5'>
                                <div class=" bg-gray-200 h-6 w-24"></div>
                                <div class=" bg-gray-200 h-6 w-24"></div>
                                <div class=" bg-gray-200 h-6 w-24"></div>
                            
                            </div>
                            <div className='grid grid-cols-4 gap-5 justify-between w-8/12'>
                                
                                <div class=" bg-gray-200 h-20 w-28"></div>
                                <div class=" bg-gray-200 h-20 w-28"></div>
                                <div class=" bg-gray-200 h-20 w-28"></div>
                                <div class=" bg-gray-200 h-20 w-28"></div>
                                <div class=" bg-gray-200 h-20 w-28"></div>
                            </div>
                            <div className='grid grid-cols-1 gap-16'>
                                <div className='flex space-x-4'>
                                    <div class=" bg-gray-200 h-4 w-32"></div>
                                    <div className='space-y-4'>
                                        <div class=" bg-gray-200 h-4 w-32"></div>
                                        <div class=" bg-gray-200 h-4 w-32"></div>
                                        <div class=" bg-gray-200 h-4 w-32"></div>
                                    </div>
                                </div>
                                <div className='flex space-x-4'>
                                    <div class=" bg-gray-200 h-4 w-32"></div>
                                    <div className='space-y-4'>
                                        <div class=" bg-gray-200 h-4 w-32"></div>
                                        <div class=" bg-gray-200 h-4 w-32"></div>
                                        <div class=" bg-gray-200 h-4 w-32"></div>
                                    </div>
                                </div>
                                <div className='flex space-x-4'>
                                    <div class=" bg-gray-200 h-4 w-32"></div>
                                    <div className='space-y-4'>
                                        <div class=" bg-gray-200 h-4 w-32"></div>
                                        <div class=" bg-gray-200 h-4 w-32"></div>
                                        <div class=" bg-gray-200 h-4 w-32"></div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                </MainLayoutWebsite> 
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