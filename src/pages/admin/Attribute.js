import SideNav from "../../components/admindashboard/sideNav";
import {useContext} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useHistory } from 'react-router-dom';
import AttributeMain from "components/admindashboard/Attribute/AttributeMain";


const Attribute=()=>{
    const Auth=useContext(AuthContext)
    let history=useHistory();
    return(
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
            
                <AttributeMain/>
            :
                history.push("/AdminLogin")
            }
            
         </div>
    )
}
export default Attribute