import { useEffect, useState } from "react"
import { AiFillSetting } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import TableOperation from './tableOperation'
import { MobileHouseApi } from "axiosinstance";
import NavOperation from "./operation";
const TableContent=(props)=>{
    let headarray=[];
    
    const[TableData,setTableData]=useState("")
    const[operation,setoperation]=useState("")
    const[operationitem,setoperationitem ]=useState("")
    const[searchvalue,setsearchvalue ]=useState("")
   
   
    const[AddNewstatus,setAddNewstatus]=useState(false)
 console.log(props)
    
    const[reload,setreload]=useState(false)
    
  
    const SearchTable=(searchval)=>{
        MobileHouseApi.get(`/${props.controller}/getData`,{params:{search:searchval},headers:{accessToken:localStorage.getItem("accessToken")}})
        .then((res)=>{
            setTableData(res.data)
            setreload(true)
        })
    }
    
    const AddSucess=()=>{
        setAddNewstatus(false)
        setoperation("")
        setoperationitem("")
        MobileHouseApi.get(`/${props.controller}/getData`,{params:{search:searchvalue},headers:{accessToken:localStorage.getItem("accessToken")}})
        .then((res)=>{ 
            setTableData(res.data)
            
        }) 
    }

    //to Close Add Window
    const AddWindowClose=()=>{
        setAddNewstatus(false)
        setoperation("")
        setoperationitem("")
    }

    const tableOperation=(operation,EditData)=>{
       
        setoperation(operation)
        setoperationitem(EditData)
        setAddNewstatus(true)
    }

  
    useEffect(()=>{
        
           
        if(TableData=="")
        {
           
            MobileHouseApi.get(`/${props.controller}/getData`,{params:{search:""},headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{ 
                setTableData(res.data)
                
            })
        }
        if(reload==true)
        {
            setreload(false)
        }
    },[reload,TableData])
    console.log(TableData)
    return(
        <div className=" h-full     w-full overflow-auto">
              <NavOperation
                 controller={props.controller}
                 AddSucess={AddSucess}
                 setAddNewstatus={setAddNewstatus}
                 AddNewstatus={AddNewstatus}
                 operation={operation}
                 operationitem={operationitem}
                 AddWindowClose={AddWindowClose}
                 
                />
            <div className=" pb-2 w-full flex justify-between mt-2 px-2">
                <h1 className="border border-gray-500 w-20 py-1 rounded text-center "><span className="font-semibold">All </span> <span className="font-semibold text-green-600">{TableData && TableData.Data.length} </span></h1>
                <input onChange={(e)=>(setsearchvalue(e.target.value),SearchTable(e.target.value))} value={searchvalue} type="text" placeholder="search" className="w-4/12 md:w-48 text-sm border border-gray-400  px-1 rounded py-2 focus:outline-none" />
            </div>
            <div className="h-fixedNoNavlg6  w-full overflow-auto">
            {TableData && <table className="w-full mt-5   ">
            <tbody>
                
                <tr className=" bg-gray-100   sticky -top-1" >
                    {
                    
                    TableData  && TableData.TableHead.map((item,key)=>
                        <th className="text-xs font-medium capitalize md:text-base px-3 py-3  " key={key}>{item}</th>
                    )
                    }
                    <th className="flex justify-center mt-3 text-sm md:text-base md:mt-4"><AiFillSetting/></th>

                    
                </tr>
                {
                     TableData  && TableData.Data.map((item,key)=>{
                        return(
                            <tr key={key} className="text-center text-xs md:text-sm border-b border-gray-300">
                            <td className="py-2  truncate">{key+1}</td>
                            {
                                TableData  && TableData.TableHead.map((item1,key)=>{
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
                                controller={props.controller}
                                item={item}
                                tableOperation={tableOperation}
                                type={props.type}
                                setTableData={setTableData}
                              
                            
                            />
                           
                                
                                    
                            
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table> }
        </div>
    </div>
    )
}
export default TableContent