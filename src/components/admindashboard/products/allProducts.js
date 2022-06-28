import SingleProduct from '../../Home/singleProducts'
import SideNav from '../sideNav'
import AddProductMain from './AddProductmain'
import { useState ,useEffect} from 'react'
import  mobilehouseApi  from '../../../helpers/axiosinstance'
import TableContent from "../table";
import MobileHouseApi from '../../../helpers/axiosinstance'
import NavOperation from '../operation'
const AllProduct=(props)=>{
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
        console.log(item)
        MobileHouseApi.get('/productdetails',{params:{productId:item.id},headers:{accessToken:localStorage.getItem("accessToken")}})
        .then((res)=>{
            setoperationitem(res.data)
            setoperation(operation)
        
            setoperationid(item.id)
            setaddproduct(true)
     
        })
      
    }

    const productAddSuccess=()=>{
        setaddproduct(false)
        setoperationid("")
        setoperation("")
        setoperationitem("")
        mobilehouseApi.get('/getProduct',{headers:{accessToken:localStorage.getItem("accessToken")}})
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
            mobilehouseApi.get('/getProduct',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                setproduct(res.data)
            })
        }
    })
    
    return(
        <div className="w-full flex h-screen ">
            {
                addproduct==true && 
                <div className='w-full fixed bg-gray-200 h-screen opacity-100 flex items-center justify-center    '>
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
             <SideNav/>
            
            <div className="w-full  h-fixedNoNav3 overflow-auto">
                
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
               
            </div>
    
        </div>
    )
}
export default AllProduct