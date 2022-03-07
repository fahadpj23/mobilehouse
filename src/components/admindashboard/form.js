import { useState ,useEffect} from "react"

import { AiOutlineClose } from 'react-icons/ai';
const Form=(props)=>{
    const [attvalue,setattvalue]=useState("")
    const [deleteattvalue,setdeleteattvalue]=useState("")

    //add attribute
    const addattribute=()=>{
        if(attvalue!="")
        {
            
            props.attributevalues.push(attvalue)
            setattvalue("")
           
        }
       
    }

  
    
    useEffect(()=>{
        console.log(deleteattvalue)
        if(deleteattvalue!="")
        {
            console.log(deleteattvalue)
           
            if(deleteattvalue!=0)
            {
            props.attributevalues.splice(deleteattvalue,1)
            console.log( props.attributevalues)
            setdeleteattvalue("")
               
            }
            else
            {
                console.log("bbbb")
                // props.attributevalues.length=0
                // setdeleteattvalue("")
           
            }
        }
    },[deleteattvalue])

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
                                            <input onChange={(e)=>{item.more && setattvalue(e.target.value)}} className="w-full px-2 py-1 rounded-md border border-gray-400" value={item.more && attvalue} />
                                            <button type="button" onClick={()=>addattribute() } className={`${item.more  ? "rounded-md bg-red-500 text-white px-2":"hidden"}`}>ADD</button>

                                        </div>
                                       
                                        <div className={`${props.attributevalues && item.more ? " rounded-md w-full border-gray-400 border h-36 space-y-1   overflow-auto  px-2 py-2": "hidden"}`}>
                                            {

                                                props.attributevalues.map((item1,key1)=>{
                                                    return(
                                                        <div className="w-10/12 flex justify-between px-2 bg-gray-200 py-1 ">
                                                               <h1 className=" px-1  truncate w-10/12  ">{item1}</h1 >
                                                               <button type="button" onClick={()=>{setdeleteattvalue(key1)}}><AiOutlineClose/></button>

                                                        </div>
                                                     
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