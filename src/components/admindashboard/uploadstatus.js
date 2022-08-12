import { FaSpinner} from 'react-icons/fa';
const UploadSpinner=()=>{
    return(
        <div className="w-screen h-screen bg-gray-50 bg-opacity-90 z-50 fixed top-0 right-0 flex items-center justify-center">
                    <div className="w-8 h-8">
                        <h1 className="animate-spin text-4xl"><FaSpinner/></h1>

                    </div>
        </div>
    )
}
export default UploadSpinner