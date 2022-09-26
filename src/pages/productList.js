
import ProductListMain from '../components/ProductList/ProductListMain'
import {MobileHouseApi} from "helpers/axiosinstance";
import { Link, useHistory } from 'react-router-dom';
import { useEffect,useState } from 'react'
import MainLayoutWebsite from "components/MainLayoutWebsite";
const ProductList=(props)=>{
    let history=useHistory();
    const [products,setproducts]=useState("")
    const [BrandChoosed,setBrandChoosed]=useState([])
    
    const category = new URLSearchParams(window.location.search).get('category') && new URLSearchParams(window.location.search).get('category')
    const productCategory = new URLSearchParams(window.location.search).get('productCategory') && new URLSearchParams(window.location.search).get('productCategory')
    const Brand = new URLSearchParams(window.location.search).get('Brand') && new URLSearchParams(window.location.search).get('Brand')
    const searchValue = new URLSearchParams(window.location.search).get('searchitem') && new URLSearchParams(window.location.search).get('searchitem')
    const sort = new URLSearchParams(window.location.search).get('sort') && new URLSearchParams(window.location.search).get('sort')
    const minprice=new URLSearchParams(window.location.search).get('minprice') && new URLSearchParams(window.location.search).get('minprice')
    const maxprice=new URLSearchParams(window.location.search).get('maxprice') && new URLSearchParams(window.location.search).get('maxprice')
    const BND=new URLSearchParams(window.location.search).get('BND') && new URLSearchParams(window.location.search).get('BND')

    console.log(BND)
    // sort change then  change url and relaod. 3 type of product list(newest first,hightolow..) so check params value and set related to it when change url
    const SortSelect=(sortvalue)=>{
        history.push({
            pathname: '/ProductList',
            search: `${category ? "category" : productCategory ? "productCategory" : "Brand"}=${category ? category : productCategory ? productCategory : Brand}&sort=${sortvalue}`
          })
          window.location.reload(false);
    }

    //when choose a brand this function will work
    const BrandChoose=(BrandSele)=>{
        console.log(BrandSele)
        setBrandChoosed(BrandChoosed=>[...BrandChoosed,"'"+BrandSele+"'"])
        history.replace({
            pathname: '/ProductList',
            search: `${category ? "category" : productCategory ? "productCategory" : "Brand"}=${category ? category : productCategory ? productCategory : Brand}&sort=${sort}&BND=${BrandChoosed.toString()} &minprice=${minprice??0} + &maxprice=${maxprice??5000} `
          })
        //   window.location.reload(false);
    }

    //BrandChoose Remove
    const BrandRemove=(BrandSele)=>{
        console.log("ds")
    }
   //show result of price filter
   const priceResult=(min,max)=>{
    history.replace({
        pathname: '/ProductList',
        search: `${category ? "category" : productCategory ? "productCategory" : "Brand"}=${category ? category : productCategory ? productCategory : Brand}&sort=${sort}&minprice=${min} + &maxprice=${max}`
      })
      window.location.reload(false);

    }
   
    if( history.action=="PUSH"){
        history.action="ok"
        if(new URLSearchParams(window.location.search).get('productCategory'))
        {
           
            MobileHouseApi.get("/viewSliderProduct",{params:{productCategory:productCategory,sort:sort,minprice:minprice,maxprice:maxprice}})
            .then(res=>{
                setproducts(res.data.headProduct)
            }) 
        
        } 

        // when click ads on home page then this will work
        if(new URLSearchParams(window.location.search).get('Brand'))
        {
      
        MobileHouseApi.get("/viewBrandProduct",{params:{Brand:Brand,sort:sort,minprice:minprice,maxprice:maxprice}})
            .then(res=>{
                setproducts(res.data.brandProduct)
            }) 
        }

        //when click view all in product slide this will work

        if(new URLSearchParams(window.location.search).get('category'))
        {
        
        MobileHouseApi.get("/viewCategoryProduct",{params:{category:category,sort:sort,minprice:minprice,maxprice:maxprice,BND:BND}})
        .then(res=>{
           
        setproducts(res.data)
        }) 

        }   

        //when click enter while type in search select all product name start with search value

        if(new URLSearchParams(window.location.search).get('searchitem'))
        {
        
        
        MobileHouseApi.get("/viewSerachValueProduct",{params:{searchValue:searchValue,sort:sort,minprice:minprice,maxprice:maxprice}})
        .then(res=>{
            setproducts(res.data.viewSearchProduct)
        }) 
        }
    }

 console.log(BND)
    useEffect(()=>{
        
        if(products=="")
        {
           
            BND && setBrandChoosed(BND.split(',').map(s => `'${s}'`).join(','))
        //when productlist related to catgeory 
        if(new URLSearchParams(window.location.search).get('productCategory'))
            {
             
                MobileHouseApi.get("/viewSliderProduct",{params:{productCategory:productCategory,sort:sort,minprice:minprice,maxprice:maxprice}})
                .then(res=>{
                    setproducts(res.data.headProduct)
                }) 
              
            } 

        // when click ads on home page then this will work
        if(new URLSearchParams(window.location.search).get('Brand'))
        {
           
            MobileHouseApi.get("/viewBrandProduct",{params:{Brand:Brand,sort:sort,minprice:minprice,maxprice:maxprice}})
                .then(res=>{
                    setproducts(res.data.brandProduct)
                }) 
        }

      //when click view all in product slide this will work

         if(new URLSearchParams(window.location.search).get('category'))
        {
       
            MobileHouseApi.get("/viewCategoryProduct",{params:{category:category,sort:sort,minprice:minprice,maxprice:maxprice,BND:BND && BND.split(',').map(s => `'${s}'`).join(',')}})
            .then(res=>{
               
             setproducts(res.data)
            }) 
          
        }

         //when click enter while type in search select all product name start with search value

        if(new URLSearchParams(window.location.search).get('searchitem'))
            {
               
            
              MobileHouseApi.get("/viewSerachValueProduct",{params:{searchValue:searchValue,sort:sort,minprice:minprice,maxprice:maxprice}})
              .then(res=>{
                  setproducts(res.data.viewSearchProduct)
              }) 
            }
        }

    },[])
    console.log(BND)
console.log(BrandChoosed)
    return(
      
        
        <div>
             <MainLayoutWebsite>
            {
                products &&
                <ProductListMain
                products={products}
                SortSelect={SortSelect}
                sort={sort}
                priceResult={priceResult}
                minprice={minprice}
                maxprice={maxprice}
                BrandChoose={BrandChoose}
                BrandRemove={BrandRemove}
                />
            }
           </MainLayoutWebsite>
        </div>
    )
}
export default ProductList

//    MobileHouseApi.get("/ProductList",{params:{type:new URLSearchParams(window.location.search).get('type'),productList:new URLSearchParams(window.location.search).get(`${new URLSearchParams(window.location.search).get('type')}`),sort:sort,minprice:minprice,maxprice:maxprice}})
//             .then(res=>{
//                 console.log(res.data.headProduct)
//             })  