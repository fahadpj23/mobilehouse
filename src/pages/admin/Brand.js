import SideNav from "../../components/admindashboard/sideNav";
import {useContext} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useHistory } from 'react-router-dom';
import BrandMain from "components/admindashboard/Brand/BrandMain";


const Brand=()=>{
    const Auth=useContext(AuthContext)
    let history=useHistory();
    return(
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
            
                <BrandMain
                controller="brand"
                />
            :
                history.push("/AdminLogin")
            }
            
         </div>
    )
}
export default Brand