import MainLayoutAdmin from 'Layout/MainLayoutAdmin';
import TableContent from 'components/admindashboard/table';

const Supplier=()=>{
    
    return(
        <div className="flex">
             
              
              <MainLayoutAdmin>
                 <TableContent
                     controller="Supplier"
                 />
                 </MainLayoutAdmin>
           
            
         </div>
       
    )
}
export default Supplier