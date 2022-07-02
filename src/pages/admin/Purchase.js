import PurchaseMain from 'components/admindashboard/PurchaseComponent/purchaseMain'
const Purchase=()=>{
    return(
        <div className="flex">
                {Auth && Auth.authState=="authorized" ?
                
                <PurchaseMain/>
                 :
                history.push("/AdminLogin")
                 }
       
        </div>
  
    )
}
export default Purchase