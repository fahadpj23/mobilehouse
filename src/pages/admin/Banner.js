
import MainLayoutAdmin from "Layout/MainLayoutAdmin";
import TableContent from "components/admindashboard/table";

const Banner=()=>{

   
  
    return( 
         <div className="flex">
            
              
              <MainLayoutAdmin>
                <TableContent
                controller="banner"
                />
            </MainLayoutAdmin>
          
         </div>
    )
}
export default Banner