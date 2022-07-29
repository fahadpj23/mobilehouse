import AdminLoginMain from "../components/admin/Adminlogin"
import { AuthContext } from "../helpers/authcontext"
import { useHistory } from 'react-router-dom';
import { useContext } from "react"

const AdminLogin=()=>{

    const Auth=useContext(AuthContext)
    console.log(Auth)
    let history=useHistory();
    return(
        <div>
           
            {

                Auth && Auth.authState=="authorized" ? 
                history.push("/admin/Dashboard")
                :
                <AdminLoginMain/>
            }
            
        </div>
    )
}
export default AdminLogin