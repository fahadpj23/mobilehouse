

import OrderMain from 'components/admindashboard/orderComponent/OrderMain'
import { useHistory } from 'react-router-dom';
import {useContext} from 'react'
import { AuthContext } from 'helpers/authcontext';
function Order(){
    let history=useHistory();
    const Auth=useContext(AuthContext)

    return(
        <div>
            
          {Auth && Auth.authState=="authorized" ?
            
            <OrderMain/>
            :
                history.push("/AdminLogin")
            }
        </div>
    )
    }
export default Order