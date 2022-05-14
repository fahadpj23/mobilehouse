import React from 'react';
import SideNav from './sideNav';
const MainLayoutAdmin=({children})=>{
    return(
        <div className="w-screen flex">
        <div className="w-1/12">
            
            <SideNav/>
        </div>
        <div className="w-10/12">
            <main>{children}</main>
        </div>

       
        </div>
    )
}
export default MainLayoutAdmin