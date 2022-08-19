
import React, { useState,useEffect } from 'react';
import AllProduct from 'components/admindashboard/products/allProducts'
import {useContext} from 'react'

import { AuthContext } from '../../helpers/authcontext';
import { useHistory } from 'react-router-dom';
import TableContent from 'components/admindashboard/table';
import MainLayoutAdmin from 'components/admindashboard/MainLayoutAdmin';
const Product=()=>{
    const [products, setproducts] = useState("")
    let history=useHistory();
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
                    history.push("/AdminLogin")
                }
            
                </div>
                   
                 
            </div>
        )
    }
export default Product