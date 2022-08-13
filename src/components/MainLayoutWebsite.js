import React from 'react';
import Nav from './Home/Nav';
import { SiWhatsapp } from 'react-icons/si';

const MainLayoutWebsite=({children})=>{
    return(
        <div className="w-full  h-full">
      
            
        <Nav/>

     
         <main>{children}</main>
      
             <a className='bg-green-600 rounded-full fixed bottom-10 right-8 p-2 md:p-3 animate-bounce' href={`https://wa.me/+919745286899?text=${document.location.href}`} target="_blank"><h1><SiWhatsapp className='text-white text-2xl'/></h1></a> 


     
       
        </div>
    )
}
export default MainLayoutWebsite