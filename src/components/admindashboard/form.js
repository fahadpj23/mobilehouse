import {MobileHouseApi} from "helpers/axiosinstance";
import { useState ,useEffect,useRef} from "react"

import { AiOutlineClose } from 'react-icons/ai';

const FormLayout=(props)=>{
    
    const [deletevalue,setdeletevalue]=useState("")
    const [addval,setaddval]=useState(false)
    const [editok,seteditok]=useState(false)
    const [image,setimage]=useState("")
    const [variantoperation,setvariantoperation]=useState(false)
    const [deleteVariants,setdeleteVariants]=useState(false)
    const [variantset,setvariantset]=useState(false)
    // const [searchValue,setsearchValue]=useState("")
    // const [products,setproducts]=useState("")
    const imageref=useRef()
    props.operationitem?.values.map((item,key)=>{
        console.log(item)
    })

    // input id get as parameter in addvalue function and set value to tagIdvalue
    const addvalue=(tagId)=>{
        console.log(tagId)
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
                // props.attributeValues.push()
                
            }
            else
            {
                document.getElementById(tagId).value=""
                console.log("already exist")
            
            }
        }
   
    }
   
    const setvariant=(tagId,index)=>{

        
        let tagIdvalue=document.getElementById(tagId).value
        console.log(tagIdvalue)
        if(tagIdvalue)
        {
            
            if(props.variantvalues.includes(tagIdvalue)==false)
            {
                console.log("dfd")
                props.variantvalues.push(tagIdvalue)
                setvariantoperation(!variantoperation)
            }
            else
            {
             
                setdeleteVariants(+props.variantvalues.indexOf(tagIdvalue)+1)
            //    props.variantvalues.splice(index,1)
            //    console.log("removed")
            //    setvariantoperation(!variantoperation)
            //    console.log(props.variantvalues)
             
               
            
            }
        }

    }
    
   
    const imageadd=()=>{
        imageref.current.click()
    }

    useEffect(()=>{
        // if(props.operation!=="" && editok===false)
        // {
        //     //if there is a array value like catgeory attribute and attribute values than store it  in a array for display
        //     props.operationitem.values && props.operationitem.values.map((item,key)=>{
        //         props.values.push(item)
        //       })
        //       seteditok(true)
        //       console.log(props.values)
            
        // }
        if(variantset==false && props.variants)
        {
            props.variants.map((item,key)=>{
                props.variantvalues.includes(item.attributeName)==false && props.variantvalues.push(item.attributeName)
            })
            setvariantset(true) 
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
        if(deleteVariants!="")
        {
           console.log(props.variantvalues.length)
            if(props.variantvalues.length==1)
            {
                console.log("fdf")
                props.variantvalues.pop();
                setdeleteVariants("")
                setvariantoperation(!variantoperation)
            }
            else
            {
                console.log()
                props.variantvalues && props.variantvalues.splice(+deleteVariants-1,1)
                
                setdeleteVariants("")
                setvariantoperation(!variantoperation)
            }
        }
      

        if(addval==true)
        {
            setaddval(false)
        }

    },[deletevalue,editok,addval,variantoperation,deleteVariants])
    console.log(props)
    
    return(
        <div className="w-full h-full flex items-center bg-opacity-95 z-20  justify-center pr-5 md:justify-center bg-gray-100 fixed top-0">
        <div className=" space-y-4 w-10/12  md:w-6/12 lg:w-3/12 h-4/5 ">
            <div className="max-h-full bg-white p-4 overflow-auto ">
                <div className="w-full">
                    <button onClick={()=>props.AddWindowClose(false)} className="flex focus:outline-none justify-end w-full text-right"><AiOutlineClose/></button>
                    <h1 className="w-full flex justify-center text-xl font-semibold space-x-2"><span>{ props.operation==="" ? "ADD" :props.operation }</span><span>{props.head}</span> </h1>
                   
                </div>
                
                <div>
        <form onSubmit={(e)=>props.handleSubmit(e)} method="post">
            {
                props.formdata && props.formdata.map((item,key)=>{
                    return(
                        <div key={key} className="flex flex-col space-y-2 mt-7">
                            
                              <label className="font-semibold text-sm md:text-base" for="fname">{item.name}:</label>

                              {(() => {
                                switch (item.type) {
                                case 'text':
                                            return <div >
                                                        <div className="flex space-x-1">
                                                            {/* input value contain add button like attrribute value add button then there is a item.more value else no.default value set using operation item */}
                                                            <input type="text" required={item.required && true} className={`  w-full ${item.name=="Address" && "h-20"} px-2 py-1 focus:outline-none rounded-md border border-gray-400`} defaultValue={ item.more ? "" : props.operationitem && props.operationitem[item.name] } name={item.name} id={item.name} />                                    
                                                            {
                                                                item.more && <button type="button"  onClick={()=>addvalue(item.name)} className="px-2 py-1 bg-red-500 focus:outline-none text-white rounded w-5/12 md:w-2/12 ">ADD +</button>
                                                            }
                                                        </div>
                                                        {
                                                            item.more && props.operationitem.values.length!=0 &&
                                                                <div className="space-y-1 mt-1 border border-gray-400 rounded p-2 max-h-48 overflow-auto">
                                                                    {
                                                                        props.values && props.operationitem.values.map((item,key)=>{
                                                                            return(
                                                                                <div className="w-full flex justify-between px-2 bg-gray-200 py-1 ">
                                                                                    {console.log(item)}
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
                                            // item more means if select value stores in a array then ther will be item.more.if select head is status will be 0 or 1 we won't store anywhere.so no item.ore 
                                            return  !item.more ?  <select required={item.required && true} defaultValue={  props.operationitem && props.operationitem[item.name]} className="w-full px-2 py-1 rounded-md border border-gray-400" name={item.name}>
                                                    
                                                    {
                                                        item.value&& item.value.map((item1,key1)=>{
                                                            return(
                                                                <option className="text-xs md:text-md" value={item1.value}>{item1.name}</option>
                                                            )
                                                        })
                                                    }
                                                    </select>
                                                    :
                                                    //if select value store in a array then this will work
                                                    <div>
                                                        <div className="flex space-x-1">
                                                        {/* requires sent from formdata */}
                                                        <select required={item.required && true}    className="w-10/12 px-2 py-1 rounded-md border border-gray-400" name={item.name} id={item.name}>
                                                        <option value="">--select--</option>
                                                        {
                                                            item.value&& item.value.map((item1,key1)=>{
                                                                return(
                                                                    <option className="text-xs md:text-md"  value={item1.name}>{item1.name}</option>
                                                                )
                                                            })
                                                        }
                                                        </select>
                                                        {
                                                                    item.more && <button type="button"  onClick={()=>addvalue(item.name)} className="px-2 py-1 bg-red-500 focus:outline-none text-white rounded w-5/12 md:w-3/12 ">ADD +</button>
                                                        }
                                                        </div>
                                                        {/* if click edit show already selected values in box */}
                                                        {
                                                            item.more && props.values.length!=0 &&
                                                                <div className="space-y-1 mt-1 border border-gray-400 rounded p-2 max-h-48 overflow-auto">
                                                                   
                                                                    {
                                                                        props.values && props.values.map((item,key)=>{
                                                                            return(
                                                                                <div className="w-full flex justify-between px-2 items-center bg-gray-200 py-1 ">
                                                                                    <h1 className=" px-1  truncate w-7/12  ">{item}</h1 >
                                                                                    {
                                                                                        props.head=="Category" && 
                                                                                        <input onChange={()=>setvariant(item,key+1)} checked={props.variantvalues.includes(item)} type="checkbox" id={item} name={item} value={item}/>
                                                                                    }
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
                                                        
                                case 'file':
                                    return  <div>
                                        {
                                            console.log(item.required)
                                        }
                                                <input type="file" ref={imageref} onChange={(e)=>{setimage(URL.createObjectURL(e.target.files[0]))}}  accept=".png,.jpg,.jpeg" className=" hidden"  name={item.name} id={item.name} /> 
                                                <button type="button" onClick={()=>imageadd()}  className="  p-2 rounded border border-gray-400">
                                                    <img src={image ? image :  props.operationitem.image ? `${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${props.operationitem.image}` : "/uploadimage.png"}  alt="" className="object-contain h-16 w-16 overflow-hidden" />
                                                 
                                                </button>

                                             

                                            </div>
                                    
                                // case 'search':
                                //     return <div className="relative" >
                                //     <input type="text" onChange={(e)=>searchProduct(e.target.value)} name={item.name} id={item.name}  autoComplete="off" className="w-full   px-2 py-1 rounded-md border border-gray-400" />
                                //     <div className="h-96 absolute top-10 overflow-auto space-y-2 z-50 bg-white w-11/12 left-10 ">
                                //         {searchValue && products && products.map((item1,key1)=>{
                                //             return(
                                //                 <div className="flex justify-between items-center">
                                //                     <h1 className="truncate w-6/12">{item1.name}</h1>
                                //                     <img src={   `http://localhost:9000/images/${item1.image}`} alt="" className="object-contain h-14 w-14 overflow-hidden" />
                                //                     <button type="button"  onClick={()=>addProduct(item1)} className="px-2 h-8 w-20 bg-red-500 focus:outline-none text-white rounded  ">ADD +</button>

                                //                 </div>
                                //             )
                                //         })}
                                //     </div>
                                // </div>
                                default:
                                    return null;
                                    break;
                                }
                            })()}
        
                              
                        </div>
                    )
                })
            }
            <div className={`${props.operation=="view" ? " hidden" :"w-full flex justify-end"}`}>
                 <input type="submit" value="Submit" className="bg-green-500 w-7/12 md:w-3/12 mt-10 cursor-pointer  focus:outline-none text-white font-semibold py-2 rounded-md" />

            </div>

        </form>
        </div>
       </div>
                              
     </div>
                           
     </div>
    )
}
export default FormLayout