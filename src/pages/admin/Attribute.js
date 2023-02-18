
import MainLayoutAdmin from "Layout/MainLayoutAdmin";
import TableContent from "components/admindashboard/table";

const Attribute=()=>{
   
    return(
         <div className="flex">
            
                 <MainLayoutAdmin>
                 <TableContent
                  controller="attribute"
                 />
                 </MainLayoutAdmin>
              
               
               
         
         </div>
    )
}
export default Attribute