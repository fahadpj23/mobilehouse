import SideNav from "../../components/admindashboard/sideNav";
import {useContext} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useNavigate } from 'react-router-dom';
import DashboardMain from "components/admindashboard/dashboard/dashboardMain";


const Dashboard=()=>{
    const Auth=useContext(AuthContext)
    let navigate=useNavigate();
    return(
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
            
                <DashboardMain
                controller="dashboard"
                />
            :
                navigate("/AdminLogin")
            }
            
         </div>
    )
}
export default Dashboard