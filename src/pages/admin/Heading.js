
import {useContext,useEffect,useState} from 'react'
import { AuthContext } from '../../helpers/authcontext';
import { useHistory } from 'react-router-dom';
import HeadingMain from "components/admindashboard/Heading/HeadingMain";
import MobileHouseApi from '../../helpers/axiosinstance'


const Heading=()=>{
    const headproduct=[];
    const Auth=useContext(AuthContext)
    const [products,setproducts]=useState("")
    let history=useHistory();
  
   
    useEffect(()=>{
        if(products=="")
        {
            MobileHouseApi.get('/headProduct',{headers:{accessToken:localStorage.getItem("accessToken")}}).then((res)=>{
               setproducts(res.data.products)
            })
        }
    },[])
    return( 
         <div className="flex">
             {Auth && Auth.authState=="authorized" ?
               products &&
                <HeadingMain
                    products={products}
                    headproduct={headproduct}
              
                />
            :
                history.push("/AdminLogin")
            }
            
         </div>
    )
}
export default Heading