import { useState } from "react"
import { Usercontext } from '../context/userContext';
import {useContext} from 'react'
import { BsTag } from 'react-icons/bs';
import { AiFillDelete,AiOutlinePlus,AiOutlineMinus } from 'react-icons/ai';


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
        <div className="flex justify-center    ">
            <div className="text-center mt-5 w-8/12">
            
                    <div className="flex space-x-3  px-3 items-center h-24 md:h-32">
                    
                            <div className="w-3/12 flex justify-center">
                                <img  src={`${process.env.REACT_APP_MOBILE_HOUSEIMAGE}/${productImage[0]}`} alt="product image" className="h-14 md:h-28 w-14 md:w-28 object-contain"/>
                            </div>
                            <div className="w-6/12 flex flex-col justify-center space-y-3 h-full">
                                <h1 className="text-left text-sm md:text-lg font-bold ">{item.name}</h1>
                                <h1 className="flex items-center text-xs md:text-base text-left"><span className="font-semibold">{item.salesPrice!=0 ? item.salesPrice : item.sellingPrice}Rs</span><span><BsTag className="font-semibold"/></span> <span className="line-through text-gray-600 ml-1 text-xs md:text-sm">{item.mrp}Rs</span></h1>
                            </div>
                            <div className=" space-y-6 md:space-y-12 flex flex-col justify-center h-full items-end">
                                <button onClick={()=>{context.cartremove(item)}} className="text-right  focus:outline-none   "><AiFillDelete/></button>
                                <div className="space-x-1 flex items-center justify-center" >
                                    <button onClick={()=>{qty-1 < 1 ? setqty(1) : qtyminus() }} className="bg-gray-500 rounded focus:outline-none text-white w-6 md:w-7 text-xs md:text-xl h-6 md:h-7 flex items-center justify-center"><AiOutlineMinus/></button>
                                    <input value={qty} className="text-center focus:outline-none w-9 border border-gray-400 rounded text-xs md:text-sm h-6 md:h-7"/>
                                    <button onClick={()=>{qty+1>item.maxqty ? alert( "only "+ item.maxqty+ "available") : qtyplus()}}className="bg-green-600  w-6 md:w-7 text-xl h-6 md:h-7 text-white focus:outline-none text-xs md:text-xl rounded flex item-center justify-center px-1"><AiOutlinePlus className="mt-1"/></button>
                                </div>

                            </div>
                            {/* <h1 className="px-3 text-sm md:text-base">{item.salesPrice!=0 ? item.salesPrice : item.sellingPrice}</h1>
                            <h1 className="px-3 text-sm md:text-base">{item.salesPrice!=0 ? item.salesPrice : item.sellingPrice*qty}</h1> */}
                    </div>
                        
                        {/* <div className="w-9/12 flex flex-col justify-evenly py-3">
                            <h1 className="text-left text-sm md:text-base ">{item.name}</h1>
                            <button onClick={()=>{context.cartremove(item)}} className="text-left text-red-500 focus:outline-none">remove</button>
                        </div> */}
                
                
                    {/* <h1 className="px-3">
                        <div className="space-x-1 flex items-center justify-center" >
                            <button onClick={()=>{qty-1 < 1 ? setqty(1) : qtyminus() }} className="bg-red-500 rounded focus:outline-none text-white w-7 text-xl ">-</button>
                            <input value={qty} className="text-center focus:outline-none w-9 border border-gray-400 rounded"/>
                            <button onClick={()=>{qty+1>item.maxqty ? alert( "only "+ item.maxqty+ "available") : qtyplus()}}className="bg-green-500 w-7 text-white focus:outline-none text-xl rounded">+</button>
                        </div>
                    </h1> */}
                
            </div>
         </div>
    )
}
export default Cartitem