import PreviousMap from "postcss/lib/previous-map";
import { createContext } from "react";
import { useState,useEffect } from "react";
import ProductSlider from "../Home/productSlick";
export const Usercontext=createContext()

const ContextProvider=(props)=>{
    const [cart, setcart] = useState([] )
    const [cartadded, setcartadded] = useState(false)
    

    const addtocart=(item)=>{
        setcart([...cart,{
            id:cart.length,
            productid:item.productid,
            value:{item},
            qty:1
        }]) 
      setcartadded(true) 
    }
    const cartqty=(product,qty)=>{
        cart.map((item,key)=>{
            if(item.id==product.id)
            {
                item.qty=qty
            }
        })
      setcartadded(true) 
    }

    const cartremove=(product)=>{
        if(cart.length!=1)
        {
        cart.splice(product.id, 1)
        }
        else
        {
            cart.pop()
        }
      setcartadded(true) 
    }
       
   
    
    
    useEffect(() => {
        if(cartadded==true  )
        {
        localStorage.setItem('cart',JSON.stringify(cart))
        setcartadded(false)
        }
        setcart(JSON.parse(localStorage.getItem("cart")) || [] )
        
    }, [cartadded])
    return(
        <Usercontext.Provider value={{
            cart:cart,
            addtocart:addtocart,
            cartqty:cartqty,
            cartremove:cartremove,
            }}>
            {props.children}
        </Usercontext.Provider>
    )
}
export default ContextProvider