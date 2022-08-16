
import { FaRegUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import Myorder from './myorder';
const ProfileMain=()=>{

    const [sidenavValue,setsidenavValue]=useState(1)

    return(
        <div className="flex h-fixedNoNavlg6 px-2">
            <div className="w-2/12 flex flex-col px-2 justify-between h-full">
                <div className=" space-y-3 w-full flex flex-col">
                    <button   className="border border-gray-400 rounded py-2 focus:outline-none flex items-center justify-center space-x-2 "><span className=''><FaRegUserCircle className='text-2xl h-full '/></span><span></span>Hi,<span className='font-semibold'>{localStorage.getItem('UserName')}</span></button>
                    <button  onClick={()=>setsidenavValue(1)} className="border border-gray-400 rounded py-2 focus:outline-none">My Order</button>
                    <button  onClick={()=>setsidenavValue(2)} className="border border-gray-400 rounded py-2 focus:outline-none">Personal Information</button>
                    <button  onClick={()=>setsidenavValue(3)} className="border border-gray-400 rounded py-2 focus:outline-none">Address</button>
                    <button  onClick={()=>setsidenavValue(4)} className="border border-gray-400 rounded py-2 focus:outline-none">Cart</button>
                </div>
                    <button   className="border border-gray-400 rounded py-2 focus:outline-none">Log Out</button>
                   
            </div>
            <div className="w-10/12 h-full overflow-auto">
                    <div className="h-full rounded ">
                    {   
                        (() => {
                            switch (sidenavValue) {
                                case 1:
                                    return (
                                        <div><Myorder/></div>
                                    )
                                break;
                            case 2: 
                            return ( 
                                <div>Case 2</div>
                                )
                                break;
                            case 3:
                            return ( 
                                <div>Case 3</div>
                                )
                                break;
                             default: return(
                                    <div>
                                        <h1>dsdsd</h1>
                                    </div>
                                )
                            }
                           
                        })()}
                    </div>
            </div>
        </div>
    )
}
export default ProfileMain