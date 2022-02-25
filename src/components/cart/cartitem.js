import { useState } from "react"
import { Usercontext } from '../context/userContext';
import {useContext} from 'react'
const Cartitem=(props)=>{
    
    let item=props.item
    console.log(item)
    let context=useContext(Usercontext)
    const [qty, setqty] = useState(item.qty)
    const qtyminus=()=>{
        context.cartqty(item,qty-1)
        setqty(qty-1)
        
    }

    const qtyplus=()=>{
        context.cartqty(item,qty+1)
        setqty(qty+1) 
         
    }
    return(
        <tr className="text-center mt-5 ">
            <td>
                <div className="flex space-x-3 justify-center">
                    <div className="w-6/12 flex justify-end">
                        <div className="w-6/12 ">
                            <img  src={`http://localhost:9000/images/${item.image}`} alt="product image" className="h-28 w-28 object-fill"/>
                        </div>
                    </div>
                    
                    <div className="w-6/12 flex flex-col justify-evenly py-3">
                        <h1 className="text-left">{item.name}</h1>
                        <button onClick={()=>{context.cartremove(item)}} className="text-left text-red-500 focus:outline-none">remove</button>
                    </div>
                </div>
                </td>
                <td className="space-x-1"><button onClick={()=>{qty-1 < 1 ? setqty(1) : qtyminus() }} className="bg-red-400 focus:outline-none text-white w-6">-</button><input value={qty} className="text-center focus:outline-none w-8 border-2 border-gray-200"/><button onClick={()=>{qty+1>item.maxqty ? alert( "only "+ item.maxqty+ "available") : qtyplus()}}className="bg-green-400 w-6 text-white focus:outline-none">+</button></td>
                <td>{item.price}</td>
                <td>{item.price*qty}</td>
         </tr>
    )
}
export default Cartitem