
import SimpleSlider from "../components/Home/slider";
import Nav from "../components/Home/Nav"

import axios from 'axios' 
import  MobileHouseApi from "../helpers/axiosinstance"
import React, { useState,useEffect ,useContext} from 'react';
import ProductSlider from "../components/Home/productSlick";
import {AuthContext} from '../helpers/authcontext'
function Home() {
 
  const [products, setproducts] = useState("")
  const AuthCon=useContext(AuthContext)
  console.log(AuthCon)
 
  useEffect(() => {
         
          MobileHouseApi.get("/getProducts")
        
          .then(res=>{
          const product=res.data;
          console.log(res.data)
          setproducts(res.data)
          
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
                      {products!="" && <ProductSlider
                      
                       items={products}
                       Heading="Mobile Covers"            
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
