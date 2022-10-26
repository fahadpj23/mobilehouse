
import { MdDelete } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
const PurchaseTable=(props)=>{
    console.log(props.purchasetable)
    return(
        <div  className="w-full border border-gray-400 h-56 md:h-full rounded overflow-auto">
            <table className="min-w-full">
                <tbody>
                <tr className="bg-gray-700 md:text-base  text-white   tracking-wide ">
                    <th className="py-1 font-normal text-xs">SL No</th>
                    <th className=" font-normal text-xs">Product</th>
                    <th className=" font-normal text-xs">Price</th>
                    <th className=" font-normal text-xs">QTY</th>
                    <th className=" font-normal text-xs">subTotal</th>
                    <th className=" font-normal text-xs">TaxAmount</th>
                    <th className=" font-normal text-xs">NetAmount</th>
                    <th className=" font-normal text-xs"></th>
                </tr>
                </tbody>
                {
                    props.purchasetable && props.purchasetable.map((item,key)=>{
                        return(
                        <tbody  key={key}>
                        <tr className="text-center md:text-base text-xs ">
                            <td className="py-2 mt-1 text-xs">{key+1}</td>
                            <td className=" text-xs">{item.name}</td>
                            <td className=" text-xs">{item.price}</td>
                            
                            <td className="flex justify-center space-x-1 items-center h-10 text-xs">
                                <button onClick={()=>{item.qty-1 > 0 && props.qtychange(item,item.qty-1)}} className="bg-gray-500 focus:outline-none text-white text-xl px-2 h-6 w-6 flex justify-center items-center font-semibold rounded"><FaMinus className='text-xl'/></button>
                                <input onChange={(e)=>e.target.value==="" ? props.qtychange(item,e.target.value) :  (+e.target.value > 0  && +e.target.value <= +item.qty )&& props.qtychange(item,+e.target.value)  } value={item.qty} className="w-8 text-center focus:outline-none border border-gray-300 h-6 rounded"/>
                                <button onClick={()=>{ props.qtychange(item,item.qty+1)}} className="bg-green-500 focus:outline-none text-white  p-1 h-6 w-6 flex justify-center items-center  font-semibold rounded"><FaPlus className='text-xs '/></button>
                            </td>
                            <td className=" text-xs">{(item.qty * item.price).toFixed(2)}</td>
                            <td className=" text-xs">{(item.taxAmount).toFixed(2)}</td>
                            <td className=" text-xs">{(item.netAmount).toFixed(2)}</td>
                            <td onClick={()=>props.removeproduct(item.productId)}><MdDelete/></td>
                        </tr>
                        </tbody>
                        )
                    })
                }
               
            </table>
        </div>
    )
}
export default PurchaseTable