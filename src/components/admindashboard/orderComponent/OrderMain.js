import SideNav from "../sideNav"
import TableContent from "../table";
import { useState ,useEffect,useContext} from "react"
import {MobileHouseApi} from "helpers/axiosinstance";
import MainLayoutAdmin from "../MainLayoutAdmin";
const OrderMain=(props)=>{
   
    

   
    return(
        <div className="flex w-full h-screen overflow-auto z-20">
           
              <MainLayoutAdmin>
           
                
                <div className="mt-10">
                    
                       
                        <TableContent
                           
                            controller="CustomerOrder"
                            />

                    
                </div>
                
              </MainLayoutAdmin>
    </div>   
    )
}
export default OrderMain