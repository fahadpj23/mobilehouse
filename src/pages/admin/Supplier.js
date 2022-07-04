import SupplierMain from 'components/admindashboard/Supplier/SupplierMain'
import {useContext} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useHistory } from 'react-router-dom';
const Supplier=()=>{
    const Auth=useContext(AuthContext)
    let history=useHistory();
    return(
        <div className="flex">
             {Auth && Auth.authState=="authorized" ?
              
              <SupplierMain/>
            :
                history.push("/AdminLogin")
            }
            
         </div>
       
    )
}
export default Supplier