
import {useContext} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useNavigate } from 'react-router-dom';
import MainLayoutAdmin from "components/admindashboard/MainLayoutAdmin";
import TableContent from "components/admindashboard/table";

const Ads=()=>{
    const Auth=useContext(AuthContext)
    let navigate=useNavigate();
   
    return(
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
            
            <MainLayoutAdmin>
            <TableContent
             controller="Ads"
            />
            </MainLayoutAdmin>
            :
                navigate("/AdminLogin")
            }
            
         </div>
    )
}
export default Ads