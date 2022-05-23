import SideNav from "../sideNav"

import { useState ,useEffect,useContext} from "react"
import FormLayout from '../form'
import MobileHouseApi from "../../../helpers/axiosinstance";
import { Usercontext } from "../../context/userContext";
import TableContent from "../table";
import NavOperation from '../operation'
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
        {name:"categoryName",type:"text"},
         {name:"status",type:"select",value:[{value:1,name:"active"},{value:0,name:"disable"}],required:"true"},
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
            MobileHouseApi.get('/getCategory',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                setcategory(res.data)
            })
         }
        })
        e.preventDefault();
      }

      const AddNew=()=>{
        setaddcategory(true)
     }

     const closeWindow=()=>{
        setaddcategory(false)
        setoperation("")
        setoperationitem("")
     }

      const tableOperation=(operation,category)=>{
        console.log(category)
        setoperationid(category.id)
      // if(operation==="edit")
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
        if(category==="")
        {
            MobileHouseApi.get('/getCategory',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
            setcategory(res.data)
            })
        }
        
        

      },[category])
    console.log(operationitem)
   
    return(
        <div className="flex w-full">
            {
                    addcategory===true && 
                       
                                  
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            values={categoryvalues}
                                            operation={operation}
                                            operationitem={operationitem}
                                            Mainname={operationitem.categoryName}
                                            Mainstatus={operationitem.status}
                                            close={closeWindow}
                                            head="Category"
                                        />
                                    
                                 
                }
            <SideNav/>
            <div className="w-10/12">
                
            <NavOperation
            AddNew={AddNew}
            />
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