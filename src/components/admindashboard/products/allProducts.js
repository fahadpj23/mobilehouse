import SingleProduct from '../../Home/singleProducts'
import SideNav from '../sideNav'
import AddProductMain from './AddProductmain'
import { useState ,useEffect ,useContext} from 'react'
import { MobileHouseApi}  from 'helpers/axiosinstance'
import TableContent from "../table";
import { Usercontext } from "../../context/userContext";
import NavOperation from '../operation'
import MainLayoutAdmin from '../MainLayoutAdmin'
const AllProduct=(props)=>{
    const context=useContext(Usercontext )
    const[addproduct,setaddproduct]=useState(false)
    const[product,setproduct]=useState("")
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")
   
    let productImageblob=["","","","",""]
    let productImage=["","","","",""]
    const closeProductadd=()=>{
        setaddproduct(false)
        setoperationid("")
        setoperation("")
        setoperationitem("")
    }

    const tableOperation=(operation,item)=>{
        
        if(operation=="delete")
        {
            console.log(item)
            MobileHouseApi.delete('/productDelete',{params:{productId:item.id},headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                if(res.data.success)
                {
                    context.notify(res.data.success,"success")
                    
                   
                }
        
            })
        }
        else
        {
            MobileHouseApi.get('/productdetails',{params:{productId:item.id},headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                setoperationitem(res.data)
                setoperation(operation)
            
                setoperationid(item.id)
                setaddproduct(true)
          
        
            })
        }      
      
    }

    // const SearchTable=(searchval)=>{
    //     MobileHouseApi.get(`/${props.controller}/getData`,{params:{search:searchval},headers:{accessToken:localStorage.getItem("accessToken")}})
    //     .then((res)=>{
    //         setproduct(res.data)
    //     })
    // }


    const productAddSuccess=()=>{
        setaddproduct(false)
        setoperationid("")
        setoperation("")
        setoperationitem("")
        // window.location.reload(false);
        
    }

    const AddNew=()=>{
        setaddproduct(true)
    }

  
   
    
    return(
        <div className="w-full flex h-screen ">
            {
                addproduct==true && 
                <div className='w-full fixed bg-gray-200 h-screen opacity-100 flex items-center justify-center  z-20  '>
                     <AddProductMain
                        closeProductadd={closeProductadd}
                        productAddSuccess={productAddSuccess}
                        operation={operation}
                        operationitem={operationitem}
                        operationid={operationid}
                         productImageblob={productImageblob}
                         productImage={productImage}
                         controller={props.controller}
                      
                     />
                </div>

               
            }
             <MainLayoutAdmin>
                
              
               
                <div className=' '>
                   
                        <TableContent
                      
                        tableOperation={tableOperation}
                        type="product"
                        controller={props.controller}
                        AddNew={AddNew}
                      
                        />
                        
                </div>
               
                </MainLayoutAdmin>
    
        </div>
    )
}
export default AllProduct