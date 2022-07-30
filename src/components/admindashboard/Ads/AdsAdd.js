import { useState ,useEffect ,useRef} from "react"
import MobileHouseApi from "helpers/axiosinstance"
import { MdDelete } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import Paths from 'helpers/path'
const AdsAdd=(props)=>{
    let imageDetails=""
    const [imageset,setimageset]=useState(false)
    const [position,setposition]=useState("")
    const [Brand,setBrand ]=useState("")
    const [editok,seteditok ]=useState(false)
    const [BrandAdd,setBrandAdd ]=useState(false)

    const imageref=useRef("")
    const uploadimageButtonclick=(btindex)=>{
         setimageset(true)
      imageref.current.click();
    }

    const uploadimage=(imagedetails)=>{
         setimageset(false)
         imageDetails={position:position+1,imageBlob:URL.createObjectURL(imagedetails.target.files[0]),image:imagedetails.target.files[0],Brand: props.AdsImageArray[position] && props.AdsImageArray[position].Brand ? props.AdsImageArray[position].Brand : ""}

         props.AdsImageArray[position]=imageDetails

       }

    const addBrand=(position,value)=>{
        if(props.AdsImageArray[position])
        {
            props.AdsImageArray[position].Brand=value
            console.log(props.AdsImageArray)
            setBrandAdd(!BrandAdd)
        }
        else
        {
            console.log("Add image first")
        }
       
    }

    useEffect(()=>{

        if(Brand=="")
        {
           
            MobileHouseApi.get('/getAdsBrand',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                setBrand(res.data.Brand)
                console.log(res.data.Brand)
            })
            .catch((err) => { console.log(err) });
        }

        if(props.operation=="edit")
        {
            MobileHouseApi.get('/getAdsEdit',{params:{id:props.operationid},headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
                props.setstatus(res.data.AdsDetails[0].status)
                res.data.AdsDetails[0].details &&  res.data.AdsDetails[0].details.map((item,key)=>{
                    imageDetails={position:key+1,imageBlob:"",image:item.image,Brand:item.brand}
                    props.AdsImageArray[key]=imageDetails
                })
                seteditok(true)
                 console.log(props.AdsImageArray)
            })
           
        }
    },[])
   
    return(
        <div className="w-full h-full flex items-center bg-opacity-95  justify-end md:justify-center bg-gray-100 fixed top-0 pr-3 md:pr-0">
                <div className="flex flex-col w-11/12  md:w-7/12 h-4/5 bg-white justify-between p-5 overflow-auto">
                    <div className="space-y-3 relative p-2">
                    <button onClick={()=>props.setaddAds(false)} className="absolute text-xl -right-1 -top-1 focus:outline-none"><AiOutlineClose/></button>
                        {/* <img src={ props.AdsImageArray.length == 0 ?  "/uploadimage.png" :  props.AdsImageArray[props.AdsImageArray.length-1].imageBlob ? props.AdsImageArray[props.AdsImageArray.length-1].imageBlob : props.AdsImageArray[props.AdsImageArray.length-1].image && `http://localhost:9000/images/${props.AdsImageArray[props.AdsImageArray.length-1].image}` } alt="" className="object-contain h-48 w-full border mt-5 border-gray-400 rounded overflow-hidden" /> */}
                        <select className="border border-gray-400 rounded py-1 w-4/12">
                                <option value="1">Active</option>
                                <option value="0">Disable</option>
                            </select>
                            
                        <div className="flex justify-between space-x-2">
                           
                            <input onChange={(e)=>{uploadimage(e) }} ref={imageref} accept=".png,.jpg,.jpeg"  type="file" className="w-full hidden  border-2 border-gray-400 rounded-md h-8 px-1"  name="image" id="image" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-3">
                           {[...Array(3)].map((item,key)=>{
                            return(
                                <div className="space-y-2 w-10/12 ">
                                    <button type="button" onClick={()=>(uploadimageButtonclick(),setposition(key))} className="  p-2 rounded border w-full border-gray-400 flex flex-col justify-center items-center">
                                        {/* <img src={  "/uploadimage.png"} alt="" className="object-contain h-48 w-4/12  overflow-hidden" /> */}
                                        <img src={ props.AdsImageArray[key] ? props.AdsImageArray[key].imageBlob ? props.AdsImageArray[key].imageBlob : props.AdsImageArray[key].image && `${Paths.ImagePath}/${props.AdsImageArray[key].image}`  : "/uploadimage.png"} alt="" className="object-fill h-48 w-full  overflow-hidden" />
                                        
                                    </button>
                                    {
                                        Brand && <select value={props.AdsImageArray[key]?.Brand} onChange={(e)=>addBrand(key,e.target.value)} className="w-full border border-gray-400 rounded focus:outline-none text-sm py-1">
                                            <option>--select--</option>
                                            {Brand.map((item1,key1)=>{
                                                return(
                                                    <option className="text-sm">{item1.Brand}</option>
                                                )
                                            
                                            })}
                                        </select>
                                    }
                                </div>
                            )
                           })}
                           </div>
                        
                            
                        </div>
                       
                    </div>
                    <div className="w-full flex justify-end">
                        <button onClick={()=>props.AdsUpload()} className="w-5/12 md:w-2/12 bg-red-500 text-white rounded p-2">Save</button> 
                    </div> 


                </div>
        </div>
    )
}
export default AdsAdd