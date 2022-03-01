import AdminLogin from "../components/admin/Adminlogin"
import { AuthContext } from "../helpers/authcontext"
import { useHistory } from 'react-router-dom';
import { useContext } from "react"
import Order from "./Order"
const Admin=()=>{

    const Auth=useContext(AuthContext)
    let history=useHistory();
    return(
        <div>
            {
                Auth && Auth.authState=="authorized" ? 
                history.push("/Dashboard")
                :
                <AdminLogin/>
            }
            
        </div>
    )
}
export default Admin