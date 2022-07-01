
import ProductListMain from '../components/ProductList/ProductListMain'
import MobileHouseApi from '../helpers/axiosinstance'
import { Link, useHistory } from 'react-router-dom';
import { useEffect,useState } from 'react'
const ProductList=(props)=>{
    let history=useHistory();
    const [products,setproducts]=useState("")
   
    const category = new URLSearchParams(window.location.search).get('category') && new URLSearchParams(window.location.search).get('category')
    const productCategory = new URLSearchParams(window.location.search).get('productCategory') && new URLSearchParams(window.location.search).get('productCategory')
    const Brand = new URLSearchParams(window.location.search).get('Brand') && new URLSearchParams(window.location.search).get('Brand')
    const sort = new URLSearchParams(window.location.search).get('sort') && new URLSearchParams(window.location.search).get('sort')
    

    const SortSelect=(sortvalue)=>{
        history.push({
            pathname: '/ProductList',
            search: `${category ? "category" : productCategory ? "productCategory" : "Brand"}=${category ? category : productCategory ? productCategory : Brand}&sort=${sortvalue}`
          })
          window.location.reload(false);
    }
    useEffect(()=>{
        
        if(products=="")
        {
        if(new URLSearchParams(window.location.search).get('productCategory'))
            {
                MobileHouseApi.get("/viewSliderProduct",{params:{productCategory:productCategory,sort:sort}})
                .then(res=>{
                    setproducts(res.data.headProduct)
                }) 
              
            } 
        else if(new URLSearchParams(window.location.search).get('Brand'))
        {
            MobileHouseApi.get("/viewBrandProduct",{params:{Brand:Brand,sort:sort}})
                .then(res=>{
                    setproducts(res.data.brandProduct)
                }) 
        }
        else
            {
                MobileHouseApi.get("/viewCategoryProduct",{params:{category:category,sort:sort}})
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
                SortSelect={SortSelect}
                sort={sort}
                />
            }
           
        </div>
    )
}
export default ProductList