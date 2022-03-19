import { useState ,useEffect} from "react"
import AddAccessories from "./addaccessories"
import AddCover from "./addcover"
import AddHeadset from "./addheadset"
import AddPhone from "./addphone"
import { useHistory } from 'react-router-dom';
import SideNav from "../sideNav"
import MobileHouseApi from "../../../helpers/axiosinstance"
const AddProductMain=()=>{
    let history=useHistory();
    useEffect(()=>{
        if(catgeorytotal=="")
        {
            MobileHouseApi.get('/getCategory')
            .then((res)=>{
                setcatgeorytotal(res.data)
            })
        }
           
    })
    const [category, setcategory] = useState("")
    const [catgeorytotal, setcatgeorytotal] = useState("")

    const categoryselect=(catname)=>{
        setcategory(catname)
        catgeorytotal && catgeorytotal.map((item,key)=>{
                                
                 if(catname==item.categoryName)
                 {

                     MobileHouseApi.get("/categoryAttribute",{params:{"categoryid":item.id}})
                     .then((res)=>{
                        console.log(res.data)
                     })
                 }
                            
         } )
    }

    return(
        <div className="flex">
        <SideNav/>
        <div className="w-10/12">
        <div className="ml-5 mt-5">
            <div className="w-11/12  ">
                <div className="space-y-1">
                    <h1>select category *</h1>
                    <select onChange={(e)=>categoryselect(e.target.value)} value={category} className="border-2 border-gray-400 rounded-md w-5/12 text-sm focus:outline-none py-1">
                        <option>--Select Catgeory---</option>
                        {
                            catgeorytotal && catgeorytotal.map((item,key)=>
                                
                                <option className="text-black" value={item.categoryName}>{item.categoryName}</option>
                            
                            )
                        }
                        {/* <option value="cover">COVER</option>
                        <option value="accessories">ACCESSORIES</option>
                        <option value="phone">PHONE</option>
                        <option value="headset">HEADSET</option> */}
                    </select>
                </div>
                
            </div>
            <AddCover/>
            {/* {(() => {
                switch (catgeory) {
                case 'cover':
                    return <AddCover
                    setcatgeory={setcatgeory}
                    />;
                case 'accessories':
                    return <AddAccessories
                    setcatgeory={setcatgeory}
                    />
                case 'phone':
                    return <AddPhone
                    setcatgeory={setcatgeory}
                    />;
                case 'headset':
                    return <AddHeadset
                    setcatgeory={setcatgeory}
                    />        
                default:
                    return null;
                }
            })()} */}
        </div>
        </div>
    </div>   
    )
}
export default AddProductMain



