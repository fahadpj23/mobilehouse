import SideNav from "../sideNav"
import DetailsBox from "./detailBox"
const DashboardMain=()=>{
    return(
        <div className="flex w-full">
        
          
                <SideNav/>
         
            <div className="w-9/12 lg:w-10/12 overflow-auto p-3">
                <div className="flex w-full justify-between">  
                    <DetailsBox/>
                    <DetailsBox/>
                    <DetailsBox/>
                    <DetailsBox/>
                </div>

            </div>
    </div>
        
    )   
}
export default DashboardMain