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
    const[variants,setvariants]=useState("")
   
    const categoryvalues=[];
    const variantvalues=[];
    const addformdata=[
        {name:"categoryName",type:"text",required:"true"},
         {name:"status",type:"select",value:[{value:1,name:"active"},{value:0,name:"disable"}],required:"true"},
        {name:"attribute",type:"select",value:props.attributes,more:"yes",},
        {name:"image",type:"file",required:"true"}
        
    ]
   
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data=new FormData(e.target)
        data.append("categoryvalues",JSON.stringify( categoryvalues))
        data.append("variantvalues",JSON.stringify( variantvalues))
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

      const tableOperation=(operation,operationCategory)=>{
        console.group(operation)
        if(operation=="delete")
        {
          // window.confirm(`delete ${operationCategory.categoryName} `)
            MobileHouseApi.delete('/CategoryDelete',{params:{categoryId:operationCategory.id},headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
              console.log(res.data)
            })
        }
        else
        {
          MobileHouseApi.get('/getCategoryVariant',{params:{categoryId:operationCategory.id},headers:{accessToken:localStorage.getItem("accessToken")}})
          .then((res)=>{
            console.log(res.data)
                setvariants(res.data.categoryvariant)
                setoperationid(operationCategory.id)
                setoperationitem(operationCategory)
                setoperation(operation)
                setaddcategory(true)
              
           
          })       
        
          
        

        }
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
    console.log(variantvalues)
   
    return(
        <div className="flex w-full h-screen overflow-auto">
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
                                            variantvalues={variantvalues}
                                            variants={variants}
                                            head="Category"
                                        />
                                    
                                 
                }
            <SideNav/>
            <div className="w-full h-fixedNoNav3 overflow-auto  ">
                
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