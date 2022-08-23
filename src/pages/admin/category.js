
import {useContext,useEffect} from 'react'
import { AuthContext } from 'helpers/authcontext';
import { useHistory } from 'react-router-dom';
import TableContent from 'components/admindashboard/table';
import MainLayoutAdmin from "components/admindashboard/MainLayoutAdmin";
const Category=()=>{
    const Auth=useContext(AuthContext)
    let history=useHistory();
    const attributes=[];
   

    return( 
         <div className="flex">
             
             {Auth && Auth.authState=="authorized" ?
                 <MainLayoutAdmin>
                 <TableContent
                 controller="category"
                 />
                 </MainLayoutAdmin>
              
            :
                history.push("/AdminLogin")
            }
            
         </div>
    )
}
export default Category