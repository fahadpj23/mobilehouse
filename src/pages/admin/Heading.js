

import MainLayoutAdmin from 'components/admindashboard/MainLayoutAdmin';
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