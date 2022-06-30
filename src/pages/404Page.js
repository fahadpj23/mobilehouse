import { Link } from 'react-router-dom';
const PageNotFound=()=>{
    return(
        <div>
            <div className="bg-gray-200 w-screen h-screen flex flex-col items-center justify-center space-y-6">
                <div className='space-y-2'>
                    <h1 className="text-9xl font-bold">404</h1>
                    <h1 className="text-2xl font-bold">Oops! Page Not found</h1>
                </div>
               
                <Link className="px-3 py-1 rounded-lg border border-gray-500 font-semibold text-lg"  to={{pathname: "/"}} >GO HOME</Link>
                
            </div>
        </div>
    )
} 
export default PageNotFound