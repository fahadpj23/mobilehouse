
import SimpleSlider from "../components/Home/slider";
import Nav from "../components/Home/Nav"

import axios from 'axios' 
import  MobileHouseApi from "../helpers/axiosinstance"
import React, { useState,useEffect ,useContext} from 'react';
import ProductSlider from "../components/Home/productSlick";
import {AuthContext} from '../helpers/authcontext'
function Home() {
 
  const [products, setproducts] = useState("")
  const [cover, setcover] = useState("")
  const [accessories, setaccessories] = useState("")
  const [headset, setheadset] = useState("")
  const AuthCon=useContext(AuthContext)
  console.log(AuthCon)
 
  useEffect(() => {
         
          MobileHouseApi.get("/getcover")
          .then(res=>{
            setcover(res.data)
          }) 


          MobileHouseApi.get("/getheadset")
          .then(res=>{
            setaccessories(res.data)
          })

          MobileHouseApi.get("/getaccessories")
          .then(res=>{
            setheadset(res.data)
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
                      {cover!="" && <ProductSlider
                      
                       items={cover}
                       Heading="Mobile Covers"            
                      />}
                      
                      {accessories!="" && <ProductSlider
                      
                      items={accessories}
                      Heading="Accessories"            
                     />}
                      {headset!="" && <ProductSlider
                      
                      items={headset}
                      Heading="Headset"            
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
