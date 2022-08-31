const PersonalInformation=()=>{
    return(
        <div className="w-full flex justify-end">
        <div className="flex flex-col w-11/12">

            <h1 className="text-xl font-semibold pb-5">Personal Information</h1>
                <div className="space-y-6">
                <div className=" space-y-6">
                    <div className="text-sm font-semibold space-y-1">

                        <h1 className="text-sm font-semibold space-y-1">First Name</h1>
                        <input  className="border border-gray-500 py-2 rounded text-xs  px-1 w-3/12 " placeholder="Ar***"/>
                    </div>
                    <div className="text-sm font-semibold space-y-1">

                        <h1 className="text-sm font-semibold space-y-1">Last Name</h1>
                        <input  className="border border-gray-500 py-2 rounded text-xs  px-1 w-3/12 " placeholder="ka***"/>
                    </div>
                </div>
                <div>
                <div>
                  <input type="radio" id="Male" name="Gender" value="Male"/>
                  <label for="html">Male</label>
                   <input type="radio" id="Female" name="Gender" value="Female"/>
                  <label for="html">Female</label>
                </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <div>

                        <h1 className="text-sm font-semibold space-y-1">Email Address</h1>
                        <input  className="border border-gray-500 py-2 rounded text-xs  px-1 w-3/12 " placeholder="Fah*****@gmail.com"/>
                    </div>
                    <div>
                    <h1 className="text-sm font-semibold space-y-1">Mobile Number</h1>
                    <input  className="border border-gray-500 py-2 rounded text-xs  px-1 w-3/12 "  pattern="[0-9]{6}" placeholder="811******13"/>
                    </div>
                </div>
                </div>
                <div className="flex justify-center w-full mt-10 ">
                    
                    <button className="w-24 bg-red-500 text-white rounded p-1">Save</button>
                </div>
        </div>

        </div>
    )
}
export default PersonalInformation