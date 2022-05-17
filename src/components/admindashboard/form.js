import { useState ,useEffect} from "react"

import { AiOutlineClose } from 'react-icons/ai';
const FormLayout=(props)=>{
    const [attvalue,setattvalue]=useState("")
    const [deleteattvalue,setdeleteattvalue]=useState("")
    const [editok,seteditok]=useState(false)

    //add attribute
    const addattribute=()=>{
        
        if(attvalue!=="")
        {
            if(props.values.includes(attvalue)==false)
            {
                props.values.push(attvalue)
                setattvalue("")
                
            }
            else
            {
                console.log("already addedd")
            
            }
         
           
        }
       
       
    }

  
    
    useEffect(()=>{
        if(props.operation!=="" && editok===false)
        {
            //if there is a array value like catgeory attribute and attribute values than store it  in a array for display
            props.operationitem.values && props.operationitem.values.map((item,key)=>{
                props.values.push(item)
              })
              seteditok(true)
              console.log(props.values)
            
        }
       
        if(deleteattvalue!="")
        {
           console.log(props.values.length)
            if(props.values.length==1)
            {
               
                props.values.pop();
                setdeleteattvalue("")
            }
            else
            {
            props.values && props.values.splice(deleteattvalue-1,1)
            console.log( props.values)
            setdeleteattvalue("")
            }
          
        
        }
    },[deleteattvalue,editok])
    console.log(props.operationitem)
    return(
        <form onSubmit={(e)=>props.handleSubmit(e)} method="post">
            {
                props.formdata.map((item,key)=>{
                    return(
                        <div className="flex flex-col space-y-2 mt-7">
                            
                              <label className="font-semibold" for="fname">{item.name}:</label>
                              {
                                 
                                (item.type=="text" || item.type=="number")&&
                                 
                                    <div className="space-y-2">
                                        <div className= "flex space-x-1">   
                                            <input type={item.type} onChange={(e)=>{item.more && setattvalue(e.target.value)}} required={item.required && true} className={`  w-full ${item.name=="Address" && "h-20"} px-2 py-1 rounded-md border border-gray-400`} defaultValue={  props.operationitem && props.operationitem[item.name]} value={ item.more && attvalue}  name={item.name} id={item.name} />
                                            <button type="button" onClick={()=>addattribute() } className={`${props.operation!="view" && item.more  ? "rounded-md bg-red-500 text-white px-2":"hidden"}`}>ADD</button>

                                        </div>
                                       
                                        <div className={`${props.values && item.more ? " rounded-md w-full border-gray-400 border h-36 space-y-1   overflow-auto  px-2 py-2": "hidden"}`}>
                                            {

                                                props.values && props.values.map((item1,key1)=>{
                                                    return(
                                                        <div className="w-10/12 flex justify-between px-2 bg-gray-200 py-1 ">
                                                               <h1 className=" px-1  truncate w-10/12  ">{item1}</h1 >
                                                               <button className={`${props.operation=="view" && " hidden"}`} type="button" onClick={()=>{setdeleteattvalue(key1+1)}}><AiOutlineClose/></button>

                                                        </div>
                                                     
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                    

                                }

                                {
                                    item.type=="select" &&
                                    <div>
                                        <div className="flex">
                                            { item.more ?

                                             <select onChange={(e)=>{item.more && setattvalue(e.target.value)}} defaultValue={!item.more && props.Mainstatus} className="w-full px-2 py-1 rounded-md border border-gray-400" name={item.name}>
                                             <option>--select--</option>
                                             {
                                                 item.value&& item.value.map((item1,key1)=>{
                                                     return(
                                                         <option value={item1}>{item1}</option>
                                                     )
                                                 })
                                             }
                                            </select>
                                            :

                                             <select onChange={(e)=>{item.more && setattvalue(e.target.value)}} defaultValue={!item.more && props.Mainstatus} className="w-full px-2 py-1 rounded-md border border-gray-400" name={item.name}>
                                                <option>--select--</option>
                                                {
                                                    item.value&& item.value.map((item1,key1)=>{
                                                        return(
                                                            <option value={item1.value}>{item1.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            }
                                            <button type="button" onClick={()=>addattribute() } className={`${item.more  ? "rounded-md bg-red-500 text-white px-2":"hidden"}`}>ADD</button>

                                        </div>
                                        
                                        <div className={`${props.values && item.more ? " rounded-md w-full border-gray-400 border h-36 space-y-1   overflow-auto  px-2 py-2": "hidden"}`}>
                                            {

                                                props.values && props.values.map((item1,key1)=>{
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
                               
                        </div>
                    )
                })
            }
            <div className={`${props.operation=="view" ? " hidden" :"w-full flex justify-end"}`}>
                 <input type="submit" value="Submit" className="bg-green-500 w-3/12 mt-10 cursor-pointer  focus:outline-none text-white font-semibold py-2 rounded-md" />

            </div>

        </form>
    )
}
export default FormLayout