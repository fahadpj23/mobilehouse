
import ProductListMain from '../components/ProductList/ProductListMain'
import {MobileHouseApi} from "helpers/axiosinstance";
import { Link, useHistory } from 'react-router-dom';
import { useEffect,useState } from 'react'
import MainLayoutWebsite from "components/MainLayoutWebsite";
const ProductList=(props)=>{
    let history=useHistory();
    const [products,setproducts]=useState("")
   
    const category = new URLSearchParams(window.location.search).get('category') && new URLSearchParams(window.location.search).get('category')
    const productCategory = new URLSearchParams(window.location.search).get('productCategory') && new URLSearchParams(window.location.search).get('productCategory')
    const Brand = new URLSearchParams(window.location.search).get('Brand') && new URLSearchParams(window.location.search).get('Brand')
    const searchValue = new URLSearchParams(window.location.search).get('searchitem') && new URLSearchParams(window.location.search).get('searchitem')
    const sort = new URLSearchParams(window.location.search).get('sort') && new URLSearchParams(window.location.search).get('sort')
    
    // sort change then  change url and relaod 3 type pf product list so check params value and set related to it when change url
    const SortSelect=(sortvalue)=>{
        history.push({
            pathname: '/ProductList',
            search: `${category ? "category" : productCategory ? "productCategory" : "Brand"}=${category ? category : productCategory ? productCategory : Brand}&sort=${sortvalue}`
          })
          window.location.reload(false);
    }
   
    if( history.action=="PUSH"){
        history.action="ok"
        if(new URLSearchParams(window.location.search).get('productCategory'))
        {
           
            MobileHouseApi.get("/viewSliderProduct",{params:{productCategory:productCategory,sort:sort}})
            .then(res=>{
                setproducts(res.data.headProduct)
            }) 
        
        } 

        // when click ads on home page then this will work
        if(new URLSearchParams(window.location.search).get('Brand'))
        {
      
        MobileHouseApi.get("/viewBrandProduct",{params:{Brand:Brand,sort:sort}})
            .then(res=>{
                setproducts(res.data.brandProduct)
            }) 
        }

        //when click view all in product slide this will work

        if(new URLSearchParams(window.location.search).get('category'))
        {
        
        MobileHouseApi.get("/viewCategoryProduct",{params:{category:category,sort:sort}})
        .then(res=>{
           
        setproducts(res.data)
        }) 

        }

        //when click enter while type in search select all product name start with search value

        if(new URLSearchParams(window.location.search).get('searchitem'))
        {
        
        
        MobileHouseApi.get("/viewSerachValueProduct",{params:{searchValue:searchValue,sort:sort}})
        .then(res=>{
            setproducts(res.data.viewSearchProduct)
        }) 
        }
    }


    useEffect(()=>{
       
        if(products=="")
        {
           
         
        //when productlist related to catgeory 
        if(new URLSearchParams(window.location.search).get('productCategory'))
            {
             
                MobileHouseApi.get("/viewSliderProduct",{params:{productCategory:productCategory,sort:sort}})
                .then(res=>{
                    setproducts(res.data.headProduct)
                }) 
              
            } 

        // when click ads on home page then this will work
        if(new URLSearchParams(window.location.search).get('Brand'))
        {
           
            MobileHouseApi.get("/viewBrandProduct",{params:{Brand:Brand,sort:sort}})
                .then(res=>{
                    setproducts(res.data.brandProduct)
                }) 
        }

      //when click view all in product slide this will work

         if(new URLSearchParams(window.location.search).get('category'))
        {
       
            MobileHouseApi.get("/viewCategoryProduct",{params:{category:category,sort:sort}})
            .then(res=>{
               
             setproducts(res.data)
            }) 
          
        }

         //when click enter while type in search select all product name start with search value

        if(new URLSearchParams(window.location.search).get('searchitem'))
            {
               
            
              MobileHouseApi.get("/viewSerachValueProduct",{params:{searchValue:searchValue,sort:sort}})
              .then(res=>{
                  setproducts(res.data.viewSearchProduct)
              }) 
            }
        }

    },[])

    return(
      
        
        <div>
             <MainLayoutWebsite>
            {
                products &&
                <ProductListMain
                products={products}
                SortSelect={SortSelect}
                sort={sort}
                />
            }
           </MainLayoutWebsite>
        </div>
    )
}
export default ProductList

//    MobileHouseApi.get("/ProductList",{params:{type:new URLSearchParams(window.location.search).get('type'),productList:new URLSearchParams(window.location.search).get(`${new URLSearchParams(window.location.search).get('type')}`),sort:sort}})
//             .then(res=>{
//                 console.log(res.data.headProduct)
//             })  