const PurchaseTable=(props)=>{
    console.log(props.purchasetable)
    return(
        <div  className="w-full border border-gray-400 h-full rounded">
            <table className="min-w-full">
                <tr>
                    <th>SL No</th>
                    <th>product</th>
                    <th>Price</th>
                    <th>QTY</th>
                    <th>Total</th>
                </tr>
                {
                    props.purchasetable && props.purchasetable.map((item,key)=>{
                        return(
                        <tr className="text-center">
                            <td className="py-2">{key+1}</td>
                            <td>{item.id}</td>
                            <td>{item.price}</td>

                            <td className="flex justify-center space-x-1">
                                <button className="bg-gray-500 focus:outline-none text-white text-xl px-2 h-6 w-8 flex justify-center items-center font-semibold rounded">-</button>
                                <input className="w-10 text-center focus:outline-none border border-gray-300 h-6 rounded" defaultValue={item.productqty}/>
                                <button className="bg-green-500 focus:outline-none text-white text-xl px-2 h-6 w-8 flex justify-center items-center  font-semibold rounded">+</button>
                            </td>
                            <td>{item.productqty * item.price}</td>
                        </tr>
                        )
                    })
                }
               
            </table>
        </div>
    )
}
export default PurchaseTable