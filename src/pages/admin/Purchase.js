import PurchaseMain from 'components/admindashboard/PurchaseComponent/purchaseMain'
import {useContext} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useHistory } from 'react-router-dom';
const Purchase=()=>{
    const Auth=useContext(AuthContext)
    let history=useHistory();
    return(
        <div className="flex">
                {Auth && Auth.authState=="authorized" ?
                
                <PurchaseMain
                controller="purchase"
                />
                 :
                history.push("/AdminLogin")
                 }
       
        </div>
  
    )
}
export default Purchase