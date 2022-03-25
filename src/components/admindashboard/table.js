import { useState } from "react"
import { AiFillSetting } from 'react-icons/ai';
const TableContent=(props)=>{
    return(
        <table className="min-w-full">
        <tr >
            {
            
            props.Data.TableHead && props.Data.TableHead.map((item,key)=>
                <th>{item}</th>
            )
            }
            <th className="flex justify-center  mt-1"><AiFillSetting/></th>

            
        </tr>
        {
            props.Data.Data!="" && props.Data.Data.map((item,key)=>{
                return(
                    <tr className="text-center">
                    <td>{key+1}</td>
                    <td>{item.Name}</td>
                    <th className="font-normal">{
                    (item.values).toString()
                    }</th>
                    <td>{item.status}</td>
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
        
    </table>
    )
}
export default TableContent