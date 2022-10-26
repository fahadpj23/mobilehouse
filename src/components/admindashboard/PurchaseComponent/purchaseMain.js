
import PurchaseAdd from "./purchaseAdd";

const PurchaseMain=(props)=>{


   

 

    return(
        <div >
            
                                    <div  >
                                        <PurchaseAdd
                                                   operation={props.operation}
                                                   operationitem={props.operationitem}
                                                   AddSucess={props.AddSucess}
                                                   AddWindowClose={props.AddWindowClose}
                                       
                                        />
                                      
                                    
                                    </div>
                               
            
          
    </div>   
    )
}
export default PurchaseMain
