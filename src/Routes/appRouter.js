import React from 'react';
import Home from '../pages/Home'
import PageNotFound from '../pages/404Page';
import Cart from '../pages/cart';
import Address from '../pages/address';
import {Route,BrowserRouter,Routes, Navigate, Router} from  "react-router-dom";
import SingleItem from '../pages/singleitem'
import Order from '../pages/admin/Order'
import AdminLogin from '../pages/adminLogin';
import Category from '../pages/admin/category';    
import Dashboard from '../pages/admin/Dashboard';
import * as ROUTES from '../constants/route'
import ProductList from '../pages/productList'
import Attribute from '../pages/admin/Attribute'
import Product from '../pages/admin/Product';
import OrderSuccess from '../pages/ordersuccess';
import Purchase from '../pages/admin/Purchase';
import Supplier from '../pages/admin/Supplier';
import Hsncode from '../pages/admin/HsnCode';
import Brand from '../pages/admin/Brand';
import Heading from '../pages/admin/Heading';
import Banner from '../pages/admin/Banner';
import Ads from '../pages/admin/Ads';
import TermsOfService from '../pages/TermOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import RefundPolicy from '../pages/RefundPolicy';
import ShippingPolicy from '../pages/ShipplingPolicy';
import AboutUs from '../pages/AboutUs';
import Profile from '../pages/profile';
import Payment from '../pages/Payment';
import CancelOrder from '../pages/CancelOrder';
import OrderDetails from '../pages/OrderDetails';
import Sales from '../pages/admin/Sales';
function AppRouter(props){
    const {authState}=props
   
    return(
       <>
        
          
                                <BrowserRouter>
             
                                    <Routes>
                                    <Route  path={ROUTES.Home } index  element={<Home/>}/>  
                                    <Route path={ROUTES.Dashboard} element={authState=="authorized" ? <Dashboard/>  : <Navigate to="/adminLogin" replace/>}/>
                                    
                                    <Route  path={ROUTES.Order} element={authState=="authorized" ? <Order/>  : <Navigate to="/adminLogin" replace/>   } />
                                    <Route  path={ROUTES.Product} element={authState=="authorized" ? <Product/>  : <Navigate to="/adminLogin" replace/>   }/>
                                
                                    <Route exact  path={ROUTES.SingleItem} element={<SingleItem/>}/>
                                    <Route  path={ROUTES.TermsOfService} element={<TermsOfService/>}/>
                                    
                                    <Route  path={ROUTES.Address} element={<Address/>}/>
                                    <Route  path={ROUTES.Cart} element={<Cart/>}/>
                                    <Route  path={ROUTES.AdminLogin} element={authState=="authorized" ? <Navigate to="/admin/Dashboard" replace/>  : <AdminLogin/>}/>
                                    <Route  path={ROUTES.Attribute} element={authState=="authorized" ? <Attribute/>  : <Navigate to="/adminLogin" replace/>  }/>
                                    <Route  path={ROUTES.Category} element={authState=="authorized" ? <Category/>  : <Navigate to="/adminLogin" replace/>   } />
                                    <Route  path={ROUTES.ProductList} element={<ProductList/>}/>
                                    <Route  path={ROUTES.OrderSuccess} element={<OrderSuccess/>}/>
                                    <Route  path={ROUTES.Purchase} element={authState=="authorized" ? <Purchase/>  : <Navigate to="/adminLogin" replace/>   }/>
                                    <Route  path={ROUTES.Purchase} element={authState=="authorized" ? <Supplier/>  : <Navigate to="/adminLogin" replace/>   }/>
                                    <Route  path={ROUTES.Hsncode} element={authState=="authorized" ? <Hsncode/>  : <Navigate to="/adminLogin" replace/>   }/>
                                    <Route  path={ROUTES.Brand} element={authState=="authorized" ? <Brand/>  : <Navigate to="/adminLogin" replace/>   }/>
                                    <Route  path={ROUTES.Heading} element={authState=="authorized" ? <Heading/>  : <Navigate to="/adminLogin" replace/>   }/>
                                    <Route  path={ROUTES.Sales} element={authState=="authorized" ? <Sales/>  : <Navigate to="/adminLogin" replace/>   }/>
                                    <Route  path={ROUTES.Banner} element={authState=="authorized" ? <Banner/>  : <Navigate to="/adminLogin" replace/>   }/>
                                    <Route  path={ROUTES.Ads} element={authState=="authorized" ? <Ads/>  : <Navigate to="/adminLogin" replace/>   }/>
                                    <Route  path={ROUTES.PrivacyPolicy} element={<PrivacyPolicy/>}/>
                                    <Route  path={Routes.RefundPolicy} element={<RefundPolicy/>}/>
                                    <Route  path={ROUTES.ShippingPolicy} element={<ShippingPolicy/>}/>
                                    <Route  path={ROUTES.AboutUs} element={<AboutUs/>}/>
                                    <Route  path={ROUTES.Profile} element={<Profile/>}/>
                                    <Route  path={ROUTES.Payment} element={<Payment/>}/>
                                    <Route  path={ROUTES.OrderDetails} element={<OrderDetails/>}/>
                                    <Route  path={ROUTES.CancelOrder} element={<CancelOrder/>}/>
                                  

                                    <Route  path={ROUTES.PageNotFound}  element={<PageNotFound/>}/>

                                    
                                    
                                    
                                    </Routes>
           
           </BrowserRouter>
                            
                           
                           
                           
                     
                  
           
        
        </>
    )
}
export default AppRouter;