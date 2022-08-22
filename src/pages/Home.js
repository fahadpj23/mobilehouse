
import SimpleSlider from "../components/Home/slider";
import Nav from "../components/Home/Nav"
import CatSlider from "components/Home/reactSlick";
import {MobileHouseApi} from "helpers/axiosinstance";
import React, { useState,useEffect ,useContext} from 'react';
import ProductSlider from "../components/Home/productSlick";
import {AuthContext} from '../helpers/authcontext'
import HomeAds from "components/Home/HomeAds";
import MainLayoutWebsite from "components/MainLayoutWebsite";
import Footer from "components/Home/Footer";
function Home() {
 
  
 
  const [category, setcategory] = useState("")
  const [sliders, setsliders] = useState("")
  const [Banner, setBanner] = useState("")
  const [Ads, setAds] = useState("")

  const AuthCon=useContext(AuthContext)

 
  useEffect(() => {
         
        
          MobileHouseApi.get("/HomePageCategory")
          .then(res=>{
            setcategory(res.data.category)
          }) 
          MobileHouseApi.get("/getProductSliders")
          .then(res=>{
            setsliders(res.data.sliders)
          }) 
         
          MobileHouseApi.get("/getBanner")
          .then(res=>{
            setBanner(res.data.banner)
          }) 
          MobileHouseApi.get("/getAds")
          .then(res=>{
            setAds(res.data.Ads)
          }) 
        
         
        }, [])
      console.log(Ads)
  return (
    <div>
  
        
    <MainLayoutWebsite>
      <div className= "w-full overflow-hidden space-y-6 ">
       
        {
          Banner &&
          <SimpleSlider
          Banner={Banner}
          />
        }
      
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
          <div className="w-full px-3 md:px-6 md:w-11/12  space-y-10">
                     {sliders && Ads  &&
                     sliders.map((item,key)=>{
                      return(
                      <div className="space-y-10">
                          <ProductSlider
                            id={item.id}
                            items={item.products}
                            Heading={item.Heading}
                                    
                          />
                          <div className="hidden sm:block">
                            <HomeAds
                            Ads={Ads[+key] }
                            />
                          </div>
                          <div className="block sm:hidden">
                            <SimpleSlider
                            Banner={Ads[key] && Ads[key].detail}
                            advertisment="advertisment"
                            />
                          </div>
                          
                     </div>
                      )
                     })
                     
                     }
                      
                     
          </div>
        </div>
      
        <Footer/>
       
        
      </div>
      </MainLayoutWebsite>
      </div>
  );
}

export default Home;
