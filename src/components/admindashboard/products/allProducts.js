import SingleProduct from '../../Home/singleProducts'
import SideNav from '../sideNav'
import AddProductMain from './AddProductmain'
import { useState ,useEffect} from 'react'
import  mobilehouseApi  from '../../../helpers/axiosinstance'
import TableContent from "../table";
import MobileHouseApi from '../../../helpers/axiosinstance'
const AllProduct=(props)=>{
    const[addproduct,setaddproduct]=useState(false)
    const[product,setproduct]=useState("")
    const [operation,setoperation]=useState("select")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")

    const closeProductadd=()=>{
        setaddproduct(false)
    }

    const tableOperation=(operation,item)=>{
        MobileHouseApi.get('/productdetails',{params:{productId:item.id}})
        .then((res)=>{
            console.log(res.data)
        })
        // setoperation(operation)
        // setoperationitem(item)
        // setoperationid(item.id)
        // setaddproduct(true)
    }

    const productAddSuccess=()=>{
        setaddproduct(false)
        mobilehouseApi.get('/getProduct')
        .then((res)=>{
            setproduct(res.data)
        })
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
                        category={operationitem.category}
                     />
                </div>

               
            }
             <SideNav/>
            
            <div className="w-10/12">
                
                <div className="w-full flex justify-end space-x-3">
                <button className="w-2/12 px-3 py-1 border border-gray-600">DELETE</button>
                <button  className="w-2/12 px-3 py-1 border border-gray-600 ">EDIT</button>
                <button onClick={()=>setaddproduct(true)}className="px-3 w-2/12 py-1 border border-gray-600 ">ADD NEW</button>
                   

                </div>
                {
                product &&
                    <TableContent
                    Data={product}
                    tableOperation={tableOperation}
                    />
                    }
            </div>
    
        </div>
    )
}
export default AllProduct