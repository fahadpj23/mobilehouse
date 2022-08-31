
import { FaRegUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import Myorder from './myorder';
import PersonalInformation from './Personal_Information';
import {  useHistory } from 'react-router-dom';

 
const ProfileMain=()=>{
    let history=useHistory();
    const [sidenavValue,setsidenavValue]=useState(1)

    const userLogout=()=>{
        localStorage.removeItem('UserName')
        localStorage.removeItem('UserToken')
        history.push('/')
        window.location.reload(false);

    }   
    console.log(sidenavValue)
    return(
        <div className="md:flex h-fixedNoNavlg6 px-2">
            <div className="w-full md:w-2/12 flex flex-col px-2 justify-between h-full">
                <div className=" space-y-3 w-full flex flex-col">
                    <button   className="border border-gray-400 rounded py-2 focus:outline-none flex items-center justify-center space-x-2 "><span className=''><FaRegUserCircle className='text-2xl h-full '/></span><span></span>Hi,<span className='font-semibold'>{localStorage.getItem('UserName')}</span></button>
                    <button  onClick={()=>sidenavValue==1 ? setsidenavValue(""): setsidenavValue(1)} className="border border-gray-400 rounded py-2 focus:outline-none">My Order</button>
                    {
                        sidenavValue && sidenavValue==1 &&
                                <div className='block md:hidden'><Myorder/></div>
                    }
                    <button  onClick={()=>sidenavValue==2 ?  setsidenavValue("") : setsidenavValue(2)} className="border border-gray-400 rounded py-2 focus:outline-none">Personal Information</button>
                    {
                        sidenavValue && sidenavValue==2&&
                                <div className='block md:hidden'><PersonalInformation/></div>
                    }
                    <button  onClick={()=>sidenavValue==3 ? setsidenavValue("") : setsidenavValue(3)} className="border border-gray-400 rounded py-2 focus:outline-none">Address</button>
                    {
                        sidenavValue && sidenavValue==3 &&
                                <div className='block md:hidden'>dsdsd</div>
                    }
                    <button  onClick={()=>sidenavValue==4 ? setsidenavValue("") : setsidenavValue(4)} className="border border-gray-400 rounded py-2 focus:outline-none">Cart</button>
                    {
                        sidenavValue && sidenavValue==4 &&
                                <div className='block md:hidden'>dsdsd</div>
                    }
                </div>
                    <button onClick={()=>userLogout()}  className="border border-gray-400 rounded py-2 focus:outline-none">Log Out</button>
                   
            </div>
            <div className="w-10/12 h-full overflow-auto">
                    <div className="h-full rounded hidden md:block">
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
                                <div><PersonalInformation/></div>
                                )
                                break;
                            case 3:
                            return ( 
                                <div>Case 3</div>
                                )
                                break;
                            case 4:
                                    return ( 
                                        <div>Case4</div>
                                        )
                                        break;
                             default: return(
                                    <div>
                                        
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