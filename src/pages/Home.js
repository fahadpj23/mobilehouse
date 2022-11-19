import SimpleSlider from "../components/Home/slider";
import CatSlider from "components/Home/reactSlick";
import { MobileHouseApi } from "helpers/axiosinstance";
import React, { useState, useEffect, useContext } from "react";
import ProductSlider from "../components/Home/productSlick";
import HomeAds from "components/Home/HomeAds";
import MainLayoutWebsite from "components/MainLayoutWebsite";
import Footer from "components/Home/Footer";

function Home() {
  const [category, setcategory] = useState("");
  const [sliders, setsliders] = useState("");
  const [Banner, setBanner] = useState("");
  const [Ads, setAds] = useState("");

  useEffect(() => {
    MobileHouseApi.get("/HomePageCategory")
      .then((res) => {
        setcategory(res.data.category);
      })
      .catch((Err) => console.log(Err));

    MobileHouseApi.get("/getProductSliders")
      .then((res) => {
        setsliders(res.data.sliders);
      })
      .catch((Err) => console.log(Err));

    MobileHouseApi.get("/getBanner")
      .then((res) => {
        setBanner(res.data.banner);
      })
      .catch((Err) => console.log(Err));
  
    MobileHouseApi.get("/getAds").then((res) => {
      setAds(res.data.Ads).catch((Err) => console.log(Err));
    });
  }, []);

  console.log(Ads);
  return (
    <div className="">
      <MainLayoutWebsite>
        <div className="w-full overflow-hidden ">
          {Banner && <SimpleSlider Banner={Banner} />}\
          {<CatSlider category={category} />}
          <div className="w-full flex justify-center ">
            <div className="w-full  ">
              {sliders &&
                Ads &&
                sliders.map((item, key) => {
                  return (
                    <div key={key} className="">
                      <ProductSlider
                        id={item.id}
                        items={item.products}
                        Heading={item.Heading}
                      />

                      <div className="hidden sm:block ">
                        <HomeAds Ads={Ads[key]} />
                      </div>
                      <div className="block sm:hidden">
                        <SimpleSlider
                          Banner={Ads[key] && Ads[key].detail}
                          advertisment="advertisment"
                          Ads="Ads"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {Banner && <Footer />}
        </div>
      </MainLayoutWebsite>
    </div>
  );
}

export default Home;
