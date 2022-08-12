import SingleProduct from '../../Home/singleProducts'
import SideNav from '../sideNav'
import AddProductMain from './AddProductmain'
import { useState ,useEffect ,useContext} from 'react'
import { MobileHouseApi}  from 'helpers/axiosinstance'
import TableContent from "../table";
import { Usercontext } from "../../context/userContext";
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

    const tableOperation=(operation,item)=>{
        
        if(operation=="delete")
        {
            console.log(item)
            MobileHouseApi.delete('/productDelete',{params:{productId:item.id},headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                if(res.data.success)
                {
                    context.notify(res.data.success,"success")
                    MobileHouseApi.get('/getProduct',{headers:{accessToken:localStorage.getItem("accessToken")}})
                    .then((res)=>{
                        setproduct(res.data)
                    })
                }
        
            })
        }
        else
        {
            setuploadstatus(true)
            MobileHouseApi.get('/productdetails',{params:{productId:item.id},headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                setoperationitem(res.data)
                setoperation(operation)
            
                setoperationid(item.id)
                setaddproduct(true)
                setuploadstatus(false)
            })
            
        }      
      
    }

    const productAddSuccess=()=>{
        setaddproduct(false)
        setoperationid("")
        setoperation("")
        setoperationitem("")
        MobileHouseApi.get('/getProduct',{headers:{accessToken:localStorage.getItem("accessToken")}})
        .then((res)=>{
            setproduct(res.data)
        })
    }

    const AddNew=()=>{
        setaddproduct(true)
    }

    useEffect(()=>{
        if(product=="")
        {
            MobileHouseApi.get('/getProduct',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                setproduct(res.data)
            })
        }
    })
    
    return(
        <div className="w-full flex h-screen ">
            {
                uploadstatus==true &&
                <UploadSpinner/>
            }
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
                      
                     />
                </div>

               
            }
             <MainLayoutAdmin>
                
                <NavOperation
                 AddNew={AddNew}
                />
                <div className=' '>
                    {
                    product &&
                        <TableContent
                        Data={product}
                        tableOperation={tableOperation}
                        type="product"
                        />
                        }
                </div>
               
                </MainLayoutAdmin>
    
        </div>
    )
}
export default AllProduct