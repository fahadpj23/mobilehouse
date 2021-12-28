const EditProduct=(props)=>{
    let item=props.editdata[0];
  
      
    return(
        <div>
        <form action="http://localhost:9000/Editproduct" method="post"   className="w-screen h-screen fixed bg-white bg-opacity-80 flex items-center justify-center">
            <div className="w-5/12 h-5/6 py-5 overflow-auto bg-gray-200 px-5">
               
                   
                        <h1 className="w-full text-center text-2xl py-6">Product Details</h1>
                        <div className="flex w-full">
                            <div className="flex flex-col w-full items-center justify-center">
                            {Object.keys(item).map((item1,key)=>{
                                return(
                                <div className={`${ item1!="productid" && item1!="id" && item1!="type"  ?"flex w-full justify-between py-3": "hidden" }`}>
                                     <label for={item1} className="w-4/12 ">{item1}</label>
                                     <h1>:</h1>
                                     <input id={item1} name={item1}  type="text" className="w-4/12 px-2 bg-white" defaultValue={item[item1]} />
                                     
                                     
                                </div>
                               
                                )
                            })}

                            </div>
                            
                        </div>
                    <div className="w-full flex justify-end space-x-3 py-5">
                    <button className="bg-red-500 text-white w-2/12 py-1 rounded-lg">Cancel</button>
                    <button type="submit"   className="bg-green-500 text-white w-2/12 py-1 rounded-lg">Save</button>
                   
                    </div>
                   

            </div>

        </form>
        </div>
    )
}
export default EditProduct