import PreviousMap from "postcss/lib/previous-map";
import { createContext } from "react";
import { useState,useEffect } from "react";
import ProductSlider from "../Home/productSlick";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MobileHouseApi } from "helpers/axiosinstance";
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


    const notify = (msg,type) => {
        
        toast(msg,
            {type:type,theme:"colored"}
        );

    }

    const userCart=(item)=>{
        const data=new FormData()
        data.append("productId",item.id)
        data.append("qty",1)
        MobileHouseApi.post('/CartAdd',data,{headers:{UserToken:localStorage.getItem("UserToken")}})
        .then((res)=>{
            console.log(res.data)
        })
    }
    
   
       
   
    
    
    useEffect(() => {
     
        if(cartadded==true  )
        {
        localStorage.setItem('cart',JSON.stringify(cart))
        setcartadded(false)
        }
        if(localStorage.getItem('UserToken'))
        {
            MobileHouseApi.get('getUserCart',{headers:{UserToken:localStorage.getItem("UserToken")}})
            .then((res)=>{
               setcart(res.data.cart)
            })
        }
        else
        {
        setcart(JSON.parse(localStorage.getItem("cart")) || [] )
        }
        
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
            userCart:userCart
            }}>
            {props.children}
        </Usercontext.Provider>
        </>
    )
}
export default ContextProvider