
import TableContent from 'components/admindashboard/table';
import MainLayoutAdmin from "components/admindashboard/MainLayoutAdmin";
const Category=()=>{
   
   

    return( 
         <div className="flex">
           
                 <MainLayoutAdmin>
                 <TableContent
                 controller="category"
                 />
                 </MainLayoutAdmin>
              
        
         </div>
    )
}
export default Category