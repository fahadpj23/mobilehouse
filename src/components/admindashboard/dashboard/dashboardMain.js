import SideNav from "../sideNav"
import DetailsBox from "./detailBox"
import ChartLine from "./chartline"
const DashboardMain=()=>{
    return(
        <div className="flex w-full">
        
          
                <SideNav/>
         
            <div className="w-9/12 lg:w-10/12 overflow-auto p-3 space-y-5">
                <div className="flex w-full justify-between space-x-4">
                    <div className="w-full bg-green-500 text-white rounded-xl shadow-lg p-3">
                        <DetailsBox
                        head="Total Sales"
                        amount="500"
                        />
                    </div> 
                    <div className="w-full bg-blue-600 text-white rounded-xl shadow-lg p-3">
                        <DetailsBox
                        head="Total Purchase"
                        amount="500"
                        />
                    </div> 
                    <div className="w-full bg-red-500 text-white rounded-xl shadow-lg p-3">
                        <DetailsBox
                        head="Total Orders"
                        amount="500"
                        />
                    </div> 
                    <div className="w-full bg-yellow-400 text-white rounded-xl shadow-lg p-3">
                        <DetailsBox
                        head="Total Revenue"
                        amount="500"
                        />
                    </div> 
                 
                </div>
                <ChartLine/>

            </div>
    </div>
        
    )   
}
export default DashboardMain