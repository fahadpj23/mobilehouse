import { useState ,useEffect,useContext} from "react"
import { Usercontext } from "../../context/userContext";
import AddProductWindow from "./addProductWindow"
import { AiOutlineClose} from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import SideNav from "../sideNav"
import MobileHouseApi from "../../../helpers/axiosinstance"
const AddProductMain=(props)=>{
    let history=useHistory();
    console.log(props.operationitem.category)
    const context=useContext(Usercontext )
    const [category, setcategory] = useState(props.category ? props.category: "")
    const [categoryid, setcategoryid] = useState("")
    const [catgeorytotal, setcatgeorytotal] = useState("")
    const [categoryattribute,setcategoryattribute]=useState("")
   
    const [categoryset,setcategoryset]=useState(false)


    const categoryselect=(catname)=>{
        
       console.log(catgeorytotal)
        setcategory(catname)
        catgeorytotal && catgeorytotal.Data.map((item,key)=>{
                       console.log(item.categoryName)         
                 if(catname==item.categoryName)
                 {
                   
                    setcategoryid(item.id)
                     MobileHouseApi.get("/getcategoryAttribute",{params:{"categoryid":item.id}})
                     .then((res)=>{
                        setcategoryattribute(res.data)
                        console.log(res.data)
                     })
                 }
                            
         } )
    }

  
    const handleSubmit=(e)=>{
       
        const data=new FormData(e.target)
        data.append("category",category)
        data.append("categoryid",categoryid)
        data.append("operation",props.operation)
        data.append("operationid",props.operationid)
        data.append("variantimage",props.operationitem.image )
        console.log(data)
        MobileHouseApi.post('/productAdd',data)
        .then((res)=>{
         if(res.data.error)
         {
                context.notify(res.data.error)
         }
         else
         {
            context.notify("Product added successfully","success")
           props.productAddSuccess()

         }
        })
        e.preventDefault();
      }
      useEffect(()=>{
        if(catgeorytotal=="")
        {
            MobileHouseApi.get('/getCategory')
            .then((res)=>{
                console.log(res.data)
                setcatgeorytotal(res.data)
            })
        }
        if( props.operationitem.category && categoryset==false)
        {
            if(catgeorytotal!="")
                {
                setcategoryset(true)
                categoryselect(props.operationitem.category)
                }
        }
           
    })

    return(
        <div className=" w-full flex justify-center max-h-fixedNoNavlgmax overflow-auto  ">
       
        <div className="w-6/12 bg-white z-20 h-full flex relative justify-center py-16">
        
        <div className="w-10/12  flex flex-col justify-center items-center ">
        <button onClick={()=>props.closeProductadd()} className=" absolute right-4 top-3 font-semibold text-xl"><AiOutlineClose/></button>
            <div className="w-full  ">
                
                <div className="space-y-1">
                    <h1>select category *</h1>
                    <select onChange={(e)=>categoryselect(e.target.value)} value={category} className="border-2 border-gray-400 rounded-md w-5/12 text-sm focus:outline-none py-1">
                        <option>--Select Catgeory---</option>
                        {
                            catgeorytotal && catgeorytotal.Data.map((item,key)=>
                                
                                <option key={key} className="text-black" value={item.categoryName}>{item.categoryName}</option>
                            
                            )
                        }
                       
                    </select>
                </div>
                
            </div>
                {
                    categoryattribute!=""&&
                <AddProductWindow
                    categoryattribute={categoryattribute}
                    handleSubmit={handleSubmit}
                    operation={props.operation}
                    operationitem={props.operationitem}
                    operationid={props.operationid}
                    category={props.category}
                     
                />
                }   
            
            
           
        </div>
        </div>
    </div>   
    )
}
export default AddProductMain



