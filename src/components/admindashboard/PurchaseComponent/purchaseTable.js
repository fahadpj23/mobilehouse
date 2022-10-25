
import { MdDelete } from 'react-icons/md';
const PurchaseTable=(props)=>{
    console.log(props.purchasetable)
    return(
        <div  className="w-full border border-gray-400 h-56 md:h-full rounded overflow-auto">
            <table className="min-w-full">
                <tbody>
                <tr className="bg-gray-500 md:text-base  text-white   tracking-wide ">
                    <th className="py-1 font-semibold text-xs">SL No</th>
                    <th className=" font-semibold text-xs">product</th>
                    <th className=" font-semibold text-xs">Price</th>
                    <th className=" font-semibold text-xs">QTY</th>
                    <th className=" font-semibold text-xs">subTotal</th>
                    <th className=" font-semibold text-xs">TaxAmount</th>
                    <th className=" font-semibold text-xs">NetAmount</th>
                    <th className=" font-semibold text-xs"></th>
                </tr>
                </tbody>
                {
                    props.purchasetable && props.purchasetable.map((item,key)=>{
                        return(
                        <tbody>
                        <tr key={key} className="text-center md:text-base text-xs ">
                            <td className="py-2 mt-1">{key+1}</td>
                            <td>{item.id}</td>
                            <td>{item.purchasePrice}</td>
                            
                            <td className="flex justify-center space-x-1 items-center h-10">
                                <button onClick={()=>{item.productqty > 0 && props.qtychange(item,item.productqty-1)}} className="bg-gray-500 focus:outline-none text-white text-xl px-2 h-6 w-8 flex justify-center items-center font-semibold rounded">-</button>
                                <input onChange={(e)=>e.target.value==="" ? props.qtychange(item,e.target.value) :  (+e.target.value > 0  && +e.target.value <= +item.qty )&& props.qtychange(item,+e.target.value)  } value={item.productqty} className="w-10 text-center focus:outline-none border border-gray-300 h-6 rounded"/>
                                <button onClick={()=>{item.productqty+1 <= item.qty && props.qtychange(item,item.productqty+1)}} className="bg-green-500 focus:outline-none text-white text-xl px-2 h-6 w-8 flex justify-center items-center  font-semibold rounded">+</button>
                            </td>
                            <td>{item.productqty * item.purchasePrice}</td>
                            <td>{item.taxAmount}</td>
                            <td>{item.netAmount}</td>
                            <td onClick={()=>props.removeproduct(key)}><MdDelete/></td>
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