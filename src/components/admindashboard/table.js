import { useState } from "react"
import { AiFillSetting } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import TableOperation from './tableOperation'

const TableContent=(props)=>{
    let headarray=[];
    const[operationsview,setoperationsview]=useState(false)
 console.log(props)
    
    return(
        <div className="px-2 h-full ">
            <div className="bg-gray-100 pb-2">
                <h1 className="border border-gray-500 w-20 py-1 rounded text-center "><span className="font-semibold">All </span> <span className="font-semibold text-green-600">{props.Data.Data.length} </span></h1>
            </div>
            <table className="min-w-full mt-5">
            <tbody>
                <tr className="py-5 " >
                    {
                    
                    props.Data.TableHead && props.Data.TableHead.map((item,key)=>
                        <th key={key}>{item}</th>
                    )
                    }
                    <th className="flex justify-center  mt-1"><AiFillSetting/></th>

                    
                </tr>
                {
                    props.Data.Data!=="" && props.Data.Data.map((item,key)=>{
                        return(
                            <tr key={key} className="text-center">
                            <td className="py-1  truncate">{key+1}</td>
                            {
                                props.Data.TableHead.map((item1,key)=>{
                                
                                    if(key!=0)
                                    {
                                        return(
                                        
                                            <td className ={`${ item1=="values" ? "  w-5/12" : "text-center"}`} key={key}>
                                                <h1 className={`${ item1=="values" && "  break-words"}`}>{ item1=="values" ? item[item1].toString() : item1=="status"? item.status==1 ? "active" : "disable" : item[item1]} </h1> </td>
                                        )   
                                    }
                                })
                            }
                        
                            
                            <td >
                            <TableOperation
                                item={item}
                                tableOperation={props.tableOperation}
                                type={props.type}
                            
                            />
                                
                                    
                            
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table> 
    </div>
    )
}
export default TableContent