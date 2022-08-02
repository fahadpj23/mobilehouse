import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

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
    return (
      
    <div className="w-full focus:outline-none "> 
        <Slider {...settings}>
          {
            this.props.Banner && this.props.Banner.map((item,key)=>{
              return(
                  <div  className="focus:outline-none">
                   <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="images" className=" object-fit h-36  md:h-96  w-full" />
                   </div >
              )
            })    
          }
         
        
        </Slider>
    </div>
    
    );
  }
}