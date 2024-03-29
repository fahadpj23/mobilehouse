import SideNav from "../sideNav"
import DetailsBox from "./detailBox"
import ChartLine from "./chartline"
import { RiRefund2Line } from 'react-icons/ri';
import { MdShoppingBasket } from 'react-icons/md';
import { FaTruck } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';
const DashboardMain=()=>{
    return(
        <div className="flex w-full relative">
        
           
                <SideNav/>
         
            <div className="w-full h-fixedNoNav3  p-3 space-y-5 mt-7   overflow-auto">
                <div className="grid grid-cols-1  md:grid-cols-4 gap-4 w-full justify-between ">
                    <div className="w-full bg-green-500 text-white rounded-xl shadow-lg p-3 flex items-center justify-center">
                        <RiRefund2Line className="text-3xl"/>
                        <DetailsBox
                        head="Total Sales"
                        amount="500"
                        />
                    </div> 
                    <div className="w-full bg-blue-600 text-white rounded-xl shadow-lg p-3 flex items-center justify-center">
                        <MdShoppingBasket className="text-3xl"/>
                        <DetailsBox
                        head="Total Purchase"
                        amount="500"
                        />
                    </div> 
                    <div className="w-full bg-red-500 text-white rounded-xl shadow-lg p-3 flex items-center justify-center">
                        <FaTruck className="text-3xl"/>
                        <DetailsBox
                        head="Total Orders"
                        amount="500"
                        />
                    </div> 
                    <div className="w-full bg-yellow-400 text-white rounded-xl shadow-lg p-3 flex items-center justify-center">
                        <GiCash className="text-3xl"/>
                        <DetailsBox
                        head="Total Revenue"
                        amount="500"
                        />
                    </div> 
                 
                </div>
                    <div className="grid  grid-cols-1 md:grid-cols-2 w-full gap-6">
                        <div className="w-full md:w-8/12">
                            <ChartLine
                             head="Total Sales"
                            />
                        </div>
                        <div className="w-full md:w-8/12">
                            <ChartLine
                             head="Total Purchase"
                            />
                        </div>
                        
                    
                   
                   
                        <div className="w-full md:w-8/12">
                            <ChartLine
                             head="Total Orders"
                            />
                        </div>
                        <div className="w-full md:w-8/12">
                            <ChartLine
                             head="Total Revenue"
                            />
                        </div>
                        
                    </div> 
                   
                    
                
                   
               
               

            </div>
    </div>
        
    )   
}
export default DashboardMain