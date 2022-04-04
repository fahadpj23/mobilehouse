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

    const closeProductadd=()=>{
        setaddproduct(false)
        setoperationid("")
        setoperation("")
        setoperationitem("")
    }

    const tableOperation=(operation,item)=>{
        MobileHouseApi.get('/productdetails',{params:{productId:item.id}})
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
        mobilehouseApi.get('/getProduct')
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
            mobilehouseApi.get('/getProduct')
            .then((res)=>{
                setproduct(res.data)
            })
        }
    })
    
    return(
        <div className="w-full flex ">
            {
                addproduct==true && 
                <div className='w-full fixed bg-gray-200 h-screen opacity-100 flex items-center justify-center    '>
                     <AddProductMain
                        closeProductadd={closeProductadd}
                        productAddSuccess={productAddSuccess}
                        operation={operation}
                        operationitem={operationitem}
                        operationid={operationid}
                      
                     />
                </div>

               
            }
             <SideNav/>
            
            <div className="w-10/12 py-5">
                
                <NavOperation
                 AddNew={AddNew}
                />
                <div className='mt-7'>
                    {
                    product &&
                        <TableContent
                        Data={product}
                        tableOperation={tableOperation}
                        />
                        }
                </div>
               
            </div>
    
        </div>
    )
}
export default AllProduct