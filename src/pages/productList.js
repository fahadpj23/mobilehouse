
import ProductListMain from '../components/ProductList/ProductListMain'
import {MobileHouseApi} from "helpers/axiosinstance";
import { Link, useHistory } from 'react-router-dom';
import { useEffect,useState } from 'react'
import MainLayoutWebsite from "components/MainLayoutWebsite";
const ProductList=(props)=>{
    let history=useHistory();
    const [products,setproducts]=useState("")
    //when we select a brand from filter brand it will storw in this state
    const [BrandChoosed,setBrandChoosed]=useState([])
    const [productBrand,setproductBrand]=useState("")
    const [TotalProduct,setTotalProduct]=useState("")
    
    const productListType = new URLSearchParams(window.location.search).get('type') && new URLSearchParams(window.location.search).get('type')
    const sort = new URLSearchParams(window.location.search).get('sort') && new URLSearchParams(window.location.search).get('sort')
    const minprice=new URLSearchParams(window.location.search).get('minprice') && new URLSearchParams(window.location.search).get('minprice')
    const maxprice=new URLSearchParams(window.location.search).get('maxprice') && new URLSearchParams(window.location.search).get('maxprice')
    const BND=new URLSearchParams(window.location.search).get('BND') ? new URLSearchParams(window.location.search).get('BND') :""
    const PageNo=new URLSearchParams(window.location.search).get('PageNo') && new URLSearchParams(window.location.search).get('PageNo')

    console.log(PageNo)

    const handlePageClick=(e)=>{
        console.log(e.selected  )
        history.replace({
            pathname: '/ProductList',
            search: `type=${productListType}&${productListType}=${new URLSearchParams(window.location.search).get(productListType)}&sort=${sort}&PageNo=${+(e.selected) +1}&BND=${BrandChoosed.toString()} &minprice=${minprice??0} + &maxprice=${maxprice??5000000}`
          })
        //    window.location.reload(false);
    }
    // sort change then  change url and relaod. 3 type of product list(newest first,hightolow..) so check params value and set related to it when change url
    const SortSelect=(sortvalue)=>{
        history.replace({
            pathname: '/ProductList',
            search: `type=${productListType}&${productListType}=${new URLSearchParams(window.location.search).get(productListType)}&sort=${sortvalue}&BND=${BrandChoosed.toString()} &minprice=${minprice??0} + &maxprice=${maxprice??5000000}`
          })
        //   window.location.reload(false);
    }

    //when choose a brand this function will work
    const BrandChoose=(BrandSele)=>{
        console.log(BrandChoosed.includes(BrandSele))
        if(BrandChoosed.includes(BrandSele)==false)
        {
            setBrandChoosed(BrandChoosed=>[...BrandChoosed,BrandSele.replace(/\s/g, "")])
            
        }
        
        //   window.location.reload(false);
    }

    //BrandFilter execute
    const BrandFilter=()=>{
        history.replace({
            pathname: '/ProductList',
            search: `type=${productListType}&${productListType}=${new URLSearchParams(window.location.search).get(productListType)}&sort=${sort}&PageNo=1&BND=${BrandChoosed.toString()} &minprice=${minprice??0} + &maxprice=${maxprice??500000} `
        })
        // window.location.reload(false);
    }

    //BrandChoose Remove
    const BrandRemove=(BrandSele)=>{
      
            BrandChoosed.filter((item,key)=>item==BrandSele)
            setBrandChoosed((prevBrandchoosed)=>prevBrandchoosed.filter((brandfilter)=>brandfilter!=BrandSele.replace(/\s/g, "")))
            
        
    }
   //show result of price filter
   const priceResult=(min,max)=>{
    history.replace({ 
        pathname: `/ProductList`,
        search: `type=${productListType}&${productListType}=${new URLSearchParams(window.location.search).get(productListType)}&sort=${sort}&PageNo=1&minprice=${min} + &maxprice=${max}`
      })
    //   window.location.reload(false);

    }
   
    if( history.action=="REPLACE"){
        
        console.log(BND=="" ? "we" : "bt")
        history.action="ok"
        MobileHouseApi.get(`/productList/${productListType}`,{params:{[productListType]:new URLSearchParams(window.location.search).get(productListType),sort:sort,BND:BrandChoosed ?   BrandChoosed.map(item => "'" + item + "'").join() : "NOBRAND",PageNo:PageNo,minprice:minprice,maxprice:maxprice}})
        .then(res=>{
            setproducts(res.data.products)
            setproductBrand(res.data.Brand)
            setTotalProduct(res.data.TotalProduct)
        }) 
    }

 console.log(BND)
 console.log(productListType)
    useEffect(()=>{
        
        if(products=="" &&   history.action!="ok")
        {
         
            BND && setBrandChoosed(BND.replace(/ /g,'').split(','))

            console.log("assssssssssssssssss")
        
            MobileHouseApi.get(`/productList/${productListType}`,{params:{[productListType]:new URLSearchParams(window.location.search).get(productListType),PageNo:PageNo,BND:BND ?  "'"+(BND.replace(/ /g,'').split(',')).join("','")+"'" : "NOBRAND",sort:sort,minprice:minprice,maxprice:maxprice}})
            .then(res=>{
                setproducts(res.data.products)
                setproductBrand(res.data.Brand)
                setTotalProduct(res.data.TotalProduct)
            }) 
      
        }

    },[])
    console.log( "'"+BrandChoosed.join("','")+"'")
// console.log(BrandChoosed.toString())
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
                BrandFilter={BrandFilter}
                BrandChoosed={BrandChoosed}
                TotalProduct={TotalProduct}
                handlePageClick={handlePageClick}
                PageNo={PageNo}
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