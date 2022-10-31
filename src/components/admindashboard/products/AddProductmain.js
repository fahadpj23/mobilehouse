import { useState ,useEffect,useContext} from "react"
import { Usercontext } from "../../context/userContext";
import AddProductWindow from "./addProductWindow"
import { AiOutlineClose} from 'react-icons/ai';
import UploadSpinner from "../uploadstatus";
import { useNavigate } from 'react-router-dom';
import SideNav from "../sideNav"
import {MobileHouseApi} from "helpers/axiosinstance"
const AddProductMain=(props)=>{
    let navigate=useNavigate();
    let categoryattributevalues=[];

    console.log(props.operationitem.category)
    const context=useContext(Usercontext )
    const [category, setcategory] = useState(props.operationitem.category ?? "")
    const [categoryid, setcategoryid] = useState(props.operationitem.category ?? "")
    const [catgeorytotal, setcatgeorytotal] = useState("")
    const [categoryattribute,setcategoryattribute]=useState("")
    const [uploadstatus,setuploadstatus]=useState(false)
   
    const [categoryset,setcategoryset]=useState(false)

    console.log(props)


    const categoryselect=(catid)=>{
                    
                    setcategoryid(catid)
                     MobileHouseApi.get("/getcategoryAttribute",{params:{"categoryid":catid},headers:{accessToken:localStorage.getItem("accessToken")}})
                     .then((res)=>{
                      

                        setcategoryattribute(res.data)
                        console.log(res.data)
                     })
                
    }

  
    const handleSubmit=(e)=>{
        setuploadstatus(true)
        const data=new FormData(e.target)
        data.append("category",category)
        data.append("categoryid",categoryid)
        data.append("operation",props.operation)
        data.append("operationid",props.operationid)
        data.append("variantid",props.operationitem.variantid ??"")
        data.append("variantimage",props.operationitem.image )
        data.append("image1",props.productImage[0] )
        data.append("image2",props.productImage[1] )
        data.append("image3",props.productImage[2] )
        data.append("image4",props.productImage[3] )
        data.append("image5",props.productImage[4] )
        data.append("productImage",JSON.stringify(props.productImage))
        data.append("productImageblob",JSON.stringify(props.productImageblob))
        console.log(data)
        MobileHouseApi.post('/productAdd',data,{headers:{accessToken:localStorage.getItem("accessToken")}})
        .then((res)=>{
         if(res.data.error)
         {
                context.notify(res.data.error,"error")
                setuploadstatus(false)
         }
         else
         {
            context.notify("Product added successfully","success")
            setuploadstatus(false)
             props.AddSucess()


         }
        })
        e.preventDefault();
      }
      useEffect(()=>{
        if(catgeorytotal==="")
        {
            MobileHouseApi.get(`/getcategory`,{params:{search:""},headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                console.log(res.data)
                setcatgeorytotal(res.data)
            })
        }
        if( props.operationitem && categoryset===false)
        {
            // console.log(props.operationitem)
            // let imageArray
            // //first position split and add image to that positon 
            // let positions=props.operationitem.imagepositions && props.operationitem.imagepositions.split(';')
            // let imageposset=0
            // console.log(positions)
            // if(props.operationitem.image)
            //  {
            //     imageArray=props.operationitem.image && props.operationitem.image.split(';')
            //  }
            // imageArray && imageArray.map((item,key)=>{
            //     console.log(+positions[imageposset])
            //     props.productImage[[+positions[imageposset]]-1]= item.replace(/^\s+|\s+$/gm,'')
            //     imageposset=imageposset+1
            // })
          
            MobileHouseApi.get(`/productImageDetails`,{params:{productid:props.operationid},headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                res.data.images && res.data.images.map((item,key)=>{
                    if(item.image)
                    {
                        props.productImage[key]= item.image
                        console.log(res.data.images.length)
                        
                    }
                    if(res.data.images.length==key+1)
                        {
                            if(catgeorytotal!="")
                            {
                            setcategoryset(true)
                            categoryselect(props.operationitem.category)
                            }
                        }
                })
            })
           
        }
           
    })
    console.log(uploadstatus)
    return(
        <div className=" w-full flex  max-h-fixedNoNavlgmax overflow-auto justify-end md:justify-center  ">
       
       {
        uploadstatus==true && 
            <UploadSpinner/>
 
       }
       {
        catgeorytotal=="" && 
            <UploadSpinner/>
       }
        <div className="w-10/12 lg:w-6/12 bg-white z-20 h-full flex relative justify-center py-16 mr-5">
        
        <div className="w-10/12  flex flex-col justify-center items-center ">
        <button onClick={()=>props.AddWindowClose()} className=" absolute right-4 top-3 font-semibold text-xl"><AiOutlineClose/></button>
            <div className="w-full  ">
                
                <div className="space-y-1">
                    <h1>select category *</h1>
                    <select onChange={(e)=>categoryselect(e.target.value)} value={categoryid} className="border border-gray-400 rounded-md w-10/12 md:w-5/12 text-sm focus:outline-none py-1">
                        <option className="text-xs md:text-md">--Select Catgeory---</option>
                        {
                            catgeorytotal && catgeorytotal.Data.map((item,key)=>
                                
                                <option key={key} className="text-black text-xs md:text-md" value={item.id}>{item.categoryName}</option>
                            
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
                    productImageblob={props.productImageblob}
                    productImage={props.productImage}
                     
                />
                }   
            
            
           
        </div>
        </div>
    </div>   
    )
}
export default AddProductMain



