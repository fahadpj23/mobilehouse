import SupplierMain from 'components/admindashboard/Supplier/SupplierMain'
const Supplier=()=>{
    return(
        <div className="flex">
             {Auth && Auth.authState=="authorized" ?
              
              <SupplierMain/>
            :
                history.push("/AdminLogin")
            }
            
         </div>
       
    )
}
export default Supplier