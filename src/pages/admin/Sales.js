

import MainLayoutAdmin from 'Layout/MainLayoutAdmin';
import TableContent from 'components/admindashboard/table';


const Sales=()=>{
   
    return(
         <div className="flex">
           
            
            <MainLayoutAdmin>
                <TableContent
                controller="Sales"
                />
            </MainLayoutAdmin>
           
            
         </div>
    )
}
export default Sales