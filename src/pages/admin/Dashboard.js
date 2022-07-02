import SideNav from "../../components/admindashboard/sideNav";
import {useContext} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useHistory } from 'react-router-dom';
import DashboardMain from "components/admindashboard/dashboard/dashboardMain";


const Dashboard=()=>{
    const Auth=useContext(AuthContext)
    let history=useHistory();
    return(
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
            
                <DashboardMain/>
            :
                history.push("/AdminLogin")
            }
            
         </div>
    )
}
export default Dashboard