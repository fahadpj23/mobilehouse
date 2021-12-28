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
    };
    return (
      
    <div className="w-full focus:outline-none "> 
        <Slider {...settings}>
          <div  className="focus:outline-none">
            <img src="slider1.png" alt="images" className=" object-fit   h-96 lg:h-fixedNoNavlg4 w-full" />
          </div >
          <div className="focus:outline-none">
            <img src="slider2.jpg" alt="images"  className=" object-fill  h-96 lg:h-fixedNoNavlg4 w-full"/>
          </div>
          <div className="focus:outline-none">
            <img src="slider3.jpg" alt="images"  className="  object-fill  h-96 lg:h-fixedNoNavlg4 w-full"/>
          </div>
          <div className="focus:outline-none">
            <img src="slider4.jpg" alt="images"  className=" object-fill fill  h-96 lg:h-fixedNoNavlg4 w-full"/>
          </div>
          
        </Slider>
    </div>
    
    );
  }
}