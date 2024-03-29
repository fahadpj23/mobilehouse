


import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaTruckMoving } from 'react-icons/fa';
import { FaCartArrowDown,FaShopify } from 'react-icons/fa';
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
    let navigate=useNavigate();
    const[sidenav,setsidenav]=useState(false)
  
    // const[currentitem,setcurrentitem]=useState(window.location.href.replace("http://localhost:3000/", ""))
  

    // const LinkAddress=window.location.href.replace("http://localhost:3000/", "")

    let urlWithoutParam=window.location.href.split('?')[0]
    const LinkAddress=urlWithoutParam.substring(urlWithoutParam.lastIndexOf("/") + 1, window.location.href.length)

    const logoutadminpanel=()=>{
        localStorage.removeItem('accessToken')
        window.location.reload(false);
    }
    console.log(urlWithoutParam)
    
    return(
       
             <div className={`${sidenav==true ?" space-y-4 flex flex-col justify-between  pl-3 relative  text-white bg-gray-600 h-screen px-5 transform duration-1000 pb-4 z-10 ": " space-y-4 flex flex-col   relative  pb-4 justify-between  text-white h-screen bg-gray-600 transform duration-700 -ml-1 sm:ml-0 -translate-x-16 sm:-translate-x-2  z-20 " }`}>
                 <button onClick={()=>setsidenav(!sidenav)} className={`bg-gray-600 text-white absolute top-0 -right-8 focus:outline-none text-xl p-2`}><GiHamburgerMenu/></button>
                {
                    sidenav==true ?
                    <div className='flex flex-col justify-between h-full'>
                        <div className='space-y-5 px-3 '>
                            <button onClick={()=>navigate({pathname:'/admin/Dashboard',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}  className={` w-full text-left ${LinkAddress=="Dashboard" && " text-blue-500 "  } focus:outline-none flex `}>Dashboard<AiFillDashboard className='mt-1 ml-2'/></button>
                            
                            <button onClick={()=>navigate({pathname:'/admin/orders',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}   className={` w-full text-left ${LinkAddress=="orders" && " text-blue-500 "  }focus:outline-none flex `}>orders<FaTruckMoving className='mt-1 ml-2'/></button>
                            <button onClick={()=>navigate({pathname:'/admin/Purchase',search: "?" + new URLSearchParams({pageNo: 1}).toString() })} className={` w-full text-left ${LinkAddress=="Purchase" && " text-blue-500 "  }focus:outline-none flex `}>Purchase<FaCartArrowDown className='mt-1 ml-2'/></button>
                            <button onClick={()=>navigate({pathname:'/admin/Product',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}   className={` w-full text-left ${LinkAddress=="Product" && " text-blue-500 "  }focus:outline-none flex `}>Product<FaProductHunt className='mt-1 ml-2'/></button>
                            <button onClick={()=>navigate({pathname:'/admin/Sales',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}   className={` w-full text-left ${LinkAddress=="Sales" && " text-blue-500 "  }focus:outline-none flex `}>Sales<FaShopify className='mt-1 ml-2'/></button>
                            <button onClick={()=>navigate({pathname:'/admin/category',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}   className={` w-full text-left ${LinkAddress=="category" && " text-blue-500 "  }focus:outline-none flex `}>category<CgListTree className='mt-1 ml-2'/></button>
                            <button onClick={()=>navigate({pathname:'/admin/Attribute',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}  className={` w-full text-left ${LinkAddress=="Attribute" && " text-blue-500 "  }focus:outline-none flex `}>Attribute <IoIosColorFilter className='mt-1 ml-2'/></button>
                            <button onClick={()=>navigate({pathname:'/admin/Supplier',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}  className={` w-full text-left ${LinkAddress=="Supplier" && " text-blue-500 "  }focus:outline-none flex `}>Supplier <IoIosPerson className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>navigate({pathname:'/admin/HsnCode',search: "?" + new URLSearchParams({pageNo: 1}).toString() })} className={` w-full text-left ${LinkAddress=="HsnCode" && " text-blue-500 "  } focus:outline-none flex `}>HsnCode <GiPayMoney className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>navigate({pathname:'/admin/Heading',search: "?" + new URLSearchParams({pageNo: 1}).toString() })} className={` w-full text-left ${LinkAddress=="Heading" && " text-blue-500 "  } focus:outline-none flex `}>Heading <BsCardHeading className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>navigate({pathname:'/admin/Banner',search: "?" + new URLSearchParams({pageNo: 1}).toString() })} className={` w-full text-left ${LinkAddress=="Banner" && " text-blue-500 "  } focus:outline-none flex `}>Banner <SiBrandfolder className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>navigate({pathname:'/admin/Ads',search: "?" + new URLSearchParams({pageNo: 1}).toString() })} className={` w-full text-left ${LinkAddress=="Ads" && " text-blue-500 "  } focus:outline-none flex `}>Ads <RiAdvertisementLine className='mt-1 ml-2 '/></button>
                            {/* <button  onClick={()=>navigate("/admin/HsnCode")}className={` w-full text-left ${LinkAddress=="Dashboard" && " text-blue-500 "  }focus:outline-none flex `}>HsnCode <SiBrandfolder className='mt-1 ml-2 '/></button> */}

                        </div>
                        <button onClick={()=>logoutadminpanel()} className='w-full focus:outline-none flex items-center  space-x-2 text-left pl-6 text-sm tracking-wider font-semibold'><h1 className={`${sidenav==true ? "block" : "hidden"}`} >LOGOUT</h1><h1 className=' text-lg '><FiLogOut/></h1></button>

                       </div>
                        :
                        <div  className='flex flex-col justify-between h-full'>
                            <div className='space-y-5 px-5 text-xl'>
                                <button  onClick={()=>navigate({pathname:'/admin/Dashboard',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}  className={` mt-10 w-full ${LinkAddress=="Dashboard" && " text-blue-500 "  } focus:outline-none flex justify-center`}><AiFillDashboard/></button>
                                <button onClick={()=>navigate({pathname:'/admin/orders',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}   className={` w-full ${LinkAddress=="orders" && " text-blue-500 "  } focus:outline-none flex justify-center`}><FaTruckMoving/></button>
                                <button onClick={()=>navigate({pathname:'/admin/Purchase',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}className={` w-full ${LinkAddress=="Purchase" && " text-blue-500 "  } focus:outline-none flex justify-center`}><FaCartArrowDown/></button>
                                <button onClick={()=>navigate({pathname:'/admin/Product',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}   className={` w-full ${LinkAddress=="Product" && " text-blue-500 "  } focus:outline-none flex justify-center`}><FaProductHunt/></button>
                                <button onClick={()=>navigate({pathname:'/admin/Sales',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}   className={` w-full ${LinkAddress=="Sales" && " text-blue-500 "  } focus:outline-none flex justify-center`}><FaShopify/></button>
                                <button  onClick={()=>navigate({pathname:'/admin/category',search: "?" + new URLSearchParams({pageNo: 1}).toString() })} className={` w-full ${LinkAddress=="category" && " text-blue-500 "  } focus:outline-none flex justify-center`}><CgListTree/></button>
                                <button  onClick={()=>navigate({pathname:'/admin/Attribute',search: "?" + new URLSearchParams({pageNo: 1}).toString() })} className={` w-full ${LinkAddress=="Attribute" && " text-blue-500 "  } focus:outline-none flex justify-center`}><IoIosColorFilter/> </button>
                                <button  onClick={()=>navigate({pathname:'/admin/Supplier',search: "?" + new URLSearchParams({pageNo: 1}).toString() })} className={` w-full ${LinkAddress=="Supplier" && " text-blue-500 "  } focus:outline-none flex justify-center`}> <IoIosPerson className='mt-1 ml-2 text-white bg-red-200'/></button>
                                <button  onClick={()=>navigate({pathname:'/admin/HsnCode',search: "?" + new URLSearchParams({pageNo: 1}).toString() })}className={` w-full ${LinkAddress=="HsnCode" && " text-blue-500 "  } focus:outline-none flex justify-center`}> <GiPayMoney className='mt-1 ml-2 '/></button>
                                <button  onClick={()=>navigate({pathname:'/admin/Heading',search: "?" + new URLSearchParams({pageNo: 1}).toString() })} className={` w-full ${LinkAddress=="Heading" && " text-blue-500 "  } focus:outline-none flex justify-center`}> <BsCardHeading className='mt-1 ml-2 '/></button>
                                <button  onClick={()=>navigate({pathname:'/admin/Banner',search: "?" + new URLSearchParams({pageNo: 1}).toString() })} className={` w-full ${LinkAddress=="Banner" && " text-blue-500 "  } focus:outline-none flex justify-center`}> <SiBrandfolder className='mt-1 ml-2 '/></button>
                                <button  onClick={()=>navigate({pathname:'/admin/Ads',search: "?" + new URLSearchParams({pageNo: 1}).toString() })} className={` w-full ${LinkAddress=="ads" && " text-blue-500 "  } focus:outline-none flex justify-center`}> <RiAdvertisementLine className='mt-1 ml-2 '/></button>

                            </div>
                        <button onClick={()=>logoutadminpanel()} className='w-full focus:outline-none flex items-center  space-x-2 text-left pl-6 text-sm tracking-wider font-semibold'><h1 className={`${sidenav==true ? "block" : "hidden"}`} >LOGOUT</h1><h1 className=' text-lg '><FiLogOut/></h1></button>

                        </div>
                    }
      
   
             </div>
       
    )
}
export default SideNav