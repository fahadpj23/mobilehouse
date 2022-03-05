import { useState } from "react"
const Form=(props)=>{
    const [attvalue,setattvalue]=useState("")

    const addattribute=()=>{
        if(attvalue!="")
        {
            props.attributevalues.push(attvalue)
            setattvalue("")
           
        }
       
    }
    return(
        <form onSubmit={(e)=>props.handleSubmit(e)} method="post">
            {
                props.formdata.map((item,key)=>{
                    return(
                        <div className="flex flex-col space-y-2 mt-7">
                              <label className="font-semibold" for="fname">{item.name}:</label>
                              {
                                 
                                item.type=="text" &&
                                 
                                    <div className="space-y-2">
                                        <div className="flex space-x-1">   
                                            <input onChange={(e)=>setattvalue(e.target.value)} className="w-full px-2 py-1 rounded-md border border-gray-400" value={item.more && attvalue} />
                                            <button type="button" onClick={()=>addattribute() } className={`${item.more  ? "rounded-md bg-red-500 text-white px-2":"hidden"}`}>ADD</button>

                                        </div>
                                       
                                        <div className={`${props.attributevalues && item.more ? " rounded-md w-full border-gray-400 border h-36  space-x-2 overflow-auto  px-2 py-2": "hidden"}`}>
                                            {

                                                props.attributevalues.map((item1,key1)=>{
                                                    return(
                                                        <span className="border border-gray-300 px-1 bg-gray-200 ">{item1}</span >
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                    

                                }

                                {
                                    item.type=="select" &&
                                <select  className="w-full px-2 py-1 rounded-md border border-gray-400">
                                    <option>--select--</option>
                                    {
                                        item.value.map((item1,key1)=>{
                                            return(
                                                <option>{item1}</option>
                                            )
                                        })
                                    }
                                </select>
                              }
                               
                        </div>
                    )
                })
            }
            <div className="w-full flex justify-end">
                 <input type="submit" value="Submit" className="bg-green-500 w-3/12 mt-10  focus:outline-none text-white font-semibold py-2 rounded-md" />

            </div>

        </form>
    )
}
export default Form