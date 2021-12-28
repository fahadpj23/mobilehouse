
import axios from 'axios' 
import Nav from "../components/Home/Nav"
import React, { useState,useEffect } from 'react';
import AllProduct from '../components/allProductsmain/allProducts'
function ViewProduct(props){
    const [products, setproducts] = useState("")
    useEffect(() => {
        axios.get(`http://localhost:9000/viewAll`,{params: { product: props.location.state.item}})
        
        .then(res=>{
        const product=res.data;
        setproducts(product)
          
          
          })    
    }, [])
    console.log(props.location.state)
        return(
            <div>
                    <Nav/>
                    {products!="" && 
                        <AllProduct
                        product={products}
                        />
                    }
            </div>
        )
    }
export default ViewProduct