
import SimpleSlider from "../components/Home/slider";
import Nav from "../components/Home/Nav"
import CatSlider from "components/Home/reactSlick";
import  MobileHouseApi from "../helpers/axiosinstance"
import React, { useState,useEffect ,useContext} from 'react';
import ProductSlider from "../components/Home/productSlick";
import {AuthContext} from '../helpers/authcontext'
import Category from "./category";
function Home() {
 
  const [cover, setcover] = useState("")
  const [phone, setphone] = useState("")
  const [accessories, setaccessories] = useState("")
  const [headset, setheadset] = useState("")
  const [category, setcategory] = useState("")
  const AuthCon=useContext(AuthContext)
  console.log(AuthCon)
 
  useEffect(() => {
         
          MobileHouseApi.get("/getcover")
          .then(res=>{
            setcover(res.data)
          }) 
          MobileHouseApi.get("/HomePageCategory")
          .then(res=>{
            setcategory(res.data.category)
          }) 


          MobileHouseApi.get("/getheadset")
          .then(res=>{
            setaccessories(res.data)
          })

          MobileHouseApi.get("/getaccessories")
          .then(res=>{
            setheadset(res.data)
          })
          MobileHouseApi.get("/getphone")
          .then(res=>{
            setphone(res.data)
          })
         
       
         
        }, [])
       console.log(cover[0])
  return (
    <div>
  
        
        
      <div className= "w-full overflow-hidden ">
        <Nav/>
        <SimpleSlider/>
        {
                        <CatSlider
                        category={category}
                        />
                      }
        {/* <div className="w-full flex flex-col items-center  space-y-2">
          
            <h1 className="text-2xl font-semibold font-serif">OUR PRODUCTS</h1>
            <p className="font-serif text-xs md:text-base">We package the products with best services to make you a happy customer</p>
            <hr className="w-4/12 md:w-1/12 bg-blue-600 border-2 border-blue-400"></hr>
        </div> */}
        <div className="w-full flex justify-center">
          <div className="w-11/12 px-6">
                     
                      {cover!=="" && <ProductSlider
                      
                       items={cover}
                       Heading="Mobile Covers"
                       type="46"            
                      />}
                      
                      {accessories!=="" && <ProductSlider
                      
                      items={accessories}
                      Heading="Headset"
                      type="47"
                                
                     />}
                      {headset!=="" && <ProductSlider
                      
                      items={headset}
                      Heading="Accessories" 
                      type="48"           
                     />}
                      {phone!=="" && <ProductSlider
                      
                      items={phone}
                      Heading="phone" 
                      type="49"           
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
