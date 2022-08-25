import React from 'react';
import SideNav from './sideNav';
const MainLayoutAdmin=({children})=>{
    return(
        <div className="w-screen h-screen flex relative ">
        <div className=" absolute left-0 ">
            
            <SideNav/>

        </div>
        <div className=" h-fixedNoNav3 overflow-auto  md:ml-16 w-full ">
            
            <main>{children}</main>
        </div>

       
        </div>
    )
}
export default MainLayoutAdmin