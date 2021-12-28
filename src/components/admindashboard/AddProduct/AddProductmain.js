import { useState } from "react"
import AddAccessories from "./addaccessories"
import AddCover from "./addcover"
import AddHeadset from "./addheadset"
import AddPhone from "./addphone"
import { useHistory } from 'react-router-dom';
import SideNav from "../sideNav"
const AddProductMain=()=>{
    let history=useHistory();
    const [catgeory, setcatgeory] = useState("")
    return(
        <div className="flex">
        <SideNav/>
        <div className="w-10/12">
        <div className="ml-5 mt-5">
            <div className="w-11/12  ">
                <div className="space-y-1">
                    <h1>select category *</h1>
                    <select onChange={(e)=>setcatgeory(e.target.value)} className="border-2 border-gray-400 rounded-md w-5/12 text-sm focus:outline-none py-1">
                        <option>--Select Catgeory---</option>
                        <option value="cover">COVER</option>
                        <option value="accessories">ACCESSORIES</option>
                        <option value="phone">PHONE</option>
                        <option value="headset">HEADSET</option>
                    </select>
                </div>
                
            </div>
            {(() => {
                switch (catgeory) {
                case 'cover':
                    return <AddCover/>;
                case 'accessories':
                    return <AddAccessories/>
                case 'phone':
                    return <AddPhone/>;
                case 'headset':
                    return <AddHeadset/>        
                default:
                    return null;
                }
            })()}
        </div>
        </div>
    </div>   
    )
}
export default AddProductMain



