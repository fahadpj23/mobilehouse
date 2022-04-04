import SideNav from "../sideNav"

import { useState ,useEffect,useContext} from "react"
import FormLayout from '../form'
import MobileHouseApi from "../../../helpers/axiosinstance";
import { Usercontext } from "../../context/userContext";
import TableContent from "../table";
import { AiFillSetting ,AiOutlineClose} from 'react-icons/ai';
const CategoryMain=(props)=>{
    const context=useContext(Usercontext )
    const [addcategory,setaddcategory]=useState(false)
    const [category,setcategory]=useState("")
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")
    const categoryvalues=[];
    const addformdata=[
        {name:"name",type:"text"},
        {name:"status",type:"select",value:["active","disable"]},
        {name:"attribute",type:"select",value:props.attributes,more:"yes"},
        
    ]
    console.log(props)
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data=new FormData(e.target)
        data.append("categoryvalues",JSON.stringify( categoryvalues))
        data.append("operation",operation)
        data.append("operationid",operationid )
        MobileHouseApi.post('/categoryAdd',data)
        
        .then((res)=>{
         if(res.data.error)
         {
                context.notify(res.data.error)
         }
         else
         {
            context.notify(res.data.success)
            setaddcategory(false)
            setoperationid("")
            setoperation("")
            setoperationitem("")
            MobileHouseApi.get('getCategory')
            .then((res)=>{
                setcategory(res.data)
            })
         }
        })
        e.preventDefault();
      }

      const tableOperation=(operation,category)=>{
        console.log(category)
        setoperationid(category.id)
      // if(operation=="edit")
      // {
      //     MobileHouseApi.get('/editattribute',{params:{"attributeid":attributeid}})
      //     .then((res)=>{
      //         console.log(res.data)
      //     })
      // }
      setoperationitem(category)
      setoperation(operation)
      setaddcategory(true)
    }

      useEffect(()=>{
        if(category=="")
        {
            MobileHouseApi.get('/getCategory')
            .then((res)=>{
            setcategory(res.data)
            })
        }
        
        

      },[category])
    console.log(operationitem)
   
    return(
        <div className="flex w-full">
            {
                    addcategory==true && 
                        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                            <div className=" space-y-4  w-3/12 h-4/5 ">
                                <div className="max-h-full bg-white p-4 overflow-auto">
                                    <div className="w-full">
                                        <button onClick={()=>setaddcategory(false)} className="flex focus:outline-none justify-end w-full text-right"><AiOutlineClose/></button>
                                        <h1 className="w-full flex justify-center text-xl font-semibold">Add Catgeory</h1>
                                    <div>
                                       
                                    </div>
                                  
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            attributevalues={categoryvalues}
                                            operation={operation}
                                            operationitem={operationitem}
                                            Mainname={operationitem.categoryName}
                                            Mainstatus={operationitem.status}
                                        />
                                    
                                    </div>
                                </div>
                              
                            </div>
                           
                        </div>
                }
            <SideNav/>
            <div className="w-10/12">
                
                <div className="w-full flex justify-end space-x-3">
                <button className="px-3 py-1 border border-gray-600">DELETE</button>
                <button onClick={()=>setaddcategory(true)}className="px-3 py-1 border border-gray-600 ">ADD NEW</button>
                   

                </div>
                {
                    category &&
                    <TableContent
                         Data={category}
                         tableOperation={tableOperation}

                    />
                }
                
                
            </div>
    </div>   
    )
}
export default CategoryMain