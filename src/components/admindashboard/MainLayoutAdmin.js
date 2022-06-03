import React from 'react';
import SideNav from './sideNav';
const MainLayoutAdmin=({children})=>{
    return(
        <div className="w-screen flex">
        <div className=" ">
            
            <SideNav/>
        </div>
        <div className="w-full">
            <main>{children}</main>
        </div>

       
        </div>
    )
}
export default MainLayoutAdmin