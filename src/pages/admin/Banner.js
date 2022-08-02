import SideNav from "../../components/admindashboard/sideNav";
import {useContext,useEffect,useState} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useHistory } from 'react-router-dom';

import {MobileHouseApi} from "helpers/axiosinstance";
import BannerMain from "components/admindashboard/Banner/BannerMain";


const Banner=()=>{
     const BannerImageArray=[];
     const Auth=useContext(AuthContext)
    // const [products,setproducts]=useState("")
     let history=useHistory();
  
   
  
    return( 
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
              
                <BannerMain
                BannerImageArray={BannerImageArray}
              
                />
            :
                history.push("/AdminLogin")
            }
            
         </div>
    )
}
export default Banner