import { MobileHouseApi } from "axiosinstance"
import { useState ,useEffect } from "react"
import AddProfileAddress from "./Add_ProfileAddress"
const Profile_Address=()=>{

    const [AddAddress,setAddAddress]=useState(false)
    const [address,setaddress]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formdata=new FormData(e.target)
        MobileHouseApi.post('/UserAddressAdd',formdata,{headers:{UserToken:localStorage.getItem('UserToken')}})
        .then((res)=>{
            MobileHouseApi.get('/getUserAddress',{headers:{UserToken:localStorage.getItem('UserToken')}})
            .then((res)=>{
                setaddress(res.data.Address)
            })
        })
    }

    useEffect(()=>{
        if(address=="")
        {
            MobileHouseApi.get('/getUserAddress',{headers:{UserToken:localStorage.getItem('UserToken')}})
            .then((res)=>{
                setaddress(res.data.Address)
            })
        }
    },[])
    return(
        <div className="w-full flex justify-center mt-1">
            <div className="w-11/12">
                {
                    address && address.map((item,key)=>{
                        return(
                            <div className="border border-gray-500 p-2">
                                <div className="flex space-x-4 font-semibold">
                                        <h1>{item.Name}</h1>
                                        <h1>{item.Phone}</h1>
                                </div>
                                <div className="flex space-x-4">
                                    <h1>{item.Address}</h1>
                                   
                                    <h1>{item.Locality}</h1>
                                    <h1>{item.city}</h1>
                                    <h1>{item.state}</h1>
                                    <h1>{item.Pincode}</h1>
                                </div>
                                <div className="flex space-x-4">                                  
                                    <h1>{item.Landmark}</h1>
                                    <h1>{item.alternativePhone}</h1>
                                </div>
                            </div>
                        )
                    })
                }
                <button onClick={()=>setAddAddress(true)} className="bg-green-500 focus:outline-none text-white px-2 text-xs rounded py-2">Add New Address</button>
                {
                    AddAddress==true && 
                        <AddProfileAddress
                        setAddAddress={setAddAddress}
                        handleSubmit={handleSubmit}
                        />
                }

            </div>

        </div>

    )
}
export default Profile_Address