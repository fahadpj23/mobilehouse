import SideNav from "../../components/admindashboard/sideNav";
import {useContext} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useNavigate } from 'react-router-dom';
import BrandMain from "components/admindashboard/Brand/BrandMain";


const Brand=()=>{
    const Auth=useContext(AuthContext)
    let navigate=useNavigate();
    return(
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
            
                <BrandMain
                controller="brand"
                />
            :
                navigate("/AdminLogin")
            }
            
         </div>
    )
}
export default Brand