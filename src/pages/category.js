import SideNav from "../components/admindashboard/sideNav";
import {useContext,useEffect} from 'react'
import { AuthContext } from '../helpers/authcontext';
import { useHistory } from 'react-router-dom';
import CategoryMain from "../components/admindashboard/Catgory/categoryMain";
import MobileHouseApi from '../helpers/axiosinstance'


const Category=()=>{
    const Auth=useContext(AuthContext)
    let history=useHistory();
    useEffect(()=>{
        MobileHouseApi.get('/getCatgeory').then((res)=>{
            console.log(res.data)
        })
    },[])
    return( 
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
            
                <CategoryMain/>
            :
                history.push("/admin")
            }
            
         </div>
    )
}
export default Category