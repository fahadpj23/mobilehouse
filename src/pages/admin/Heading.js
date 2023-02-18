

import MainLayoutAdmin from 'Layout/MainLayoutAdmin';
import TableContent from 'components/admindashboard/table';


const Heading=()=>{


 
    return( 
         <div className="flex">
             
                  <MainLayoutAdmin>
                  <TableContent
                  controller="Heading"
                  />
                  </MainLayoutAdmin>
         
         </div>
    )
}
export default Heading