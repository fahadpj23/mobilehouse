import {useContext} from 'react'
import { Usercontext } from '../context/userContext';
import Cartitem from './cartitem';
const Cartmain=()=>{
    const context=useContext(Usercontext)
    let total=0;
    context.cart.map((item,key)=>{
        total=total+(+item.value.item.price*item.qty)
        console.log(item.qty)
    })

     return(
         <div className="flex justify-center">
             <div className="w-full px-3 flex h-screen ">
                 <div className="w-10/12 px-4">
                     <div className="flex justify-between text-2xl font-semibold py-4">
                        <h1>Shopping Cart</h1>
                        <h1>{context.cart.length} items</h1>
                     </div>
                     <hr className="w-full h-0.5 py-3"></hr>
                    <div className="h-5/6 overflow-auto">
                        <table className="w-10/12 border-separate">
                            <tr className="text-sm font-semibold">
                                <th>PRODUCT DETAILS</th>
                                <th>QUANTITY</th>
                                <th>PRICE</th>
                                <th>TOTAL</th>
                            </tr>
                        {
                            context.cart.length!=0 && context.cart.map((item,key)=>{
                                return(
                                    <Cartitem
                                    item={item}
                                    />
                                )
                            })
                        }
                        </table>
                    </div>
                 </div>
                <div className="w-3/12 bg-gray-100 h-full ">
                    <div className="py-4 px-4 h-full">
                        <div>
                            <h1 className="font-semibold text-2xl">Order Summary</h1>
                            <hr className="w-full h-0.5 mt-4 "></hr>
                        </div>
                        <div className="h-4/6 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <h1>ITEMS</h1>
                                    <h1>{context.cart.length}</h1>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <h1>SHIPPING CHARGE</h1>
                                    <h1>FREE</h1>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <h1>PRODUCT TOTAL</h1>
                                    <h1>{total}</h1>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <h1>TOTAL COST</h1>
                                    <h1>Rs:{total}</h1>
                                    
                                </div>
                                <button className="w-full text-lg tracking-widest rounded-md font-semibold py-1 text-white bg-primary">CHECKOUT</button>
                            </div>
                        </div>
                        

                    </div>

                </div>

             </div>
         </div>
     )
}
export default Cartmain