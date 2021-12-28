import { AiOutlineClose } from 'react-icons/ai';
const UserRegister=()=>{
    return(
        

   
        <form action="http://localhost:9000/UserRegister" method="post" className="w-screen h-screen fixed flex items-center  bg-gray-100   bg-opacity-95 justify-center z-20 top-0 left-0 ">
        
            <div className="w-8/12 sm:w-4/12 lg:w-3/12 h-3/5 flex flex-col relative bg-white shadow-5xl pb-5 overflow-auto justify-between  rounded-lg">
                <div className="w-full flex flex-col items-center justify-between">
                    <button className="absolute top-3 focus:outline-none right-3 "><AiOutlineClose/></button>
                    <h1 className="text-2xl font-semibold pt-7 pb-3">SignUp</h1>
                    <div className="space-y-5 flex flex-col w-11/12  px-2 mt-6 ">
                        <input className=" pl-2 focus:outline-none  rounded-2xl py-2 bg-gray-200 " placeholder="username "/>
                        <input   className=" pl-2 focus:outline-none   rounded-2xl py-2 bg-gray-200 " placeholder="Mobile Number "/>
                        <input   className=" pl-2 focus:outline-none   rounded-2xl py-2 bg-gray-200 " placeholder="password "/>
                        <input   className=" pl-2 focus:outline-none   rounded-2xl py-2 bg-gray-200 " placeholder="Confirm Password "/>
                        
                       
                        <button type="submit" className="bg-gradient-to-r  from-red-700 to-red-300 focus:outline-none text-white font-semibold py-2 rounded-2xl">Register</button>
                        

                    </div>
                </div>
               
                
            </div>
        </form>
    )
}
export default UserRegister