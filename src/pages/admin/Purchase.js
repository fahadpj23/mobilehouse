import MainLayoutAdmin from 'components/admindashboard/MainLayoutAdmin';
import TableContent from 'components/admindashboard/table';

const Purchase=()=>{
   
    return(
        <div className="flex">
              
                 <MainLayoutAdmin>
                 <TableContent
                 controller="Purchase"
                 />
                 </MainLayoutAdmin>
              
           
       
        </div>
  
    )
}
export default Purchase