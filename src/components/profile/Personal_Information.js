import { MobileHouseApi } from "helpers/axiosinstance"
import { useEffect, useState } from "react"
const PersonalInformation=()=>{

    const [PersonalDetails,setPersonalDetails]=useState("")
    const handleSubmit=(e)=>{
        e.preventDefault()
        const data=new FormData(e.target)
        MobileHouseApi.post('/AddpersonalDetails',data,{headers:{UserToken:localStorage.getItem("UserToken")}})
    }

    useEffect(()=>{
        if(PersonalDetails=="")
        {
            MobileHouseApi.get('PersonalDetails',{headers:{UserToken:localStorage.getItem("UserToken")}})
            .then((res)=>{
                    setPersonalDetails(res.data.PersonalDetails)
            })
        }
    })
    return(
        <form method="post" onSubmit={(e)=>handleSubmit(e)}  className="w-full flex justify-end">
        {
            PersonalDetails && <div className="flex flex-col w-11/12">

            <h1 className="text-xl font-semibold pb-5">Personal Information</h1>
                <div className="space-y-6 w-10/12 md:w-3/12">
                <div className=" space-y-6">
                    <div className="text-sm font-semibold space-y-1">

                        <h1 className="text-sm font-semibold space-y-1">First Name</h1>
                        <input name="FirstName"  Value={PersonalDetails && PersonalDetails.FirstName} className="border border-gray-500 py-2 rounded text-xs  px-1 w-full " placeholder="Ar***"/>
                    </div>
                    <div className="text-sm font-semibold space-y-1">

                        <h1 className="text-sm font-semibold space-y-1">Last Name</h1>
                        <input name="lastName" defaultValue={PersonalDetails && PersonalDetails.LastName}   className="border border-gray-500 py-2 rounded text-xs  px-1 w-full " placeholder="ka***"/>
                    </div>
                </div>
                <div>
                <div>
                  <input defaultChecked={PersonalDetails && PersonalDetails.Gender=='Male'}  type="radio" id="Male" name="Gender" value="Male"/>
                  <label for="html">Male</label>
                   <input defaultChecked={PersonalDetails && PersonalDetails.Gender=="Female"} type="radio" id="Female" name="Gender" value="Female"/>
                  <label for="html">Female</label>
                </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <div>

                        <h1 className="text-sm font-semibold space-y-1">Email Address</h1>
                        <input name="email" defaultValue={PersonalDetails && PersonalDetails.Email} className="border border-gray-500 py-2 rounded text-xs  px-1 w-full " placeholder="Fah*****@gmail.com"/>
                    </div>
                    <div>
                    <h1 className="text-sm font-semibold space-y-1">Mobile Number</h1>
                    <input name="mobileNumber" defaultValue={PersonalDetails && PersonalDetails.MobileNumber}  className="border border-gray-500 py-2 rounded text-xs  px-1 w-full "  pattern="[0-9]{10}" placeholder="811******13"/>
                    </div>
                </div>
                </div>
                <div className="flex  justify-end sm:justify-center w-full mt-10 ">
                    
                    <button type="submit" className="w-24 bg-red-500 text-white rounded p-1">Save</button>
                </div>
        </div>}

        </form>
    )
}
export default PersonalInformation