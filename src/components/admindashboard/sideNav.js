import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaTruckMoving } from 'react-icons/fa';
import { FaCartArrowDown } from 'react-icons/fa';
import { FaProductHunt } from 'react-icons/fa';
import { CgListTree } from 'react-icons/cg';
import { IoIosColorFilter } from 'react-icons/io';
import { GiHamburgerMenu,GiPayMoney } from 'react-icons/gi';
import { IoIosPerson } from 'react-icons/io';
import { SiBrandfolder } from 'react-icons/si';
import { BsCardHeading } from 'react-icons/bs';
import { MdSlideshow } from 'react-icons/md';
import { RiAdvertisementLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';

const SideNav=()=>{
    let history=useHistory();
    const[sidenav,setsidenav]=useState(false)
  
    // const[currentitem,setcurrentitem]=useState(window.location.href.replace("http://localhost:3000/", ""))
  

    // const LinkAddress=window.location.href.replace("http://localhost:3000/", "")

      
    const[currentitem,setcurrentitem]=useState(window.location.href.substring(window.location.href.lastIndexOf("/") + 1, window.location.href.length))
    const LinkAddress=window.location.href.substring(window.location.href.lastIndexOf("/") + 1, window.location.href.length)
    const logoutadminpanel=()=>{
        localStorage.removeItem('accessToken')
        window.location.reload(false);
    }
    return(
       
             <div className={`${sidenav==true ?" space-y-4 flex flex-col justify-between  pl-3 relative  text-white bg-gray-600 h-screen px-5 transform duration-1000 pb-4  ": " space-y-4 flex flex-col  pl-3 relative  pb-4 justify-between  text-white h-screen bg-gray-600 transform duration-1000 -translate-x-6 sm:-translate-x-2  " }`}>
                 <button onClick={()=>setsidenav(!sidenav)} className=' bg-gray-600 text-white absolute top-0 -right-8 focus:outline-none text-xl p-2'><GiHamburgerMenu/></button>
                {
                    sidenav==true ? 
                        <div className='space-y-5 px-3 '>
                            <button onClick={()=>history.push("/admin/Dashboard")}  className={` w-full text-left ${LinkAddress=="Dashboard" && " text-blue-500 "  } focus:outline-none flex `}>Dashboard<AiFillDashboard className='mt-1 ml-2'/></button>
                            {/* <button onClick={()=>history.push("/admin/orders")}  className={` w-full text-left ${LinkAddress=="orders" && " text-blue-500 "  }focus:outline-none flex `}>orders<FaTruckMoving className='mt-1 ml-2'/></button> */}
                            <button onClick={()=>history.push("/admin/Purchase")} className={` w-full text-left ${LinkAddress=="Purchase" && " text-blue-500 "  }focus:outline-none flex `}>Purchase<FaCartArrowDown className='mt-1 ml-2'/></button>
                            <button onClick={()=>history.push("/admin/Product")} className={` w-full text-left ${LinkAddress=="Product" && " text-blue-500 "  }focus:outline-none flex `}>Product<FaProductHunt className='mt-1 ml-2'/></button>
                            <button  onClick={()=>history.push("/admin/category")}className={` w-full text-left ${LinkAddress=="category" && " text-blue-500 "  }focus:outline-none flex `}>category<CgListTree className='mt-1 ml-2'/></button>
                            <button  onClick={()=>history.push("/admin/Attribute")}className={` w-full text-left ${LinkAddress=="Attribute" && " text-blue-500 "  }focus:outline-none flex `}>Attribute <IoIosColorFilter className='mt-1 ml-2'/></button>
                            <button  onClick={()=>history.push("/admin/Supplier")}className={` w-full text-left ${LinkAddress=="Supplier" && " text-blue-500 "  }focus:outline-none flex `}>Supplier <IoIosPerson className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/admin/HsnCode")}className={` w-full text-left ${LinkAddress=="HsnCode" && " text-blue-500 "  } focus:outline-none flex `}>HsnCode <GiPayMoney className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/admin/Heading")}className={` w-full text-left ${LinkAddress=="Heading" && " text-blue-500 "  } focus:outline-none flex `}>Heading <BsCardHeading className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/admin/Banner")}className={` w-full text-left ${LinkAddress=="Banner" && " text-blue-500 "  } focus:outline-none flex `}>Banner <MdSlideshow className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/admin/Ads")}className={` w-full text-left ${LinkAddress=="Ads" && " text-blue-500 "  } focus:outline-none flex `}>Ads <RiAdvertisementLine className='mt-1 ml-2 '/></button>
                            {/* <button  onClick={()=>history.push("/admin/HsnCode")}className={` w-full text-left ${LinkAddress=="Dashboard" && " text-blue-500 "  }focus:outline-none flex `}>HsnCode <SiBrandfolder className='mt-1 ml-2 '/></button> */}

                        </div>
                       
                    :
                        <div className='space-y-5 px-5 text-xl'>
                            <button onClick={()=>history.push("/admin/Dashboard")}  className={` mt-10 w-full ${LinkAddress=="Dashboard" && " text-blue-500 "  } focus:outline-none flex justify-center`}><AiFillDashboard/></button>
                            {/* <button onClick={()=>history.push("/admin/orders")}  className={` w-full ${LinkAddress=="orders" && " text-blue-500 "  } focus:outline-none flex justify-center`}><FaTruckMoving/></button> */}
                            <button onClick={()=>history.push("/admin/Purchase")} className={` w-full ${LinkAddress=="Purchase" && " text-blue-500 "  } focus:outline-none flex justify-center`}><FaCartArrowDown/></button>
                            <button onClick={()=>history.push("/admin/Product")} className={` w-full ${LinkAddress=="Product" && " text-blue-500 "  } focus:outline-none flex justify-center`}><FaProductHunt/></button>
                            <button  onClick={()=>history.push("/admin/category")}className={` w-full ${LinkAddress=="category" && " text-blue-500 "  } focus:outline-none flex justify-center`}><CgListTree/></button>
                            <button  onClick={()=>history.push("/admin/Attribute")}className={` w-full ${LinkAddress=="Attribute" && " text-blue-500 "  } focus:outline-none flex justify-center`}><IoIosColorFilter/> </button>
                            <button  onClick={()=>history.push("/admin/Supplier")}className={` w-full ${LinkAddress=="Supplier" && " text-blue-500 "  } focus:outline-none flex justify-center`}> <IoIosPerson className='mt-1 ml-2 text-white bg-red-200'/></button>
                            <button  onClick={()=>history.push("/admin/Brand")}className={` w-full ${LinkAddress=="HsnCode" && " text-blue-500 "  } focus:outline-none flex justify-center`}> <SiBrandfolder className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/admin/Brand")}className={` w-full ${LinkAddress=="Heading" && " text-blue-500 "  } focus:outline-none flex justify-center`}> <BsCardHeading className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/admin/Banner")}className={` w-full ${LinkAddress=="Banner" && " text-blue-500 "  } focus:outline-none flex justify-center`}> <MdSlideshow className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/admin/Ads")}className={` w-full ${LinkAddress=="ads" && " text-blue-500 "  } focus:outline-none flex justify-center`}> <RiAdvertisementLine className='mt-1 ml-2 '/></button>

                        </div>

                }
   
               <button onClick={()=>logoutadminpanel()} className='w-full focus:outline-none flex items-center  space-x-2 text-left pl-3 text-sm tracking-wider font-semibold'><h1 className={`${sidenav==true ? "block" : "hidden"}`} >LOGOUT</h1><h1 className=' text-lg '><FiLogOut/></h1></button>
             </div>
       
    )
}
export default SideNav