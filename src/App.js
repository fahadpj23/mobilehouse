import React from 'react';
import Home from './pages/Home'

import Cart from './pages/cart';
import Address from './pages/address';
import {Route,BrowserRouter as Router,Switch} from  "react-router-dom";
import SingleItem from './pages/singleitem'
import Order from './pages/Order'
import Admin from './pages/admin';
import Category from './pages/category';    
import Dashboard from './pages/Dashboard';
import ContextProvider from './components/context/userContext';
import {useEffect,useState} from 'react'
import  MobileHouseApi from "./helpers/axiosinstance"
import { AuthContext } from "./helpers/authcontext";
import ProductList from './pages/productList'
import Attribute from './pages/Attribute'
import Product from './pages/Product';
import OrderSuccess from './pages/ordersuccess';
import Purchase from './pages/Purchase';
import Supplier from 'pages/Supplier';
import Hsncode from 'pages/HsnCode';
import Brand from 'pages/Brand';
import Heading from 'pages/Heading';
import Banner from 'pages/Banner';
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
       
        <Router>
             
            <Switch>
            <AuthContext.Provider value={{ authState, setAuthState ,UserauthState, setUserAuthState}}>
                     
                        <ContextProvider > 
                          
                            {
                                (authState!=="" && UserauthState!=="") &&
                                <>
                                    <Route  path="/" exact  component={Home}/>  
                                    <Route path="/Dashboard" component={Dashboard}/>
                                    
                                    <Route  path="/orders" component={Order}/>
                                    <Route  path="/Product" component={Product}/>
                                
                                    <Route  path="/singleItem" component={SingleItem}/>
                                    <Route  path="/Order" component={Order}/>
                                    <Route  path="/Address" component={Address}/>
                                    <Route  path="/cart" component={Cart}/>
                                    <Route  path="/Admin" component={Admin}/>
                                    <Route  path="/Attribute" component={Attribute}/>
                                    <Route  path="/category" component={Category}/>
                                    <Route  path="/ProductList" component={ProductList}/>
                                    <Route  path="/OrderSuccess" component={OrderSuccess}/>
                                    <Route  path="/Purchase" component={Purchase}/>
                                    <Route  path="/Supplier" component={Supplier}/>
                                    <Route  path="/Hsncode" component={Hsncode}/>
                                    <Route  path="/Brand" component={Brand}/>
                                    <Route  path="/Heading" component={Heading}/>
                                    <Route  path="/Banner" component={Banner}/>

                                    
                                    
                                    
                                </>
                            }
                           
                           
                           
                        </ContextProvider>
            </AuthContext.Provider>
                  
            </Switch>
           
        </Router>
        
       
    )
}
export default App;