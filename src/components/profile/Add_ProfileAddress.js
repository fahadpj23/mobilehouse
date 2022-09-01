import { MobileHouseApi } from "axiosinstance"

const AddProfileAddress=(props)=>{

   
    return(
        <form methos="POST" onSubmit={(e)=>props.handleSubmit(e)} className="space-y-6 mt-10 w-10/12 lg:w-6/12 ">
               <div className="flex space-x-6">
                    
                        <input name="name" required className="border border-gray-500 py-2 focus:outline-none rounded text-xs  px-1 w-full " placeholder="Name"/>
                   
                        <input  name="phone" required className="border border-gray-500 py-2 focus:outline-none rounded text-xs  px-1 w-full "  pattern="[0-9]{10}" placeholder="Phone"/>
                   
                </div>
                <div className="flex space-x-6">
                    
                        <input name="pincode" required  className="border border-gray-500 py-2 focus:outline-none rounded text-xs  px-1 w-full " pattern="[0-9]{6}" placeholder="pincode"/>
                
                  
                        <input name="locality" required className="border border-gray-500 py-2 focus:outline-none rounded text-xs  px-1 w-full "   placeholder="Locality"/>
                  
                </div>
                <textarea name="address" className="border border-gray-500 w-full focus:outline-none rounded p-1 text-xs h-16" placeholder="address"/>
                <div className="flex space-x-6">
                  

                      
                        <input  name="city" required className="border border-gray-500 py-2 focus:outline-none rounded text-xs  px-1 w-full " placeholder="City/Town/District"/>
                   
                        <select name="state" required className="border border-gray-500 py-2 focus:outline-none rounded text-xs  px-1 w-full " >
                                <option>--select--</option>
                                <option>ANDAMAN AND NICOBAR ISLANDS</option>
                                <option>ANDHRA PRADESH</option>
                                <option>ARUNACHAL PRADESH</option>
                                <option>ASSAM</option><option>BIHAR</option>
                                <option>CHANDIGARH</option>
                                <option>CHHATTISGARH</option>
                                <option>DADRA AND NAGAR HAVELI</option>
                                <option>DAMAN AND DIU</option>
                                <option>DELHI</option>
                                <option>GOA</option>
                                <option>GUJARAT</option>
                                <option>HARYANA</option>
                                <option>HIMACHAL PRADESH</option>
                                <option>JAMMU AND KASHMIR</option>
                                <option>JHARKHAND</option>
                                <option>KARNATAKA</option>
                                <option>KERALA</option>
                                <option>LAKSHADWEEP</option>
                                <option>MADHYA PRADESH</option>
                                <option>MAHARASHTRA</option>
                                <option>MANIPUR</option>
                                <option>MEGHALAYA</option>
                                <option>MIZORAM</option>
                                <option>NAGALAND</option>
                                <option>ODISHA</option>
                                <option>PUDUCHERRY</option>
                                <option>PUNJAB</option>
                                <option>RAJASTHAN</option>
                                <option>SIKKIM</option>
                                <option>TAMIL NADU</option>
                                <option>TELANGANA</option>
                                <option>TRIPURA</option>
                                <option>UTTARAKHAND</option>
                                <option>UTTAR PRADESH</option>
                                <option>WEST BENGAL</option>
                        </select>
                        {/* <input name="state"  pattern="[0-9]{10}" placeholder="811******13"/> */}
                   
                </div>
                <div className="flex space-x-6">
                    
                     
                        <input name="landmark"  className="border border-gray-500 py-2 focus:outline-none rounded text-xs  px-1 w-full " placeholder="LandMark(optional)"/>
                  
                        
                        <input name="alternativePhone" className="border border-gray-500 py-2 focus:outline-none rounded text-xs  px-1 w-full "  pattern="[0-9]{10}" placeholder="Alternative  Phone(optional)"/>
                
                </div>
                <div className="flex justify-end space-x-3 pt-10">
                    <button onClick={()=>props.setAddAddress(false)} className="border border-gray-500 rounded w-2/12">Cancel</button>
                    <button className="bg-red-500 text-white px-2 py-1 w-2/12 rounded">Save</button>
                </div>
        </form>
    )
}
export default AddProfileAddress