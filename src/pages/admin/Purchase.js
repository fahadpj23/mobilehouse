import MainLayoutAdmin from 'components/admindashboard/MainLayoutAdmin';
import TableContent from 'components/admindashboard/table';
import {useContext} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useNavigate } from 'react-router-dom';
const Purchase=()=>{
    const Auth=useContext(AuthContext)
    let navigate=useNavigate();
    return(
        <div className="flex">
                {Auth && Auth.authState=="authorized" ?
                 <MainLayoutAdmin>
                 <TableContent
                 controller="Purchase"
                 />
                 </MainLayoutAdmin>
              
            :
                navigate("/AdminLogin")
            }
       
        </div>
  
    )
}
export default Purchase