import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import { Link } from "react-router-dom";
export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
      arrows:false
      
    };
    console.log(this.props.Banner)
    return (
     
    <div className="w-full focus:outline-none "> 
        <Slider {...settings}>
          {
            this.props.Banner && this.props.Banner.map((item,key)=>{
              return(
                  <div  className="focus:outline-none">
                    {
                      this.props.Ads ?
                      <Link  to={{pathname: "/ProductList",search: "?" + new URLSearchParams({Brand:item.Brand,sort:"newestfirst"}).toString()}}   className="w-full"><img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="images" className=" object-fit h-36  md:h-96  w-full" /></Link> 

                      :
                      <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="images" className=" object-fit h-36  md:h-96  w-full" />

                    }

                   </div >
              )
            })    
          }
         
        
        </Slider>
    </div>
    
    );
  }
}