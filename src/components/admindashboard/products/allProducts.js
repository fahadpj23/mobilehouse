import SingleProduct from '../../Home/singleProducts'
import SideNav from '../sideNav'
import AddProductMain from './AddProductmain'
import { useState ,useEffect} from 'react'
import  mobilehouseApi  from '../../../helpers/axiosinstance'
import TableContent from "../table";
import MobileHouseApi from '../../../helpers/axiosinstance'
import { AiFillDelete } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
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
            setoperationitem(res.data)
            setoperation(operation)
        
            setoperationid(item.id)
            setaddproduct(true)
     
        })
       
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
                      
                     />
                </div>

               
            }
             <SideNav/>
            
            <div className="w-10/12 py-5">
                
                <div className="w-full flex justify-end space-x-3">
                <button className=" flex items-center px-3 py-1 border border-gray-400 rounded space-x-1"><h1><AiFillDelete/></h1> <h1>Delete</h1></button>
                <button  className=" flex items-center  px-3 py-1 border border-gray-400 rounded space-x-1 "> <h1><MdModeEdit/></h1> <h1>Edit</h1></button>
                <button onClick={()=>setaddproduct(true)}className="px-3 flex items-center py-1 border border-gray-400  space-x-1 rounded "><h1><FaPlus/></h1> <h1>Add New</h1></button>
                   

                </div>
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