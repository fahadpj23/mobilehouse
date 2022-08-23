import { useState ,useEffect ,useRef} from "react"
import {MobileHouseApi} from "helpers/axiosinstance";
import { MdDelete } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

const BannerAdd=(props)=>{

    console.log(props.BannerImageArray)
    let imageDetails=""
    const [imageset,setimageset]=useState(false)
    const [imageposition,setimageposition]=useState("")
    const [imageDisplay,setimageDisplay]=useState("")
    const imageref=useRef("")
    const uploadimageButtonclick=(btindex)=>{
         setimageset(true)
    //    setimageIndex(btindex)
      imageref.current.click();
    }
    const uploadimage=(imagedetails)=>{
      
        console.log(imageposition)
         setimageset(false)
         imageDetails={position:imageposition ? imageposition : props.BannerImageArray.length+1,imageBlob:URL.createObjectURL(imagedetails.target.files[0]),image:imagedetails.target.files[0]}

         imageposition ?  props.BannerImageArray[+imageposition-1]=imageDetails   :props.BannerImageArray.push(imageDetails)
         setimageDisplay( imageposition ? props.BannerImageArray[+imageposition-1] : URL.createObjectURL(imagedetails.target.files[0]))
       
        
       }
    return(
        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                <div className="flex flex-col w-7/12 h-4/5 bg-white justify-between p-5 overflow-auto">
                    <div className="space-y-3 relative p-2">
                    <button onClick={()=>props.AddWindowClose()} className="absolute text-xl -right-1 -top-1 focus:outline-none"><AiOutlineClose/></button>
                    {
                        props.operation=="" ?
                        <div>
                            <img src={ props.BannerImageArray.length == 0 ?  "/uploadimage.png" :  props.BannerImageArray[props.BannerImageArray.length-1].imageBlob ? props.BannerImageArray[props.BannerImageArray.length-1].imageBlob : props.BannerImageArray[props.BannerImageArray.length-1].image && `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.BannerImageArray[props.BannerImageArray.length-1].image}` } alt="" className="object-contain h-48 w-full border mt-5 border-gray-400 rounded overflow-hidden" />
                            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-3">
                                <input onChange={(e)=>{uploadimage(e) }} ref={imageref} accept=".png,.jpg,.jpeg"  type="file" className="w-full hidden  border-2 border-gray-400 rounded-md h-8 px-1"  name="image" id="image" />
                                {
                                    props.BannerImageArray.map((item,key)=>{
                                        return(
                                            <button type="button" onClick={()=>(uploadimageButtonclick(),setimageposition(key+1))} className=" flex flex-col justify-center items-center  p-2 rounded border border-gray-400">
                                                {/* <img src={  "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" /> */}
                                                <img src={  props.BannerImageArray[key].imageBlob ? props.BannerImageArray[key].imageBlob : props.BannerImageArray[key].image ? `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.BannerImageArray[key].image}` : "/uploadimage.png"} alt="" className="object-contain h-24 w-24 overflow-hidden" />
                                            
                                            </button>
                                        )
                                    })
                                }
                                {/* when click on this button input type file will focus so we can add image */}
                                <button type="button" onClick={()=>(uploadimageButtonclick(),setimageposition(""))} className="  p-2 rounded border border-gray-400 flex flex-col justify-center items-center">
                                    <img src={  "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                    {/* <img src={  props.productImageblob[3] ? props.productImageblob[3] : props.productImage[3] ? `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.productImage[3]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" /> */}
                                        <h1>image </h1>
                                </button>
                            </div>
                        </div>
                        :
                                <div>
                                     <img src={ imageDisplay ? imageDisplay:`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.operationitem.image}` } alt="banner image" className="object-contain h-48 w-full border mt-5 border-gray-400 rounded overflow-hidden" />
                                     <input onChange={(e)=>{uploadimage(e) }} ref={imageref} accept=".png,.jpg,.jpeg"  type="file" className="w-full hidden  border-2 border-gray-400 rounded-md h-8 px-1"  name="image" id="image" />
                                     <button type="button" onClick={()=>uploadimageButtonclick()} className="  p-2 rounded mt-2 border border-gray-400 flex flex-col justify-center items-center">
                                        <img src={ imageDisplay ? imageDisplay: `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.operationitem.image}`} alt="banner image" className="object-contain h-16 w-16 overflow-hidden" />
                                        {/* <img src={  props.productImageblob[3] ? props.productImageblob[3] : props.productImage[3] ? `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.productImage[3]}` : "/uploadimage.png"} alt="" className="object-contain h-16 w-16 overflow-hidden" /> */}
                                            <h1>image </h1>
                                    </button>

                                </div>
                        }
                    </div>
                    <div className="w-full flex justify-end">
                        <button onClick={()=>props.BannerUpload()} className="w-6/12 md:w-2/12 bg-red-500 text-white rounded p-1 md:p-2">Save</button> 
                    </div> 


                </div>
        </div>
    )
}
export default BannerAdd