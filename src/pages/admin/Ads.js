
import MainLayoutAdmin from "Layout/MainLayoutAdmin";
import TableContent from "components/admindashboard/table";

const Ads=()=>{

   
    return(
         <div className="flex">
             
            
            <MainLayoutAdmin>
            <TableContent
             controller="Ads"
            />
            </MainLayoutAdmin>
           
         </div>
    )
}
export default Ads