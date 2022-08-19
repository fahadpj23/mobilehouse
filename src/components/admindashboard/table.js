import { useState } from "react"
import { AiFillSetting } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import TableOperation from './tableOperation'

const TableContent=(props)=>{
    let headarray=[];
    const[operationsview,setoperationsview]=useState(false)
    const[TableData,setTableData]=useState(props.Data ??"")
 console.log(props)
    
    return(
        <div className="px-2 h-full    w-full overflow-auto">
            <div className=" pb-2 w-full">
                <h1 className="border border-gray-500 w-20 py-1 rounded text-center "><span className="font-semibold">All </span> <span className="font-semibold text-green-600">{TableData.Data.length} </span></h1>
            </div>
            <div className="h-fixedNoNavlg6  w-full overflow-auto">
            <table className="w-full mt-5   ">
            <tbody>
                
                <tr className=" bg-gray-100   sticky -top-1" >
                    {
                    
                    TableData.TableHead && TableData.TableHead.map((item,key)=>
                        <th className="text-xs font-medium capitalize md:text-base px-3 py-3  " key={key}>{item}</th>
                    )
                    }
                    <th className="flex justify-center mt-3 text-sm md:text-base md:mt-4"><AiFillSetting/></th>

                    
                </tr>
                {
                    TableData.Data && TableData.Data.map((item,key)=>{
                        return(
                            <tr key={key} className="text-center text-xs md:text-sm border-b border-gray-300">
                            <td className="py-2  truncate">{key+1}</td>
                            {
                                TableData.TableHead.map((item1,key)=>{
                                    // check key!=0 bacuse table column need slno
                                    if(key!=0)
                                    {
                                        return(
                                           
                                            item1=="image" ?
                                                <td className="flex items-center justify-center py-2">
                                                    <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="product image" className="object-cover h-16 w-16 overflow-hidden "/>

                                                </td>
                                            :

                                            (item1=="status" && props.order) ?
                                                <td>
                                                    <select onChange={(e)=>props.DeliveryStatus(e.target.value,item)}  defaultValue={item.status} className="border border-gray-300 focus:outline-none rounded p-1">
                                                        <option value="1">Pending</option>
                                                        <option value="2">Packed</option>
                                                        <option value="3">Delivered</option>
                                                        <option value="4">Received</option>
                                                    </select>
                                                </td>
                                            :

                                             //when show multiple values like catgeory atribute then column width specify 
                                            <td className ={`${ item1=="values" ? "  w-5/12" : "text-center"}`} key={key}>
                                                <h1 className={`${ item1=="values" && "  break-words"}`}>{ item1=="values" ? item[item1].toString() :  item1=="status"? item.status==1 ? "active" : "disable" : item[item1]} </h1> </td>
                                        )   
                                    }
                                })
                            }
                        
                            
                            <td className="pt-1" >
                            <TableOperation
                                item={item}
                                tableOperation={props.tableOperation}
                                type={props.type}
                                order={props.order}
                                
                            
                            />
                                
                                    
                            
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table> 
        </div>
    </div>
    )
}
export default TableContent