
import MainLayoutAdmin from 'Layout/MainLayoutAdmin';
import TableContent from 'components/admindashboard/table';


const Hsncode=()=>{
 
    return(
         <div className="flex">
            
            
            <MainLayoutAdmin>
                <TableContent
                controller="HSN"
                />
            </MainLayoutAdmin>
           
         </div>
    )
}
export default Hsncode