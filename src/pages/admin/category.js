
import TableContent from 'components/admindashboard/table';
import MainLayoutAdmin from "Layout/MainLayoutAdmin";
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