
import ProductListMain from '../components/ProductList/ProductListMain'
import {MobileHouseApi} from "helpers/axiosinstance";
import { Link, useHistory } from 'react-router-dom';
import { useEffect,useState } from 'react'
import MainLayoutWebsite from "components/MainLayoutWebsite";
const ProductList=(props)=>{
    let history=useHistory();
    const [products,setproducts]=useState("")
    const [BrandChoosed,setBrandChoosed]=useState([])
    const [productBrand,setproductBrand]=useState("")
    
    const productListType = new URLSearchParams(window.location.search).get('type') && new URLSearchParams(window.location.search).get('type')
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
        console.log(BrandChoosed.includes(BrandSele))
        if(BrandChoosed.includes(BrandSele)==false)
        {
            setBrandChoosed(BrandChoosed=>[...BrandChoosed,BrandSele])
            history.replace({
                pathname: '/ProductList',
                search: `${category ? "category" : productCategory ? "productCategory" : "Brand"}=${category ? category : productCategory ? productCategory : Brand}&sort=${sort}&BND=${BrandChoosed.toString()} &minprice=${minprice??0} + &maxprice=${maxprice??5000} `
            })
        }
        
        //   window.location.reload(false);
    }

    //BrandChoose Remove
    const BrandRemove=(BrandSele)=>{
      
            BrandChoosed.filter((item,key)=>item==BrandSele)
            setBrandChoosed((prevBrandchoosed)=>prevBrandchoosed.filter((brandfilter)=>brandfilter!=BrandSele))
          
        
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
           
        setproducts(res.data.products)
        setproductBrand(res.data.ProductBrand)
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
 console.log(productListType)
    useEffect(()=>{
        
        if(products=="")
        {
         
            BND && setBrandChoosed(BND.replace(/ /g,'').split(','))

          
        
            MobileHouseApi.get(`/productList/${productListType}`,{params:{[productListType]:new URLSearchParams(window.location.search).get(productListType),sort:sort,minprice:minprice,maxprice:maxprice}})
            .then(res=>{
                setproducts(res.data.products)
            }) 
        //when productlist related to catgeory 
    //     if(new URLSearchParams(window.location.search).get('productCategory'))
    //         {
             
    //             MobileHouseApi.get("/viewSliderProduct",{params:{productCategory:productCategory,sort:sort,minprice:minprice,maxprice:maxprice}})
    //             .then(res=>{
    //                 setproducts(res.data.headProduct)
    //             }) 
              
    //         } 

    //     // when click ads on home page then this will work
    //     if(new URLSearchParams(window.location.search).get('Brand'))
    //     {
           
    //         MobileHouseApi.get("/viewBrandProduct",{params:{Brand:Brand,sort:sort,minprice:minprice,maxprice:maxprice}})
    //             .then(res=>{
    //                 setproducts(res.data.brandProduct)
    //             }) 
    //     }

    //   //when click view all in product slide this will work

    //      if(new URLSearchParams(window.location.search).get('category'))
    //     {
       
    //         MobileHouseApi.get("/viewCategoryProduct",{params:{category:category,sort:sort,minprice:minprice,maxprice:maxprice,BND:BND && BND.split(',').map(s => `'${s}'`).join(',')}})
    //         .then(res=>{
               
    //          setproducts(res.data.products)
    //          setproductBrand(res.data.ProductBrand)
    //         }) 
          
    //     }

    //      //when click enter while type in search select all product name start with search value

    //     if(new URLSearchParams(window.location.search).get('searchitem'))
    //         {
               
            
    //           MobileHouseApi.get("/viewSerachValueProduct",{params:{searchValue:searchValue,sort:sort,minprice:minprice,maxprice:maxprice}})
    //           .then(res=>{
    //               setproducts(res.data.viewSearchProduct)
    //           }) 
    //         }
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
                productBrand={productBrand}
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