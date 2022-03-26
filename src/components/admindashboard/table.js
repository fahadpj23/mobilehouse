import { useState } from "react"
import { AiFillSetting } from 'react-icons/ai';
const TableContent=(props)=>{
    let headarray=[];

 console.log(props)
    
    return(
        <table className="min-w-full">
        <tbody>
            <tr >
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
                        <td>{key+1}</td>
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
                    
                        
                        <td>
                            <select  onChange={(e)=>{e.target.value!= "select" && props.tableOperation(e.target.value,item)}}>
                                <option value="select">select</option>
                                <option value="view">view</option>
                                <option value="edit">edit</option>
                                <option value="delete">delete</option>
                            </select>
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