import React, { Component } from "react";
import Slider from "react-slick";
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import {Link} from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <span onClick={onClick} className="absolute -right-3 top-1/2 origin-center transform -translate-y-1/2 z-10  text-black bg-gray-100 rounded-full md:p-3 md:block hidden hover:bg-gray-200">
      <HiArrowRight />
    </span>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (

    <span onClick={onClick} className="absolute -left-3 top-1/2 origin-center transform -translate-y-1/2 z-10   text-black bg-gray-100 rounded-full md:p-3 md:block hidden hover:bg-gray-200">
      <HiArrowLeft />

    </span>

  );
}



 const CatSlider=(props)=>{
     
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 7.3,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      className: 'px-20 relative',
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            infinite: false,
            speed: 500,
            slidesToShow: 6.3,
            slidesToScroll: 1,
            arrows: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            className: 'px-7 relative',
            swipeToSlide: true,

          }
        },
        {
          breakpoint: 600,
          settings: {
            infinite: false,
            speed: 500,
            slidesToShow: 5.3,
            slidesToScroll: 1,
            className: 'px-7 relative',
            swipeToSlide: true,

          }
        },
        {
          breakpoint: 480,
          settings: {
            infinite: false,
            speed: 500,
            slidesToShow: 4.3,
            slidesToScroll: 1,
            className: 'relative ',
            swipeToSlide: true,


          }
        },
        {
          breakpoint: 330,
          settings: {
            infinite: false,
            speed: 500,
            slidesToShow: 3.3,
            slidesToScroll: 1,
            className: 'relative',
            swipeToSlide: true,


          }
        },

      ]
    };

    return (
      <div className="px-3 my-3 bg-gray-50">
        <div className="flex justify-between mx-6 ">
          <h1 className="relative sm:text-md text-sm"><b>Top Category</b></h1>
        </div>
        <Slider {...settings} className="">
          {props.category && props.category.map((item, key) => {
             
              return(
                <Link className=" px-2 h-40 " to={{pathname: "/ProductList",search: "?" + new URLSearchParams({category: item.id}).toString()}}>

                    <div className="py-4 px-2 h-40   " key={key}>
                        <div className="border border-gray-300 flex flex-col bg-white w-full   rounded-lg  p-2">
                            <img src={   `http://localhost:9000/images/${item.image}`} alt="" className="object-contain h-24 w-full overflow-hidden" />
                            <h1 className="text-center font-semibold">{item.categoryName}</h1>
                        </div>
                    </div>
                 </Link>
              )
          }
           
          )}
       
        </Slider>
      </div>

    );
  
}
export default CatSlider