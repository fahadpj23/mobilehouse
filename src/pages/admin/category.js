
import {useContext,useEffect} from 'react'
import { AuthContext } from 'helpers/authcontext';
import { useNavigate } from 'react-router-dom';
import TableContent from 'components/admindashboard/table';
import MainLayoutAdmin from "components/admindashboard/MainLayoutAdmin";
const Category=()=>{
    const Auth=useContext(AuthContext)
    let navigate=useNavigate();
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
                navigate("/AdminLogin")
            }
            
         </div>
    )
}
export default Category