
import SingleProduct from "./singleProducts";
import {Link} from "react-router-dom";
import React, { Component } from "react";
import Slider from "react-slick";
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <span  onClick={onClick} className="absolute -right-3 top-1/2 origin-center transform -translate-y-1/2 z-20 text-xl bg-gray-100 rounded-full p-2 md:block hidden ">
             <HiArrowRight/> 

      </span>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
     
        <span onClick={onClick} className="absolute -left-3 top-1/2 origin-center transform -translate-y-1/2 z-10   text-xl bg-gray-100 rounded-full p-2  md:p-3 md:block hidden ">
   
        <HiArrowLeft/>

      </span>
     
    );
  }

export default class  ProductSlider extends Component{
 
  constructor(props){
    super(props)
  }
    render(){
        const settings = {
            infinite: false,
            speed: 500,
            slidesToShow:6.2 ,
            slidesToScroll: 1,
            arrows:true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            className:'px-9',
            swipeToSlide: true,  

            responsive:[
              {
                breakpoint: 1248,
                settings: {
                  slidesToShow:4.5 ,
                  arrows:true,
                  nextArrow: <SampleNextArrow />,
                  prevArrow: <SamplePrevArrow />,
                  className:'px-7 relative',
                  
                }
              },
              {
                breakpoint: 1100,
                settings: {
                  slidesToShow:3.2,
                  arrows:true,
                  nextArrow: <SampleNextArrow />,
                  prevArrow: <SamplePrevArrow />,
                  className:'px-7 relative',
                }
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow:2.5 ,
                  className:'relative',
                  arrows:false,
                }
              },
              {
                breakpoint: 580,
                settings: {
                  slidesToShow:1.9 ,
                  className:'relative',
                  arrows:false,
                }
              },
              {
                breakpoint: 460,
                settings: {
                  slidesToShow:1.5,
                  className:'relative',
                  arrows:false,
                }
              },

            ]
            };
             
            console.log(this.props)
            return (
     
              <div>
                
                <div className="w-full flex justify-between py-4" >
                 <h2 className="font-semibold ">{this.props.Heading}</h2>
                 <Link className="bg-blue-500 rounded-xl  text-white px-3 text-sm flex items-center py-1" to={{pathname: "/ProductList",search: "?" + new URLSearchParams({productCategory:this.props.id,sort:"newestfirst"})}}>View All</Link>
                 {/* <Link to={{pathname: "/singleItem",   search: "?" + new URLSearchParams({productid: item.id}).toString() }} className="h-full items-center justify-center flex flex-col space-y-3 p-3 "> */}

                </div>
                <Slider {...settings}>
                {this.props.items.map((item,key)=>{
                    return(
                        <div key={key} className="px-2 focus:outline-none ml-0 lg:ml-11">
                        <SingleProduct
                            item={item}
                        />
                    </div>
                    )
                    
                })}
                
                </Slider>
              </div>
            );
    }
}