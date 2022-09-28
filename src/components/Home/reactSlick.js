import React, { Component } from "react";
import Slider from "react-slick";
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import {Link} from "react-router-dom";

import {MobileHouseApiImage} from 'helpers/axiosinstance'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <span onClick={onClick} className="absolute -right-3 top-1/2 origin-center transform -translate-y-1/2 z-10  text-black bg-gray-100 rounded-full sm:p-3 sm:block hidden hover:bg-gray-200">
      <HiArrowRight />
    </span>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (

    <span onClick={onClick} className="absolute -left-3 top-1/2 origin-center transform -translate-y-1/2 z-10   text-black bg-gray-100 rounded-full md:p-3 sm:block hidden hover:bg-gray-200">
      <HiArrowLeft />

    </span>

  );
}



 const CatSlider=(props)=>{
     
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 9.7,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      className: 'px-10 relative',
      swipeToSlide: true,
      
      responsive: [
        
        {
          breakpoint: 1300,
          settings: {
            infinite: true,
            speed: 500,
            slidesToShow: 5.3,
            slidesToScroll: 1,
            className: 'px-7 relative',
            swipeToSlide: true,

          }
        },
        {
          breakpoint: 900,
          settings: {
            infinite: true,
            speed: 500,
            slidesToShow: 3.7,
            slidesToScroll: 1,
            className: 'px-7 relative',
            swipeToSlide: true,

          }
        },
        {
          breakpoint: 800,
          settings: {
            infinite: true,
            speed: 500,
            slidesToShow: 5.7,
            slidesToScroll: 1,
            className: 'relative ',
            swipeToSlide: true,


          }
        },
        {
          breakpoint: 600,
          settings: {
            infinite: true,
            speed: 500,
            slidesToShow: 3.5,
            slidesToScroll: 1,
            className: 'relative ',
            swipeToSlide: true,


          }
        },
        {
          breakpoint: 430,
          settings: {
            infinite: true,
            speed: 500,
            slidesToShow: 3.7,
            slidesToScroll: 1,
            className: 'relative',
            swipeToSlide: true,


          }
        },

      ]
    };
     console.log(MobileHouseApiImage)
  
    return (
      <div className="w-full flex justify-center py-5 ">
      <div className="px-0 md:px-3  w-full md:w-11/12  ">
        <div className="flex justify-between mx-1 md:mx-6 ">
          
          <h1 className="relative sm:text-xl uppercase tracking-wide text-xs text-white "><b>Top Category</b></h1>
        </div>
        {/* <Slider {...settings} className="mt-2 p-1"> */}
        <div className="grid grid-cols-3 md:grid-cols-8">
          {props.category && props.category.map((item, key) => {
             
              return(
                <Link className="  h-32 md:h-48 px-2 py-2 " to={{pathname: "/ProductList",search: "?" + new URLSearchParams({type:'category',category: item.id,sort:"newestfirst"}).toString()}}>

                    <div className="rounded-lg shadow-sm  py-2 border border-gray-200 bg-white px-1 " key={key}>
                        <div className=" flex flex-col  w-full justify-center items-center  rounded-lg   ">
                            <img src={   `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="" className="object-contain h-20 md:h-32 w-20 md:w-32 overflow-hidden p-2 " />
                            <h1 className="w-full text-center font-normal capitalize text-cart md:text-xs  tracking-wide truncate">{item.categoryName}</h1>
                        </div>
                    </div>
                 </Link>
              )
          }
           
          )}
        </div> 
        {/* </Slider> */}
      </div>
      </div>

    );
  
}
export default CatSlider