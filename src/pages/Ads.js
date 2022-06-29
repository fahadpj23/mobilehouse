import SideNav from "../components/admindashboard/sideNav";
import {useContext} from 'react'
import { AuthContext } from '../helpers/authcontext';
import { useHistory } from 'react-router-dom';
import AttributeMain from "../components/admindashboard/Attribute/AttributeMain";
import AdsMain from "components/admindashboard/Ads/AdsMain";

const Ads=()=>{
    const Auth=useContext(AuthContext)
    let history=useHistory();
    let AdsImageArray=[];
    return(
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
            
                <AdsMain
                AdsImageArray={AdsImageArray}
                />
            :
                history.push("/admin")
            }
            
         </div>
    )
}
export default Ads