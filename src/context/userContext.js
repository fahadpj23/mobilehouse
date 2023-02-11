import PreviousMap from "postcss/lib/previous-map";
import { createContext } from "react";
import { useState,useEffect } from "react";
import ProductSlider from "../components/Home/productSlick";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MobileHouseApi } from "helpers/axiosinstance";
import Login from "components/Home/login";
export const Usercontext=createContext()

const ContextProvider=(props)=>{
    const [cart, setcart] = useState([] )
    const [cartadded, setcartadded] = useState(false)
    const[auth,setauth]=useState(false)
    const [loginstatus, setloginstatus] = useState(false)
    const [registeruser, setregisteruser] = useState(false)

   

    const addtocart=(item,qty,image)=>{
       console.log(item)
        if(localStorage.getItem('UserName'))
        {
                const formData=new FormData()
                formData.append('productId',item.id)
                formData.append('qty',qty)
                MobileHouseApi.post('/CartAdd',formData)
                .then((res)=>{
              
                    if(res.data.success)
                    {
                       
                                setcartadded(true)
                       
                    }
                })
        }
        else
        {
        item.image=image
        item.qty=1
        setcart([...cart,item]) 
        setcartadded(true) 
        }
      
    }

    const cartqty=(product,qty)=>{
        cart.map((item,key)=>{
            if(item.id==product.id)
            {
                item.qty=qty
                if(localStorage.getItem('UserName'))
                {
                   
                       const formData=new FormData()
                       formData.append('qty',qty)
                       formData.append('productId',product.id)
                        MobileHouseApi.post('/CartQtyUpdate',formData)
                        .then((res)=>{
                      
                            if(res.data.success)
                            {
                               
                                 console.log(res.data.success)
                               
                            }
                        })
                }
            }
        })
      setcartadded(true) 
    }

    const cartremove=(product)=>{
        if(localStorage.getItem('UserName'))
        {
            MobileHouseApi.delete('/cartRemove',{params:{productId:product.id}})
            .then((res)=>{
                    console.log(res.data)
            })      
            .catch((err)=>console.log(err))
        }
        else
        {
            if(cart.length!=1)
            {
            cart.splice(product.id, 1)
            }
            else
            {
                cart.pop()
            }
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
        MobileHouseApi.post('/CartAdd',data)
        .then((res)=>{
            console.log(res.data)
        })
    }
    
   
       
   
    
    
    useEffect(() => {
     
        if(cartadded==true  )
        {
            if(localStorage.getItem('UserName'))
            {
                setcartadded(false)
           
            }
            else
            {
                localStorage.setItem('cart',JSON.stringify(cart))
                setcartadded(false)
            }
        }

        //initial load set cart.if user logged in then fetch from user cart table other wise fetch from local storage
        if(localStorage.getItem('UserName'))
        {
            MobileHouseApi.get('getUserCart')
            .then((res)=>{
               setcart(res.data.cart)
            })
        }
        else
        {
        setcart(JSON.parse(localStorage.getItem("cart")) || [] )
        }
        
    }, [cartadded])

    console.log(loginstatus)
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
            userCart:userCart,
            setloginstatus:setloginstatus,
            loginstatus:loginstatus,
            registeruser:registeruser,
            setregisteruser:setregisteruser
            }}>
            {props.children}
        </Usercontext.Provider>
        </>
    )
}
export default ContextProvider