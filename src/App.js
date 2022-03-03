import React from 'react';
import Home from './pages/Home'
import ViewProduct from './pages/ViewProduct'
import Cart from './pages/cart';
import Address from './pages/address';
import {Route,BrowserRouter as Router,Switch} from  "react-router-dom";
import SingleItem from './pages/singleitem'
import Order from './pages/Order'
import Admin from './pages/admin';
import AddProduct from './pages/AddProduct';
import ShopProduct from './pages/ShopProduct';
import Dashboard from './pages/Dashboard';
import ContextProvider from './components/context/userContext';
import {useEffect,useState} from 'react'
import  MobileHouseApi from "./helpers/axiosinstance"
import { AuthContext } from "./helpers/authcontext";


function App(){
    const[ authState, setAuthState ]=useState("")
    const[ UserauthState, setUserAuthState ]=useState("")


  
   
    useEffect(()=>{
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
    },[])
   
    return(
       
        <Router>
             
            <Switch>
            <AuthContext.Provider value={{ authState, setAuthState ,UserauthState, setUserAuthState}}>
                     
                        <ContextProvider > 
                          
                            {
                                (authState!="" && UserauthState!="") &&
                                <>
                                    <Route  path="/" exact  component={Home}/>  
                                    <Route path="/Dashboard" component={Dashboard}/>
                                    <Route  path="/ViewProduct" component={ViewProduct}/>
                                    <Route  path="/orders" component={Order}/>
                                    <Route  path="/AddProduct" component={AddProduct}/>
                                
                                    <Route  path="/singleItem" component={SingleItem}/>
                                    <Route  path="/Order" component={Order}/>
                                    <Route  path="/Address" component={Address}/>
                                    <Route  path="/cart" component={Cart}/>
                                    <Route  path="/Admin" component={Admin}/>
                                
                                
                                    <Route  path="/ShopProduct" component={ShopProduct}/>
                                </>
                            }
                           
                           
                           
                        </ContextProvider>
            </AuthContext.Provider>
                  
            </Switch>
           
        </Router>
        
       
    )
}
export default App;