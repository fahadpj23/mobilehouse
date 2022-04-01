import { useState } from "react"
import { AiFillSetting } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import TableOperation from './tableOperation'

const TableContent=(props)=>{
    let headarray=[];
    const[operationsview,setoperationsview]=useState(false)
 console.log(props)
    
    return(
        <table className="min-w-full">
        <tbody>
            <tr className="py-5" >
                {
                
                props.Data.TableHead && props.Data.TableHead.map((item,key)=>
                    <th key={key}>{item}</th>
                )
                }
                <th className="flex justify-center  mt-1"><AiFillSetting/></th>

                
            </tr>
            {
                props.Data.Data!="" && props.Data.Data.map((item,key)=>{
                    return(
                        <tr key={key} className="text-center">
                        <td className="py-1">{key+1}</td>
                        {
                            props.Data.TableHead.map((item1,key)=>{
                            
                                if(key!=0)
                                {
                                    return(
                                    
                                        <td key={key}>{ item1=="values" ? item[item1].toString() :item[item1]}</td>
                                    )   
                                }
                            })
                        }
                    
                        
                        <td >
                           <TableOperation
                            item={item}
                            tableOperation={props.tableOperation}
                           
                           />
                              
                                
                           
                        </td>
                    </tr>
                    )
                })
            }
        </tbody>
    </table> 
    )
}
export default TableContent