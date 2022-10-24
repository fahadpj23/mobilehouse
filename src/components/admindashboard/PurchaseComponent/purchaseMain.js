
import PurchaseAdd from "./purchaseAdd";

const PurchaseMain=(props)=>{

    let purchasetable=[];


    // const addformdata=[
    //     {name:"name",type:"text"},
    //     {name:"status",type:"select",value:["active","disable"]},
    //     {name:"values",type:"text",more:"yes"}
    // ]

    

   

 

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
