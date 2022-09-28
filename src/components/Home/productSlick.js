
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
            infinite: this.props.items.length >6 ,
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
                breakpoint: 1450,
                settings: {
                  slidesToShow:5.5 ,
                  arrows:true,
                  nextArrow: <SampleNextArrow />,
                  prevArrow: <SamplePrevArrow />,
                  className:'px-7 relative',
                  
                }
              },
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
                  slidesToShow:3.4 ,
                  className:'relative',
                  arrows:false,
                }
              },
              {
                breakpoint: 580,
                settings: {
                  slidesToShow:2.3 ,
                  className:'relative',
                  arrows:false,
                }
              },
              {
                breakpoint: 460,
                settings: {
                  slidesToShow:2.1,
                  className:'relative',
                  arrows:false,
                }
              },

            ]
            };
             
            console.log(this.props.Heading)
            return (
     
              <div className=" px-2">
                
                <div className="w-full flex justify-between py-4 items-center" >
                 <h1 className="font-semibold text-sm md:text-base ">{this.props.Heading}</h1>
                 <Link className="bg-blue-500 rounded  text-white px-3 text-sm flex items-center py-1" to={{pathname: "/ProductList",search: "?" + new URLSearchParams({type:'productCategory',productCategory:this.props.id,sort:"newestfirst"})}}>View All</Link>
                 {/* <Link to={{pathname: "/singleItem",   search: "?" + new URLSearchParams({productid: item.id}).toString() }} className="h-full items-center justify-center flex flex-col space-y-3 p-3 "> */}

                </div>
                {/* <Slider {...settings}> */}
                <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                {this.props.items && this.props.items.map((item,key)=>{
                    return(
                        <div key={key} className="px-2 focus:outline-none  py-1">
                        <SingleProduct
                            item={item}
                        />
                        
                    </div>
                    )
                    
                })}
                </div>
                {/* </Slider> */}
              </div>
            );
    }
}