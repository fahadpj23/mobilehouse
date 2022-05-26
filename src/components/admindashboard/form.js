import { useState ,useEffect} from "react"

import { AiOutlineClose } from 'react-icons/ai';
const FormLayout=(props)=>{
    
    const [deletevalue,setdeletevalue]=useState("")
    const [addval,setaddval]=useState(false)
    const [editok,seteditok]=useState(false)
    console.log(props.formdata)
    // input id get as parameter in addvalue function and set value to tagIdvalue
    const addvalue=(tagId)=>{

        // input type id set as formstructure item name.so every inpt tag id get by that name
        let tagIdvalue=document.getElementById(tagId).value
        console.log(tagIdvalue)
        if(tagIdvalue)
        {
            if(props.values.includes(tagIdvalue)==false)
            {
                props.values.push(tagIdvalue)
                document.getElementById(tagId).value=""
                setaddval(true)
                
            }
            else
            {
                document.getElementById(tagId).value=""
                console.log("already exist")
            
            }
        }
         
           
       console.log(props.values)
       
       
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
       
        if(deletevalue!="")
        {
           
            if(props.values.length==1)
            {
               
                props.values.pop();
                setdeletevalue("")
            }
            else
            {
            props.values && props.values.splice(deletevalue-1,1)
            console.log( props.values)
            setdeletevalue("")
            }
          
        
        }

        if(addval==true)
        {
            setaddval(false)
        }
    },[deletevalue,editok,addval])
    console.log(props.operationitem)
    return(
        <div className="w-full h-full flex items-center bg-opacity-95 justify-center bg-gray-100 fixed top-0">
        <div className=" space-y-4  w-4/12 h-4/5 ">
            <div className="max-h-full bg-white p-4 overflow-auto">
                <div className="w-full">
                    <button onClick={()=>props.close(false)} className="flex focus:outline-none justify-end w-full text-right"><AiOutlineClose/></button>
                    <h1 className="w-full flex justify-center text-xl font-semibold space-x-2"><span>{ props.operation==="" ? "ADD" :props.operation }</span><span>{props.head}</span> </h1>
                   
                </div>
                
                <div>
        <form onSubmit={(e)=>props.handleSubmit(e)} method="post">
            {
                props.formdata.map((item,key)=>{
                    return(
                        <div className="flex flex-col space-y-2 mt-7">
                            
                              <label className="font-semibold" for="fname">{item.name}:</label>

                              {(() => {
                                switch (item.type) {
                                case 'text':
                                            return <div >
                                                        <div className="flex space-x-1">
                                                            <input type="text" required={item.required && true} className={`  w-full ${item.name=="Address" && "h-20"} px-2 py-1 focus:outline-none rounded-md border border-gray-400`} defaultValue={ item.more ? "" : props.operationitem && props.operationitem[item.name] } name={item.name} id={item.name} />                                    
                                                            {
                                                                item.more && <button type="button"  onClick={()=>addvalue(item.name)} className="px-2 py-1 bg-red-500 focus:outline-none text-white rounded w-2/12 ">ADD +</button>
                                                            }
                                                        </div>
                                                        {
                                                            item.more && props.values.length!=0 &&
                                                                <div className="space-y-1 mt-1 border border-gray-400 rounded p-2 max-h-48 overflow-auto">
                                                                    {
                                                                        props.values.map((item,key)=>{
                                                                            return(
                                                                                <div className="w-full flex justify-between px-2 bg-gray-200 py-1 ">
                                                                                    <h1 className=" px-1  truncate w-10/12  ">{item}</h1 >
                                                                                    <button type="button" onClick={()=>{setdeletevalue(key+1)}} className={`${props.operation=="view" && " hidden"}`}  ><AiOutlineClose/></button>
                 
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                        }
                                                    
                                                    </div>
                                          
                                        
                                case 'number':
                                    return  <input type="number" required={item.required && true} className={`  w-full ${item.name=="Address" && "h-20"} px-2 py-1 rounded-md border border-gray-400`} defaultValue={  props.operationitem && props.operationitem[item.name]}  name={item.name} id={item.name} />                                    

                                case 'select':
                                            return  !item.more ?  <select required={item.required && true} defaultValue={  props.operationitem && props.operationitem[item.name]} className="w-full px-2 py-1 rounded-md border border-gray-400" name={item.name}>
                                                    
                                                    {
                                                        item.value&& item.value.map((item1,key1)=>{
                                                            return(
                                                                <option value={item1.value}>{item1.name}</option>
                                                            )
                                                        })
                                                    }
                                                    </select>
                                                    :
                                                    <div>
                                                        <div className="flex space-x-1">
                                                        <select required={item.required && true}    className="w-10/12 px-2 py-1 rounded-md border border-gray-400" name={item.name} id={item.name}>
                                                        <option value="">--select--</option>
                                                        {
                                                            item.value&& item.value.map((item1,key1)=>{
                                                                return(
                                                                    <option value={item1}>{item1}</option>
                                                                )
                                                            })
                                                        }
                                                        </select>
                                                        {
                                                                    item.more && <button type="button"  onClick={()=>addvalue(item.name)} className="px-2 py-1 bg-red-500 focus:outline-none text-white rounded w-3/12 ">ADD +</button>
                                                        }
                                                        </div>
                                                        {
                                                            item.more && props.values.length!=0 &&
                                                                <div className="space-y-1 mt-1 border border-gray-400 rounded p-2 max-h-48 overflow-auto">
                                                                    {
                                                                        props.values.map((item,key)=>{
                                                                            return(
                                                                                <div className="w-full flex justify-between px-2 bg-gray-200 py-1 ">
                                                                                    <h1 className=" px-1  truncate w-10/12  ">{item}</h1 >
                                                                                    <button type="button" onClick={()=>{setdeletevalue(key+1)}} className={`${props.operation=="view" && " hidden"}`}  ><AiOutlineClose/></button>
                
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                        }
                                                    </div>

                                
                                case 'email' :
                                    return  <input type="email"   required={item.required && true} className={`  w-full ${item.name=="Address" && "h-20"} px-2 py-1 rounded-md border border-gray-400`} defaultValue={  props.operationitem && props.operationitem[item.name]}  name={item.name} id={item.name} />                                    ;
     
                                                    
                                default:
                                    return null;
                                    break;
                                }
                            })()}
        
                              {/* {
                                 
                                (item.type=="text" || item.type=="number")&&
                                 
                                    <div className="space-y-2">
                                        <div className= "flex space-x-1">   
                                            <input type={item.type} onChange={(e)=>{item.more && setvalue(e.target.value)}} required={item.required && true} className={`  w-full ${item.name=="Address" && "h-20"} px-2 py-1 rounded-md border border-gray-400`} defaultValue={  props.operationitem && props.operationitem[item.name]} value={ item.more && value}  name={item.name} id={item.name} />
                                            <button type="button" onClick={()=>addattribute() } className={`${props.operation!="view" && item.more  ? "rounded-md bg-red-500 text-white px-2":"hidden"}`}>ADD</button>

                                        </div>
                                       
                                        <div className={`${props.values && item.more ? " rounded-md w-full border-gray-400 border h-36 space-y-1   overflow-auto  px-2 py-2": "hidden"}`}>
                                            {

                                                props.values && props.values.map((item1,key1)=>{
                                                    return(
                                                        <div className="w-10/12 flex justify-between px-2 bg-gray-200 py-1 ">
                                                               <h1 className=" px-1  truncate w-10/12  ">{item1}</h1 >
                                                               <button className={`${props.operation=="view" && " hidden"}`} type="button" onClick={()=>{setdeletevalue(key1+1)}}><AiOutlineClose/></button>

                                                        </div>
                                                     
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                    

                                } */}

                                {/* {
                                    item.type=="select" &&
                                    <div>
                                        <div className="flex">
                                            { item.more ?

                                             <select onChange={(e)=>{item.more && setvalue(e.target.value)}} defaultValue={!item.more && props.Mainstatus} className="w-full px-2 py-1 rounded-md border border-gray-400" name={item.name}>
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

                                             <select onChange={(e)=>{item.more && setvalue(e.target.value)}} defaultValue={!item.more && props.Mainstatus} className="w-full px-2 py-1 rounded-md border border-gray-400" name={item.name}>
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
                                                               <button type="button" onClick={()=>{setdeletevalue(key1)}}><AiOutlineClose/></button>

                                                        </div>
                                                     
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                
                              } */}
                               
                        </div>
                    )
                })
            }
            <div className={`${props.operation=="view" ? " hidden" :"w-full flex justify-end"}`}>
                 <input type="submit" value="Submit" className="bg-green-500 w-3/12 mt-10 cursor-pointer  focus:outline-none text-white font-semibold py-2 rounded-md" />

            </div>

        </form>
        </div>
       </div>
                              
     </div>
                           
     </div>
    )
}
export default FormLayout