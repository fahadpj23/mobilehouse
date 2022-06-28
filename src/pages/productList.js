
import ProductListMain from '../components/ProductList/ProductListMain'
import MobileHouseApi from '../helpers/axiosinstance'
import { useEffect,useState } from 'react'
const ProductList=(props)=>{
    const [products,setproducts]=useState("")
   
    const categoryId = new URLSearchParams(window.location.search).get('category')
    const productCategory = new URLSearchParams(window.location.search).get('productCategory') && new URLSearchParams(window.location.search).get('productCategory')
    const Brand = new URLSearchParams(window.location.search).get('Brand') && new URLSearchParams(window.location.search).get('Brand')
    
    useEffect(()=>{
        
        if(products=="")
        {
        if(new URLSearchParams(window.location.search).get('productCategory'))
            {
                MobileHouseApi.get("/viewSliderProduct",{params:{productCategory:productCategory}})
                .then(res=>{
                    setproducts(res.data.headProduct)
                }) 
              
            } 
        else if(new URLSearchParams(window.location.search).get('Brand'))
        {
            MobileHouseApi.get("/viewBrandProduct",{params:{Brand:Brand}})
                .then(res=>{
                    setproducts(res.data.brandProduct)
                }) 
        }
        else
            {
                MobileHouseApi.get("/viewCategoryProduct",{params:{category:categoryId}})
                .then(res=>{
                    console.log(res.data)
                 setproducts(res.data)
                }) 
              }
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