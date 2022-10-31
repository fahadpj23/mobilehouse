import MainLayoutAdmin from 'components/admindashboard/MainLayoutAdmin';
import TableContent from 'components/admindashboard/table';
import {useContext} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useNavigate } from 'react-router-dom';
const Supplier=()=>{
    const Auth=useContext(AuthContext)
    let navigate=useNavigate();
    return(
        <div className="flex">
             {Auth && Auth.authState=="authorized" ?
              
              <MainLayoutAdmin>
                 <TableContent
                     controller="Supplier"
                 />
                 </MainLayoutAdmin>
            :
                navigate("/AdminLogin")
            }
            
         </div>
       
    )
}
export default Supplier