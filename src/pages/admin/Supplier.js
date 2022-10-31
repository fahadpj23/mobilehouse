import MainLayoutAdmin from 'components/admindashboard/MainLayoutAdmin';
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