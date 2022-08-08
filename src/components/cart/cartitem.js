import { useState } from "react"
import { Usercontext } from '../context/userContext';
import {useContext} from 'react'

const Cartitem=(props)=>{
    let item=props.item
    let productImage=[];
    let images=[];
    if(item.image)
     {
        images=item.image.split(';')
     }
     images && images.map((item,key)=>{
        item && productImage.push(item.replace(/^\s+|\s+$/gm,''))
    })

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
            <td  className="px-3">
                <div className="flex space-x-3 justify-center px-3">
                    <div className="w-3/12 flex justify-end">
                        <div className="w-full ">
                            <img  src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${productImage[0]}`} alt="product image" className="h-28 w-28 object-fill"/>
                        </div>
                    </div>
                    
                    <div className="w-9/12 flex flex-col justify-evenly py-3">
                        <h1 className="text-left">{item.name}</h1>
                        <button onClick={()=>{context.cartremove(item)}} className="text-left text-red-500 focus:outline-none">remove</button>
                    </div>
                </div>
                </td>
                <td className="px-3">
                    <div className="space-x-1 flex items-center justify-center" >
                        <button onClick={()=>{qty-1 < 1 ? setqty(1) : qtyminus() }} className="bg-red-500 rounded focus:outline-none text-white w-7 text-xl ">-</button>
                        <input value={qty} className="text-center focus:outline-none w-9 border border-gray-400 rounded"/>
                        <button onClick={()=>{qty+1>item.maxqty ? alert( "only "+ item.maxqty+ "available") : qtyplus()}}className="bg-green-500 w-7 text-white focus:outline-none text-xl rounded">+</button>
                    </div>
                </td>
                <td className="px-3">{item.salesPrice!=0 ? item.salesPrice : item.sellingPrice}</td>
                <td className="px-3">{item.salesPrice!=0 ? item.salesPrice : item.sellingPrice*qty}</td>
         </tr>
    )
}
export default Cartitem