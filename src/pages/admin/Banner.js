
import MainLayoutAdmin from "components/admindashboard/MainLayoutAdmin";
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