import SalesAdd from "./SalesAdd"


const SalesMain=(props)=>{


   

 

    return(
        <div >
            
                                    <div  >
                                        <SalesAdd
                                                   operation={props.operation}
                                                   operationitem={props.operationitem}
                                                   AddSucess={props.AddSucess}
                                                   AddWindowClose={props.AddWindowClose}
                                       
                                        />
                                      
                                    
                                    </div>
                               
            
          
    </div>   
    )
}
export default SalesMain
