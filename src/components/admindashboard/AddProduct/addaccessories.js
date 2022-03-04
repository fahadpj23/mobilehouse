import axios from "axios"
import { useState } from "react"
const AddAccessories=()=>{

    const [productid, setproductid] = useState("")
    const [name, setname] = useState("")
    const [color, setcolor] = useState("")
    const [price, setprice] = useState("")
    const [image, setimage] = useState("")
    const [Brand, setBrand] = useState("")
    const [maxqty, setmaxqty] = useState("")
    const [material, setmaterial] = useState("")
    const [warranty, setwarranty] = useState("")
    const [mrp, setmrp] = useState("")
    const upload=()=>{
        let formData = new FormData();
        console.log(mrp)
        formData.append('productid',productid)
        formData.append('name',name)
        formData.append('color',color)
        formData.append('price',price)
        formData.append('image',image)
        formData.append('brand',Brand)
        formData.append('maxqty',maxqty)
        formData.append('material',material)
        formData.append('mrp',mrp)
        formData.append('warranty',warranty)
        axios.post(`http://localhost:9000/uploadaccessories`,formData,{headers:{'Content-Type':'multipart/form-data'}})
        
        .then(res=>{
           
            if(res.data=="successfully added")
            {
                alert("successfully added")
            }
            else
            {
                alert("something is wrong")
            }
          }) 
    }
   
    return(
        <div>
    
            <div className=" mt-5 w-6/12 p-2 space-y-6">
                <div className="flex justify-between ">
                    <div className="w-5/12 text-sm space-y-1">
                        <h1>Product Id</h1>
                        <input onChange={(e)=>setproductid(e.target.value)} className="w-full border-2 border-gray-400 rounded-md py-1 px-1"/>
                    </div>
                    <div className="w-5/12 text-sm space-y-1">
                        <h1>Name</h1>
                        <input onChange={(e)=>setname(e.target.value)} className="w-full border-2 border-gray-400 rounded-md py-1 px-1"/>
                    </div>
                </div>
                <div className="flex justify-between">
                     <div className="w-5/12 text-sm space-y-1">
                        <h1>color</h1>
                        <input onChange={(e)=>setcolor(e.target.value)} className="w-full border-2 border-gray-400 rounded-md py-1 px-1"/>
                    </div>
                    <div className="w-5/12 text-sm space-y-1">
                        <h1>Price</h1>
                        <input onChange={(e)=>setprice(e.target.value)} type="number" className="w-full border-2 border-gray-400 rounded-md py-1 px-1"/>
                    </div>
                </div>
                <div className="flex justify-between">
                     <div className="w-5/12 text-sm space-y-1">
                        <h1>MRP</h1>
                        <input onChange={(e)=>setmrp(e.target.value)} className="w-full border-2 border-gray-400 rounded-md py-1 px-1"/>
                    </div>
                    <div className="w-5/12 text-sm space-y-1">
                        <h1>Warranty</h1>
                        <input onChange={(e)=>setwarranty(e.target.value)} type="text" className="w-full border-2 border-gray-400 rounded-md py-1 px-1"/>
                    </div>
                </div>
                <div className="flex justify-between">
                 
                </div>
                <div className="flex justify-between">
                    <div className="w-5/12 text-sm space-y-1">
                        <h1>Image</h1>
                        <input onChange={(e)=>setimage(e.target.files[0])} type="file" className="focus:outline-none w-full border-2 border-gray-400 rounded-md py-1 px-1"/>
                    </div>
                    <div className="w-5/12 text-sm space-y-1">
                        <h1>Brand</h1>
                        <input onChange={(e)=>setBrand(e.target.value)} className="w-full border-2 border-gray-400 rounded-md py-1 px-1"/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="w-5/12 text-sm space-y-1">
                        <h1>Max Qty</h1>
                        <input type="number" onChange={(e)=>setmaxqty(e.target.value)} className="w-full border-2 border-gray-400 rounded-md py-1 px-1"/>
                    </div>
                    <div className="w-5/12 text-sm space-y-1">
                        <h1>Material</h1>
                        <input onChange={(e)=>setmaterial(e.target.value)}  className="w-full border-2 border-gray-400 rounded-md py-1 px-1"/>
                    </div>
                </div>

            </div>
            <div className="flex justify-end  space-x-3 w-6/12 mt-8 ">
                    <button className="bg-red-500 text-white py-1 font-semibold rounded-md  px-1 w-3/12">RESET</button>
                    <button onClick={()=>upload()} className="bg-blue-500 text-white py-1 font-semibold rounded-md  px-1 w-3/12">Save</button>
            </div>
            
        </div>
    )
}
export default AddAccessories