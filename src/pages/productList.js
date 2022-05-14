
import ProductListMain from '../components/ProductList/ProductListMain'
import MobileHouseApi from '../helpers/axiosinstance'
import { useEffect,useState } from 'react'
const ProductList=(props)=>{
    const [products,setproducts]=useState("")
   
    const categoryId = new URLSearchParams(window.location.search).get('category')
   
    useEffect(()=>{
        if(products=="")
        {
           
        MobileHouseApi.get("/viewCategoryProduct",{params:{category:categoryId}})
          .then(res=>{
           setproducts(res.data)
          }) 
        }

    })
    return(
      
        
        <div>
            {
                products &&
                <ProductListMain
                products={products}
                />
            }
           
        </div>
    )
}
export default ProductList