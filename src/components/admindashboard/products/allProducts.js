import SingleProduct from '../../Home/singleProducts'
import SideNav from '../sideNav'
import AddProductMain from './AddProductmain'
import { useState ,useEffect ,useContext} from 'react'
import { MobileHouseApi}  from 'helpers/axiosinstance'
import TableContent from "../table";
import { Usercontext } from "../../../context/userContext";
import NavOperation from '../operation'
import MainLayoutAdmin from '../MainLayoutAdmin'
import UploadSpinner from "../uploadstatus";
const AllProduct=(props)=>{
    const context=useContext(Usercontext )
    const[addproduct,setaddproduct]=useState(false)
    const[product,setproduct]=useState("")
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")
    const [uploadstatus,setuploadstatus]=useState(false)
    let productImageblob=["","","","",""]
    let productImage=["","","","",""]
    const closeProductadd=()=>{
        setaddproduct(false)
        setoperationid("")
        setoperation("")
        setoperationitem("")
    }
    console.log(props.operationitem)
    // const tableOperation=(operation,item)=>{
        
    //     if(operation=="delete")
    //     {
    //         if(window.confirm("Delete the product")==true)
    //         {
    //         MobileHouseApi.delete('/productDelete',{params:{productId:item.id},headers:{accessToken:localStorage.getItem("accessToken")}})
    //         .then((res)=>{
    //             if(res.data.success)
    //             {
    //                 context.notify(res.data.success,"success")
    //                 MobileHouseApi.get('/getProduct')
    //                 .then((res)=>{
    //                     setproduct(res.data)
    //                 })
    //             }
        
    //         })
    //         }
    //     }
    //     else
    //     {
    //         setuploadstatus(true)
    //         MobileHouseApi.get('/productdetails',{params:{productId:item.id},headers:{accessToken:localStorage.getItem("accessToken")}})
    //         .then((res)=>{
    //             setoperationitem(res.data)
    //             setoperation(operation)
            
    //             setoperationid(item.id)
    //             setaddproduct(true)
    //             setuploadstatus(false)
    //         })
            
    //     }      
      
    // }

    useEffect(()=>{
        if(props.operationitem)
        {
            MobileHouseApi.get('/productdetails',{params:{productId:props.operationitem.id}})
            .then((res)=>{
                setoperationitem(res.data)       
            })
        }
    },[])
 
    
    return(
      
                <div className='w-screen fixed bg-gray-200 h-screen opacity-100 flex items-center justify-center  z-50  '>
                     <AddProductMain
                        closeProductadd={closeProductadd}
                        AddSucess={props.AddSucess}
                        operation={props.operation}
                        operationitem={operationitem}
                        operationid={props.operationitem.id}
                         productImageblob={productImageblob}
                         productImage={productImage}
                         AddWindowClose={props.AddWindowClose}
                      
                     />
                </div>
    )
}
export default AllProduct