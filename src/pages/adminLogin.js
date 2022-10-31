
import { AuthContext } from "../helpers/authcontext"
import { useNavigate } from 'react-router-dom';
import { useContext } from "react"
import AdminLoginMain from "components/admin/Adminlogin";
const AdminLogin=()=>{

    const Auth=useContext(AuthContext)
    console.log(Auth)
    let navigate=useNavigate();
    return(
        <div>
           
            
                <AdminLoginMain/>
         
            
        </div>
    )
}
export default AdminLogin