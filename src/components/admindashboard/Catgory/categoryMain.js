

import { useState ,useEffect,useContext} from "react"
import FormLayout from '../form'
import {MobileHouseApi} from "helpers/axiosinstance";
import { Usercontext } from "../../context/userContext";

const CategoryMain=(props)=>{
    const context=useContext(Usercontext )
  
  
    const [operation,setoperation]=useState("")
    const[operationitem,setoperationitem]=useState("")
    const[operationid,setoperationid]=useState("")
    const[variants,setvariants]=useState("")
    const[attribute,setattribute]=useState("")
    console.log(props.operationitem)
    const values=props.operationitem.values;
    let variantvalues=[]
    const  addformdata=[
      {name:"categoryName",type:"text",required:"true"},
       {name:"status",type:"select",value:[{value:1,name:"active"},{value:0,name:"disable"}],required:"true"},
      {name:"attribute",type:"select",value:attribute,more:"yes"},
      {name:"image",type:"file",required:"true"}
      
    ]
    console.log(props.operationitem)
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data=new FormData(e.target)
        data.append("categoryvalues",JSON.stringify( values))
        data.append("variantvalues",JSON.stringify( variantvalues))
       
        data.append("operation",props.operation)
        data.append("operationid",props.operationitem.id )
        MobileHouseApi.post('/categoryAdd',data)
        
        .then((res)=>{
         if(res.data.error)
         {
                context.notify(res.data.error,"error")
         }
         else
         {
            context.notify(res.data.success,"success")
            props.AddSucess()
            // setaddcategory(false)
            // setoperationid("")
            // setoperation("")
            // setoperationitem("")
            // MobileHouseApi.get('/getCategory',{headers:{accessToken:localStorage.getItem("accessToken")}})
            // .then((res)=>{
            //     setcategory(res.data)
            // })
         }
        })
        e.preventDefault();
      }

   

    //   const tableOperation=(operation,operationCategory)=>{
    //     console.group(operation)
    //     if(operation=="delete")
    //     {
    //       // window.confirm(`delete ${operationCategory.categoryName} `)
    //         MobileHouseApi.delete('/CategoryDelete',{params:{categoryId:operationCategory.id},headers:{accessToken:localStorage.getItem("accessToken")}})
    //         .then((res)=>{
    //           console.log(res.data)
    //         })
    //     }
    //     else
    //     {
    //       MobileHouseApi.get('/getCategoryVariant',{params:{categoryId:operationCategory.id},headers:{accessToken:localStorage.getItem("accessToken")}})
    //       .then((res)=>{
    //         console.log(res.data)
    //             setvariants(res.data.categoryvariant)
    //             setoperationid(operationCategory.id)
    //             setoperationitem(operationCategory)
    //             setoperation(operation)
    //             setaddcategory(true)
              
           
    //       })       
        
          
        

    //     }
    // }
    useEffect(()=>{
      if(attribute=="")
      {
      MobileHouseApi.get('/getAvailableAttribute',{headers:{accessToken:localStorage.getItem("accessToken")}}).then((res)=>{
        if(res.data.attribute)
        {
          
         
          setattribute(res.data.attribute)
       
        }
      })
      }
    },[attribute])
  
    
    return(
        <div >
                  {attribute && 
                       
                    <div className=' '>
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            values={values}
                                            operation={operation}
                                            operationitem={props.operationitem}
                                            AddSucess={props.AddSucess}
                                            AddWindowClose={props.AddWindowClose}
                                            variantvalues={variantvalues}
                                            head="Category"
                                           
                                        />
                    </div>              
                }    
          
               
               
                
                
         
    </div>   
    )
}
export default CategoryMain