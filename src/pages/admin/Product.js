

import TableContent from 'components/admindashboard/table';
import MainLayoutAdmin from 'components/admindashboard/MainLayoutAdmin';
const Product=()=>{
 
        return(
            <div>
                 <div className="flex">
               
                <MainLayoutAdmin>
                <TableContent
                controller="product"
                />
                </MainLayoutAdmin>
               
            
                </div>
                   
                 
            </div>
        )
    }
export default Product