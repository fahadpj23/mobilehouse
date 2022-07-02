
import React, { useState,useEffect } from 'react';
import AllProduct from 'components/admindashboard/products/allProducts'
import {useContext} from 'react'

import { AuthContext } from '../../helpers/authcontext';
import { useHistory } from 'react-router-dom';
const Product=()=>{
    const [products, setproducts] = useState("")
    let history=useHistory();
    const Auth=useContext(AuthContext)
   
        return(
            <div>
                 <div className="flex">
                {Auth && Auth.authState=="authorized" ?
                
                <AllProduct
                product={products}
                />
                :
                    history.push("/AdminLogin")
                }
            
                </div>
                   
                 
            </div>
        )
    }
export default Product