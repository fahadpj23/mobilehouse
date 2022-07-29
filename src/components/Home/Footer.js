import {Link} from "react-router-dom";
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineTwitter,AiFillInstagram, AiFillYoutube} from 'react-icons/ai';
import { RiLinkedinFill } from 'react-icons/ri';
const Footer=()=>{
    return(
        <div className="bg-gray-200 py-6 px-4">
       
        <div className="md:flex text-sm ">
          <div className="w-full md:w-4/12 space-y-3 ">
                    <img src="/MobilehouseLogo.png" className="h-16 w-5/12 flex items-start "/>
                    <h1>WELCOME TO MOBILE HOUSE</h1>
                    <h1>MOBILE HOUSE was established in 2018 to spread happiness. Get the best deals on unique items here. MOBILE HOUSE is your fun shop to get the good stuff.</h1>
                    <div className=" w-full  flex   space-x-6 text-lg ">
                                <button className="focus:outline-none transform  hover:scale-150 hover:transition duration-300 text-gray-500   hover:text-blue-500 ease-in-out ...">
                                  <FaFacebookF/>
                                 
                                </button>
                                <button className="focus:outline-none transform  hover:scale-150 hover:transition duration-300 text-gray-500  hover:text-blue-400 ease-in-out ...">
                                  <AiOutlineTwitter/>
                                </button>
                                <button className="focus:outline-none transform hover:scale-150 hover:transition duration-300 text-gray-500  hover:text-blue-700 ease-in-out ...">
                                   <RiLinkedinFill/>
                                </button>
                                <button className="focus:outline-none  transform hover:scale-150 hover:transition duration-300 text-gray-500  hover:text-pink-600 ease-in-out ...">
                                   <AiFillInstagram/>
                                
                                </button>
                                <button className="focus:outline-none transform hover:scale-150 hover:transition duration-300  text-gray-500  hover:text-red-600 ease-in-out ...">
                                    <AiFillYoutube/>
                                </button>
                     </div>
          </div>
          <div className="w-full md:w-4/12 flex flex-col items-start md:items-center justify-center ">
            <Link className="     flex items-center py-1 hover:text-blue-500" to={{pathname: "/AboutUs"}}>About Us</Link>
            <Link className="     flex items-center py-1 hover:text-blue-500" to={{pathname: "/ShippingPolicy"}}>Shipping Policy</Link>
            <Link className="     flex items-center py-1 hover:text-blue-500" to={{pathname: "/RefundPolicy"}}>Refund Policy</Link>
            <Link className="     flex items-center py-1 hover:text-blue-500" to={{pathname: "/PrivacyPolicy"}}>Privacy Policy</Link>
            <Link className="     flex items-center py-1 hover:text-blue-500" to={{pathname: "/TermsOfService"}}>Terms Of Service</Link>

          </div>
          <div className="py-5  w-full md:w-4/12 flex flex-col items-center justify-center space-y-3 text-lg">
                   <h1>We’d love to hear what you think!</h1>
                   <button className="border border-gray-500 rounded-full px-2 py-1">Give Feedback</button>
        </div>
        </div>
     </div>
    )
}
export default Footer