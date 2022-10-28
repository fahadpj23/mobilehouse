import React from 'react';
import Home from './pages/Home'
import PageNotFound from 'pages/404Page';
import Cart from './pages/cart';
import Address from './pages/address';
import {Route,BrowserRouter as Router,Switch} from  "react-router-dom";
import SingleItem from './pages/singleitem'
import Order from './pages/admin/Order'
import AdminLogin from './pages/adminLogin';
import Category from './pages/admin/category';    
import Dashboard from './pages/admin/Dashboard';
import ContextProvider from './components/context/userContext';
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
                          
                            {
                                (authState!=="" && UserauthState!=="") &&
                                <Router>
             
                                    <Switch>
                                    <Route  path="/" exact  component={Home}/>  
                                    <Route path="/admin/Dashboard" component={Dashboard}/>
                                    
                                    <Route  path="/admin/orders" component={Order}/>
                                    <Route  path="/admin/Product" component={Product}/>
                                
                                    <Route  path="/singleItem" component={SingleItem}/>
                                    <Route  path="/TermsOfService" component={TermsOfService}/>
                                    
                                    <Route  path="/Address" component={Address}/>
                                    <Route  path="/cart" component={Cart}/>
                                    <Route  path="/adminLogin" component={AdminLogin}/>
                                    <Route  path="/admin/Attribute" component={Attribute}/>
                                    <Route  path="/admin/category" component={Category}/>
                                    <Route  path="/ProductList" component={ProductList}/>
                                    <Route  path="/OrderSuccess" component={OrderSuccess}/>
                                    <Route  path="/admin/Purchase" component={Purchase}/>
                                    <Route  path="/admin/Supplier" component={Supplier}/>
                                    <Route  path="/admin/Hsncode" component={Hsncode}/>
                                    <Route  path="/admin/Brand" component={Brand}/>
                                    <Route  path="/admin/Heading" component={Heading}/>
                                    <Route  path="/admin/Sales" component={Sales}/>
                                    <Route  path="/admin/Banner" component={Banner}/>
                                    <Route  path="/admin/Ads" component={Ads}/>
                                    <Route  path="/PrivacyPolicy" component={PrivacyPolicy}/>
                                    <Route  path="/RefundPolicy" component={RefundPolicy}/>
                                    <Route  path="/ShippingPolicy" component={ShippingPolicy}/>
                                    <Route  path="/AboutUs" component={AboutUs}/>
                                    <Route  path="/Profile" component={Profile}/>
                                    <Route  path="/Payment" component={Payment}/>
                                    <Route  path="/Myorders/OrderDetails" component={OrderDetails}/>
                                    <Route  path="/Myorders/CancelOrder" component={CancelOrder}/>
                                  

                                    <Route    component={PageNotFound}/>

                                    
                                    
                                    
                                    </Switch>
           
           </Router>
                            }
                           
                           
                           
                        </ContextProvider>
            </AuthContext.Provider>
                  
           
        
        </>
    )
}
export default App;