import SideNav from "../../components/admindashboard/sideNav";
import {useContext,useEffect,useState} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useHistory } from 'react-router-dom';
import MainLayoutAdmin from "components/admindashboard/MainLayoutAdmin";
import TableContent from "components/admindashboard/table";

const Banner=()=>{
   
     const Auth=useContext(AuthContext)
    // const [products,setproducts]=useState("")
     let history=useHistory();
  
   
  
    return( 
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
              
              <MainLayoutAdmin>
                <TableContent
                controller="banner"
                />
            </MainLayoutAdmin>
            :
                history.push("/AdminLogin")
            }
            
         </div>
    )
}
export default Banner