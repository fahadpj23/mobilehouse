import React from 'react';
import Home from './pages/Home'
import PageNotFound from 'pages/404Page';
import Cart from './pages/cart';
import Address from './pages/address';
import {Route,BrowserRouter,Routes, Navigate} from  "react-router-dom";
import SingleItem from './pages/singleitem'
import Order from './pages/admin/Order'
import AdminLogin from './pages/adminLogin';
import Category from './pages/admin/category';    
import Dashboard from './pages/admin/Dashboard';
import ContextProvider from './context/userContext';
import {useEffect,useState} from 'react'
import  {MobileHouseApi} from "./helpers/axiosinstance"
import { AuthContext } from "./helpers/authcontext";
import ProductList from './pages/productList'
import Attribute from './pages/admin/Attribute'
import Product from './pages/admin/Product';
import OrderSuccess from './pages/ordersuccess';
import Purchase from './pages/admin/Purchase';
import Supplier from 'pages/admin/Supplier';
import Hsncode from 'pages/admin/HsnCode';
import Brand from 'pages/admin/Brand';
import Heading from 'pages/admin/Heading';
import Banner from 'pages/admin/Banner';
import Ads from 'pages/admin/Ads';
import TermsOfService from 'pages/TermOfService';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import RefundPolicy from 'pages/RefundPolicy';
import ShippingPolicy from 'pages/ShipplingPolicy';
import AboutUs from 'pages/AboutUs';
import Profile from 'pages/profile';
import Payment from 'pages/Payment';
import CancelOrder from 'pages/CancelOrder';
import OrderDetails from 'pages/OrderDetails';
import Sales from 'pages/admin/Sales';
import AppRouter from 'Routes/appRouter';
function App(){
    const[ authState, setAuthState ]=useState("")
    const[ UserauthState, setUserAuthState ]=useState("")


  
   
    useEffect(()=>{
        
       
        if(localStorage.getItem("accessToken"))
        {
            MobileHouseApi.get('authentication',{headers:{accessToken:localStorage.getItem("accessToken")}})
            .then((res)=>{
               
               if(res.data.success)
               {
                setAuthState("authorized")
            
               }
               else
               {
                   setAuthState("unauthroized")
               }
            
            })
        }
        if(localStorage.getItem("accessToken")==null)
        {
            setAuthState("no user")
        }
       
        if(localStorage.getItem("UserToken"))
        {
          
            MobileHouseApi.get('userAuthentication',{headers:{accessToken:localStorage.getItem("UserToken")}})
            .then((res)=>{
        
            if(res.data.success)
            {
                setUserAuthState("authorized")
            
            }
            else
            {
                setUserAuthState("unauthroized")
            }
        
            
            })
        }
       if(localStorage.getItem("UserToken")==null)
       {
        setUserAuthState("no user")
       }
    },[])
   
    return(
       <>
        
            <AuthContext.Provider value={{ authState, setAuthState ,UserauthState, setUserAuthState}}>
                     
                        <ContextProvider > 
                            {console.log(authState)}
                            {
                                (authState!=="" && UserauthState!=="") &&
                                        <AppRouter
                                        authState={authState}
                                        />
                            }
                           
                           
                           
                        </ContextProvider>
            </AuthContext.Provider>
                  
           
        
        </>
    )
}
export default App;