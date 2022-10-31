
import React, { useState,useEffect } from 'react';
import AllProduct from 'components/admindashboard/products/allProducts'
import {useContext} from 'react'

import { AuthContext } from '../../helpers/authcontext';
import { useNavigate } from 'react-router-dom';
import TableContent from 'components/admindashboard/table';
import MainLayoutAdmin from 'components/admindashboard/MainLayoutAdmin';
const Product=()=>{
    const [products, setproducts] = useState("")
    let navigate=useNavigate();
    const Auth=useContext(AuthContext)
   
        return(
            <div>
                 <div className="flex">
                {Auth && Auth.authState=="authorized" ?
                <MainLayoutAdmin>
                <TableContent
                controller="product"
                />
                </MainLayoutAdmin>
               
                :
                    navigate("/AdminLogin")
                }
            
                </div>
                   
                 
            </div>
        )
    }
export default Product