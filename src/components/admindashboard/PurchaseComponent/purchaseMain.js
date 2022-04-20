import SideNav from "../sideNav"
import NavOperation from "../operation"
const PurchaseMain=()=>{
    return(
        <div className="flex w-full">
             {/* {
                    addattribute==true && 
                        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
                            <div className=" space-y-4  w-3/12 h-4/5 ">
                                <div className="max-h-full bg-white p-4 overflow-auto">
                                    <div className="w-full">
                                        <button onClick={()=>setaddattribute(false)} className="flex focus:outline-none justify-end w-full text-right"><AiOutlineClose/></button>
                                        <h1 className="w-full flex justify-center text-xl font-semibold">{ operation=="" ? "ADD" : operation} Attribute</h1>
                                       
                                    </div>
                                    
                                    <div>
                                        <FormLayout
                                            formdata={addformdata}
                                            handleSubmit={handleSubmit}
                                            attributevalues={attributevalues}
                                            operation={operation}
                                            operationitem={operationitem}
                                            Mainname={operationitem.attributeName}
                                            Mainstatus={operationitem.status}
                                        />
                                    
                                    </div>
                                </div>
                              
                            </div>
                           
                        </div>
                } */}
            <SideNav/>
            <div className="w-10/12">
                
               <NavOperation/>
                {/* {
                    attribute &&
                    <TableContent
                         Data={attribute}
                         tableOperation={tableOperation}
    
                    />
                } */}
            </div>
    </div>   
    )
}
export default PurchaseMain
