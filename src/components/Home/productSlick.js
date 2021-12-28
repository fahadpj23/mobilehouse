
import SingleProduct from "./singleProducts";
import {Link} from "react-router-dom";
// import SlrrecommendImage from "./slrrecommendimage";

import React, { Component } from "react";
import Slider from "react-slick";
import axios from 'axios'
export default class ProductSlider extends Component {
    constructor(props){
        super(props)
    }
  
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4.9,
      slidesToScroll: 1,
      arrows:true,
  
    responsive:[
      {

        breakpoint: 1300,
        settings: {
          infinite:true,
          speed: 500,
          slidesToShow:3.5 ,
          slidesToScroll: 1,
          arrows:true,
      
        }
      },
      {

        breakpoint: 1024,
        settings: {
          infinite:true,
          speed: 500,
          slidesToShow:3.3,
          slidesToScroll: 1,
          arrows:true,
      
        }
      },
      {
        breakpoint: 800,
        settings: {
          infinite:true,
          speed: 500,
          slidesToShow:2.2 ,
          slidesToScroll: 1,
      
          arrows:true,
        }
      },
      {
        breakpoint: 720,
        settings: {
          infinite:true,
          speed: 500,
          slidesToShow:2.2 ,
          slidesToScroll: 1,
      
          arrows:true,
        }
      },
      {
        breakpoint: 680,
        settings: {
          infinite:true,
          speed: 500,
          slidesToShow:2.1 ,
          slidesToScroll: 1,
      
          arrows:true,
        }
      },
      {
        breakpoint: 580,
        settings: {
          infinite:true,
          speed: 500,
          slidesToShow:1.6   ,
          slidesToScroll: 1,
      
          arrows:true,
        }
      },


    ]
  };

    return (
     
      <div>
         {this.props.items!="" && this.props.items.map((item,key)=>{
           console.log(item)
         })}
        <div className="w-full flex justify-between py-4" >
         <h2 className="font-semibold ">{this.props.Heading}</h2>
         <Link to={{pathname: "/viewProduct", state:{item:this.props.Heading}}}>View All</Link>
         {/* <button onClick={()=>this.viewproduct()} className="bg-blue-500 text-white  rounded-sm text-xs px-4 font-semibold py-1">VIEW ALL</button> */}
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