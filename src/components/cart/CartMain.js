import {useContext,useState} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { Usercontext } from '../../context/userContext';
import Login from 'components/Home/login';
import UserRegister from 'components/Home/userRegister';
import Cartitem from './cartitem';
const Cartmain=(props)=>{
    const context=useContext(Usercontext)
   
    let total=0;
    let saved=0;
    context.cart.map((item,key)=>{
        total=total+(item.salesPrice!=0 ? item.salesPrice : item.sellingPrice*item.qty)
        saved=saved+(+item.mrp- (+item.salesPrice!=0 ? item.salesPrice : item.sellingPrice))
        console.log(item.qty)
    })

    const  cartCheckout=()=>{
            let count=0;
           if( context.cart.some((item)=> +item.maxqty ==0 )==true)
           {
            context.cart && context.cart.map((item2,key2)=>{
                if(+item2.maxqty<1)
                {
                    console.log("sd")
                    if(count==0)
                    {
                    context.notify(`${item2.name} don't have enough quantity`,"warning")
                    count=count+1;
                    }
                    return ;
                    
                }
            }) 
           
           }
           else
           {
                Navigate()
           }
          
    }

    console.log(cartCheckout)
     return(
         <div className="flex justify-center">
                     {context.loginstatus===true&&
                        <Login   
                        />
                    }
                    {
                        context.registeruser===true &&
                        <UserRegister                       
                        />

                    }
             <div className="w-full px-0 md:px-3 md:flex h-full md:h-screen ">
                 <div className={`${props.profilecart ? "w-full px-4":"w-full md:w-10/12 px-4"}`}>
                     <div className="flex justify-between text-lg md:text-2xl font-semibold py-4">
                        <h1>Shopping Cart</h1>
                        <h1>{context.cart.length} items</h1>
                     </div>
                     <hr className="w-full h-0.5 py-3"></hr>
                    <div className={`${props.profilecart ? "h-full" : "h-56 md:h-5/6 overflow-auto"} space-y-3 md:space-y-6 "`}>
                       
                        {
                            context.cart.length!=0 && context.cart.map((item,key)=>{
                                return(
                                    <Cartitem
                                    item={item}
                                    />
                                )
                            })
                        }
                      
                    </div>
                 </div>
                {!props.profilecart && <div className="w-full md:w-3/12 md:bg-gray-100 h-full ">
                    <div className="py-4 px-4 h-full">
                        <div>
                            <h1 className="font-semibold  text-lg md:text-2xl">Order Summary</h1>
                            <hr className="w-full h-0.5 mt-4 "></hr>
                        </div>
                        <div className="h-64 md:h-4/6 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <h1>Items</h1>
                                    <h1>{context.cart.length}</h1>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <h1>Shipping Charge</h1>
                                    <h1>FREE</h1>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <h1>Saved</h1>
                                    <h1>{saved}</h1>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <h1>TOTAL COST</h1>
                                    <h1>Rs:{total}</h1>
                                    
                                </div>
                                <div className='w-full text-sm md:text-lg  tracking-wide md:tracking-widest rounded font-semibold py-1 text-white bg-primary text-center'>
                                {
                                    localStorage.getItem('UserName') ? 
                                        <button className='focus:outline-none' onClick={()=>cartCheckout()}>CHECKOUT</button>
                                        // <Link  to={{pathname: "/Address", search:"?"+new URLSearchParams({CheckoutType:"Cart"})}} className="">CHECKOUT</Link>

                                        :

                                        <button className='focus:outline-none' onClick={()=>context.setloginstatus(true)}>CHECKOUT</button>
                                }
                               
                                </div>
                            </div>
                        </div>
                        

                    </div>

                </div>}

             </div>
         </div>
     )
}
export default Cartmain