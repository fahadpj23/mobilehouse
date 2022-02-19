
import SimpleSlider from "../components/Home/slider";
import Nav from "../components/Home/Nav"

import axios from 'axios' 
import  MobileHouseApi from "../helpers/axiosinstance"
import React, { useState,useEffect } from 'react';
import ProductSlider from "../components/Home/productSlick";
function Home() {
  const [coverproducts, setcoverproducts] = useState("")
  const [accessories, setaccessories] = useState("")
  const [headset, setheadset] = useState("")
  const [products, setproducts] = useState("")

 
  useEffect(() => {
         
          MobileHouseApi.get("/cover")
        
          .then(res=>{
          const product=res.data;
          setcoverproducts(product)
          
          })
          MobileHouseApi.get("/accessories")
          .then(res=>{
          const product=res.data;
          setaccessories(product)
          
          })
          MobileHouseApi.get("/headset")
          .then(res=>{
          const product=res.data;
          setheadset(product)
          
          })
        
       
         
        }, [])
        console.log(products)
  return (
    <div>
  
        
        
      <div className= "w-full overflow-hidden ">
        <Nav/>
        <SimpleSlider/>
        <div className="w-full flex flex-col items-center  space-y-2">
            <h1 className="text-2xl font-semibold font-serif">OUR PRODUCTS</h1>
            <p className="font-serif text-xs md:text-base">We package the products with best services to make you a happy customer</p>
            <hr className="w-4/12 md:w-1/12 bg-blue-600 border-2 border-blue-400"></hr>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-11/12 px-6">
                      {coverproducts!="" && <ProductSlider
                      
                       items={coverproducts}
                       Heading="Mobile Covers"            
                      />}
                      {accessories!="" &&<ProductSlider
                       items={accessories}
                       Heading="Mobile Accessories" 
                      />}
                       {headset!="" &&<ProductSlider
                       items={headset}
                       Heading="Mobile Headset" 
                      
                      />}
                     
          </div>
        </div>
       
        <div className="pb-24">
      
       
        </div>
      </div>
      </div>
  );
}

export default Home;
