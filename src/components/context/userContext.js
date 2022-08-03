import PreviousMap from "postcss/lib/previous-map";
import { createContext } from "react";
import { useState,useEffect } from "react";
import ProductSlider from "../Home/productSlick";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Usercontext=createContext()

const ContextProvider=(props)=>{
    const [cart, setcart] = useState([] )
    const [cartadded, setcartadded] = useState(false)
    const[auth,setauth]=useState(false)
    

    const addtocart=(item)=>{
        console.log(item)
        item.qty=1
        setcart([...cart,item]) 
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


    const notify = (msg) => {
        
        toast(msg,{
            theme: "dark"
        });

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
        <>
        <ToastContainer />
        <Usercontext.Provider value={{
            cart:cart,
            addtocart:addtocart,
            cartqty:cartqty,
            cartremove:cartremove,
            auth:auth,
            notify:notify,
            }}>
            {props.children}
        </Usercontext.Provider>
        </>
    )
}
export default ContextProvider