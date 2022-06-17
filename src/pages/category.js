import SideNav from "../components/admindashboard/sideNav";
import {useContext,useEffect} from 'react'
import { AuthContext } from '../helpers/authcontext';
import { useHistory } from 'react-router-dom';
import CategoryMain from "../components/admindashboard/Catgory/categoryMain";
import MobileHouseApi from '../helpers/axiosinstance'


const Category=()=>{
    const Auth=useContext(AuthContext)
    let history=useHistory();
    const attributes=[];
   
    useEffect(()=>{
        MobileHouseApi.get('/getattribute').then((res)=>{
            res.data.Data.map((item,key)=>{
                
                attributes.push(item.attributeName)
            })
        })
    },[])
    return( 
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
               
                <CategoryMain
                attributes={attributes}
              
                />
            :
                history.push("/admin")
            }
            
         </div>
    )
}
export default Category