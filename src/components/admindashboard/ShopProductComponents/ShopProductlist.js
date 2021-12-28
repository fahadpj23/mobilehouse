import { useState,useEffect } from "react"
 
import  { mobilehouseApi } from "../../../axiosinstance";

import SideNav from "../sideNav";
import EditProduct from "./EditProduct";
const ShopProductList=()=>{
 const [shoplist, setshoplist] = useState("")
 const [productstatus, setproductstatus] = useState("")
 const [deletestatus, setdeletestatus] = useState("")
 const [editdata, seteditdata] = useState("")
 const productupdate=(type,id,database)=>{
    setproductstatus(type)
    let formData = new FormData();
    formData.append("id",id)
    formData.append("database",database)
    if(type=="delete")
    {
     mobilehouseApi.post(`productdelete`,formData)
     .then(res=>{
         if(res.data=="deleted")
         {
             setdeletestatus(res.data)
         }
     })
    }
    if(type=="Edit")
    {
        mobilehouseApi.get(`updateproductdetails`,{params:{id:id,database:database}})
        .then(res=>{
            seteditdata(res.data)
             
        })
    }
 }
 
    useEffect(() => {
        mobilehouseApi.get(`products`)    
            .then(res=>{
                console.log(res.data)
                setshoplist(res.data)
               
              })  
        
        if(deletestatus!="")
        {
            mobilehouseApi.get(`products`)    
            .then(res=>{
                console.log(res.data)
                setshoplist(res.data)
              })  
            setdeletestatus("")
        }
        
    }, [deletestatus])


    return(

        <div className="flex">
            {editdata!="" &&
                <EditProduct
                editdata={editdata}
                />
            }
            <SideNav/>
        <div className="w-10/12 overflow-auto px-5">
            <table className="min-w-full">
                <tr className="text-left">
                    <th>SL No</th>
                    <th>name</th>
                    <th>price</th>
                    <th>color</th>
                    <th>mrp</th>
                    <th>brand</th>
                    <th>warranty</th>
                    <th>quantity</th>
                    <th></th>
                </tr>
                {
                  shoplist!="" &&  shoplist.map((item,key)=>{
                      return(
                      <tr key={key} className="text-left ">
                          <td className="py-2">{key+1}</td>
                          <td className="">{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.color}</td>
                          <td>{item.mrp}</td>
                          <td>{item.brand}</td>
                          <td>{item.warranty}</td>
                          <td>{item.maxqty}</td>
                          <td>
                              <select onChange={(e)=>{productupdate(e.target.value,item.id,item.type)}} className="border border-black">
                                  <option value="select">select</option>
                                  <option value="Edit">Edit</option>
                                  <option value="delete">Delete</option>
                              </select>
                          </td>
                      </tr>
                      )
                  })
                }
            </table>

        </div>
    </div>   
    )
}
export default ShopProductList
