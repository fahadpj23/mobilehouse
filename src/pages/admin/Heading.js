
import {useContext,useEffect,useState} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useHistory } from 'react-router-dom';
import MainLayoutAdmin from 'components/admindashboard/MainLayoutAdmin';
import TableContent from 'components/admindashboard/table';


const Heading=()=>{

    const Auth=useContext(AuthContext)
  
    let history=useHistory();
  
   
 
    return( 
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
                  <MainLayoutAdmin>
                  <TableContent
                  controller="Heading"
                  />
                  </MainLayoutAdmin>
            :
                history.push("/AdminLogin")
            }
            
         </div>
    )
}
export default Heading