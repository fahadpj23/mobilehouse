import { useEffect, useState,useContext } from "react"
import { AiFillSetting } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import TableOperation from './tableOperation'
import { MobileHouseApi } from "axiosinstance";
import NavOperation from "./operation";
import UploadSpinner from "./uploadstatus";
import PaginateTable from "./pagination";
import { useNavigate } from "react-router-dom";
import { Usercontext } from 'context/userContext';

const TableContent=(props)=>{
    const context=useContext(Usercontext)
    console.log(window.location.href.search)
    const queryParams = new URLSearchParams(window.location.search)
    const PageNo = queryParams.get("pageNo")
    
    const navigate=useNavigate()
    const[TableData,setTableData]=useState("")
    const[operation,setoperation]=useState("")
    const[operationitem,setoperationitem ]=useState("")
    const[searchvalue,setsearchvalue ]=useState("")
    const[TotalCount,setTotalCount ]=useState("")
   
    const[AddNewstatus,setAddNewstatus]=useState(false)
 console.log(props)
    
    const[reload,setreload]=useState(false)
    
  
    const SearchTable=(searchval)=>{
        MobileHouseApi.get(`/${props.controller}/getData`,{params:{search:searchval,PageNo:PageNo},withCredentials: true })
        .then((res)=>{
            setTableData(res.data)
            setTotalCount(res.data.Count)
            setreload(true)
        })
    }
    const handlePageClick=(e)=>{
        console.log(e.selected  )
       console.log(window.location.href)
        // navigate( { search: "?" + new URLSearchParams({pageNo: +(e.selected) +1}).toString() },{replace:true})
        MobileHouseApi.get(`/${props.controller}/getData`,{params:{search:searchvalue,PageNo:+(e.selected) +1},withCredentials:true})
        .then((res)=>{ 
            setTableData(res.data)
            setTotalCount(res.data.Count)
            
        }) 
    }
    const AddSucess=()=>{
        setAddNewstatus(false)
        setoperation("")
        setoperationitem("")
        MobileHouseApi.get(`/${props.controller}/getData`,{params:{search:searchvalue,PageNo:PageNo},withCredentials:true})
        .then((res)=>{ 
            setTableData(res.data)
            setTotalCount(res.data.Count)
            
        }) 
    }

    //to Close Add Window
    const AddWindowClose=()=>{
        setAddNewstatus(false)
        setoperation("")
        setoperationitem("")
        MobileHouseApi.get(`/${props.controller}/getData`,{params:{search:searchvalue,PageNo:PageNo},withCredentials:true})
        .then((res)=>{ 
            setTableData(res.data)
            setTotalCount(res.data.Count)
            
        }) 
    }

    // purchase approval set function
    const setPurchaseApproval=(purchase,approvalStatus)=>{
        
        const formData=new FormData()
        formData.append('purchaseId',purchase.id)
        formData.append('approvalStatus',approvalStatus)
        
        if(window.confirm(`${approvalStatus}`)==true)
        {
            MobileHouseApi.post('/UpdatePurchaseApprovalStatus',formData,{withCredentials:true})
            .then((res)=>{
                console.log(res)
            })
            .catch((Err)=>console.log(Err))
            
        }
    }

    const tableOperation=(operation,EditData)=>{
        if(operation=="delete" && props.controller=="product" )
        {
            if(window.confirm("Delete the product")==true)
            {
            MobileHouseApi.delete('/productDelete',{params:{productId:EditData.id},withCredentials:true})
            .then((res)=>{
                if(res.data.success)
                {
                     context.notify(res.data.success,"success")
                    MobileHouseApi.get(`/${props.controller}/getData`,{params:{search:"",PageNo:PageNo},withCredentials:true})
                    .then((res)=>{
                        setTableData(res.data)
                        setTotalCount(res.data.Count)
                    })
                }
        
            })
            }
        }
        else
        {
        setoperation(operation)
        setoperationitem(EditData)
        setAddNewstatus(true)
        }
    }

  
    useEffect(()=>{
        
           
        if(TableData=="")
        {
           
            MobileHouseApi.get(`/${props.controller}/getData`,{params:{search:"",PageNo:PageNo},withCredentials:true})
            .then((res)=>{ 
                setTableData(res.data)
                setTotalCount(res.data.Count)
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
                {
                    TableData == "" &&
                    <UploadSpinner/>
                }
            <div className=" pb-2 w-full flex justify-between mt-2 px-2">
                <h1 className="border border-gray-500 w-20 py-1 rounded text-center "><span className="font-semibold">All </span> <span className="font-semibold text-green-600">{TotalCount && TotalCount} </span></h1>
                <input onChange={(e)=>(setsearchvalue(e.target.value),SearchTable(e.target.value))} value={searchvalue} type="text" placeholder="search" className="w-6/12 md:w-48 text-sm border border-gray-400  px-1 rounded py-2 focus:outline-none" />
            </div>
            <div className="h-fixedNoNavlg6  w-full overflow-auto pr-2">
            {TableData && <table className="w-full mt-2  ">
            <tbody>
                
                <tr className=" bg-gray-100   sticky -top-1" >
                    {
                    
                    TableData  && TableData.TableHead?.map((item,key)=>
                        <th className="text-xs font-medium capitalize md:text-sm px-3 py-3  " key={key}>{item}</th>
                    )
                    }
                    {/* {props.controller=="Purchase" && <th className="flex justify-center mt-3 text-sm md:text-base md:mt-4">Approval</th>} */}
                    {props.controller=="Purchase" && <th className="text-xs font-medium capitalize md:text-base px-3 py-3">ApprovalStatus</th>}
                    <th className="flex justify-center mt-3 text-sm md:text-base md:mt-4"><AiFillSetting/></th>

                    
                </tr>
                </tbody>
                {
                     TableData  && TableData.Data?.map((item,key)=>{
                        return(
                            <tr key={key} className="text-center text-xs md:text-sm border-b border-gray-300">
                               
                            <td className="py-2  truncate">{key+1}</td>
                            {
                                TableData  && TableData.TableHead?.map((item1,key)=>{
                                  
                                    // check key!=0 bacuse table column need slno
                                    if(key!=0)
                                    {
                                        return(
                                           
                                            item1=="image" ?
                                                <td className="flex items-center justify-center py-2">
                                                    <img src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${item.image}`} alt="product image" className="object-cover h-16 w-16 overflow-hidden "/>

                                                </td>
                                            :

                                            (item1=="status" && props.controller=="CustomerOrder") ?
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
                        
                            { props.controller=="Purchase" && <td>
                                <select onChange={(e)=>setPurchaseApproval(item,e.target.value)} defaultValue={item.ApprovalStatus} className="border border-gray-300 text-xs p-1 rounded">
                                    <option value="1">Created</option>
                                    <option value="2">Edited</option>
                                    <option value="3">approved</option>
                                    <option value="4">Reject</option>
                                </select>
                            </td>}
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
           
        </table> }
        
        </div>
       
        {TotalCount!="" &&
        <PaginateTable
                      handlePageClick={handlePageClick}
                      pageSize={TotalCount/13}
                      pageNo={PageNo}
                     />}
        
    </div>
    )
}
export default TableContent