// const Hsncode=()=>{
//     return(
//         <div>
//             <h1>sdssdd</h1>
//         </div>
//     )
// }
// export default Hsncode


import {useContext} from 'react'
import { AuthContext } from '../helpers/authcontext';
import { useHistory } from 'react-router-dom';
import HsnMain from "../components/admindashboard/Hsn/HsnMain";


const Hsncode=()=>{
    const Auth=useContext(AuthContext)
    let history=useHistory();
    return(
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
            
                <HsnMain/>
            :
                history.push("/admin")
            }
            
         </div>
    )
}
export default Hsncode