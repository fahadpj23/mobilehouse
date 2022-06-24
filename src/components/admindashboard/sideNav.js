import { useHistory } from 'react-router-dom';
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

const SideNav=()=>{
    let history=useHistory();
    const[sidenav,setsidenav]=useState(true)
    const[currentitem,setcurrentitem]=useState(window.location.href.replace("http://localhost:3000/", ""))
    console.log(currentitem)

    return(
       
             <div className={`${sidenav==true ?" space-y-4 flex flex-col  pl-3 relative  text-white bg-gray-600 h-screen px-5 transform duration-1000  ": " space-y-4 flex flex-col  pl-3 relative   text-white h-screen bg-gray-600 transform duration-1000 -translate-x-2  " }`}>
                 <button onClick={()=>setsidenav(!sidenav)} className=' bg-gray-600 text-white absolute top-0 -right-8 focus:outline-none text-xl p-2'><GiHamburgerMenu/></button>
                {
                    sidenav==true ? 
                        <div className='space-y-5 px-3 '>
                            <button onClick={()=>history.push("/Dashboard")}  className=" w-full text-left focus:outline-none flex ">Dashboard<AiFillDashboard className='mt-1 ml-2'/></button>
                            <button onClick={()=>history.push("/orders")}  className=" w-full text-left focus:outline-none flex">orders<FaTruckMoving className='mt-1 ml-2'/></button>
                            <button onClick={()=>history.push("/Purchase")} className="w-full text-left focus:outline-none flex">Purchase<FaCartArrowDown className='mt-1 ml-2'/></button>
                            <button onClick={()=>history.push("/Product")} className=" w-full text-left focus:outline-none flex">Product<FaProductHunt className='mt-1 ml-2'/></button>
                            <button  onClick={()=>history.push("/category")}className=" w-full text-left focus:outline-none flex">category<CgListTree className='mt-1 ml-2'/></button>
                            <button  onClick={()=>history.push("/Attribute")}className=" w-full text-left focus:outline-none flex">Attribute <IoIosColorFilter className='mt-1 ml-2'/></button>
                            <button  onClick={()=>history.push("/Supplier")}className=" w-full text-left focus:outline-none flex">Supplier <IoIosPerson className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/HsnCode")}className=" w-full text-left focus:outline-none flex">HsnCode <GiPayMoney className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/Heading")}className=" w-full text-left focus:outline-none flex">Heading <BsCardHeading className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/Banner")}className=" w-full text-left focus:outline-none flex">Banner <MdSlideshow className='mt-1 ml-2 '/></button>
                            {/* <button  onClick={()=>history.push("/HsnCode")}className=" w-full text-left focus:outline-none flex">HsnCode <SiBrandfolder className='mt-1 ml-2 '/></button> */}

                        </div>
                       
                    :
                        <div className='space-y-5 px-5 text-xl'>
                            <button onClick={()=>history.push("/Dashboard")}  className=" mt-10 w-full  focus:outline-none flex justify-center"><AiFillDashboard/></button>
                            <button onClick={()=>history.push("/orders")}  className=" w-full text-left focus:outline-none flex justify-center"><FaTruckMoving/></button>
                            <button onClick={()=>history.push("/orders")} className="w-full text-left focus:outline-none flex justify-center"><FaCartArrowDown/></button>
                            <button onClick={()=>history.push("/Product")} className=" w-full text-left focus:outline-none flex justify-center"><FaProductHunt/></button>
                            <button  onClick={()=>history.push("/category")}className=" w-full text-left focus:outline-none flex justify-center"><CgListTree/></button>
                            <button  onClick={()=>history.push("/Attribute")}className=" w-full text-left focus:outline-none text-white flex justify-center"><IoIosColorFilter/> </button>
                            <button  onClick={()=>history.push("/Supplier")}className=" w-full text-left focus:outline-none flex justify-center"> <IoIosPerson className='mt-1 ml-2 text-white bg-red-200'/></button>
                            <button  onClick={()=>history.push("/Brand")}className=" w-full text-left focus:outline-none flex justify-center"> <SiBrandfolder className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/Brand")}className=" w-full text-left focus:outline-none flex justify-center"> <BsCardHeading className='mt-1 ml-2 '/></button>
                            <button  onClick={()=>history.push("/Banner")}className=" w-full text-left focus:outline-none flex justify-center"> <MdSlideshow className='mt-1 ml-2 '/></button>

                        </div>

                }
               
             </div>
       
    )
}
export default SideNav