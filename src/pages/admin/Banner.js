import SideNav from "../../components/admindashboard/sideNav";
import {useContext,useEffect,useState} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useNavigate } from 'react-router-dom';
import MainLayoutAdmin from "components/admindashboard/MainLayoutAdmin";
import TableContent from "components/admindashboard/table";

const Banner=()=>{
   
     const Auth=useContext(AuthContext)
    // const [products,setproducts]=useState("")
     let navigate=useNavigate();
  
   
  
    return( 
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
              
              <MainLayoutAdmin>
                <TableContent
                controller="banner"
                />
            </MainLayoutAdmin>
            :
                navigate("/AdminLogin")
            }
            
         </div>
    )
}
export default Banner