
import ProductListMain from '../components/ProductList/ProductListMain'
import {MobileHouseApi} from "helpers/axiosinstance";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react'
import MainLayoutWebsite from "components/MainLayoutWebsite";
const ProductList=(props)=>{
    let navigate=useNavigate();
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

    console.log(navigate.action)
   
    const handlePageClick=(e)=>{
        setproducts("")
        navigate({
            pathname: '/ProductList',
            search: `type=${productListType}&${productListType}=${new URLSearchParams(window.location.search).get(productListType)}&sort=${sort}&PageNo=${+(e.selected) +1} ${BND ? `&BND=${BrandChoosed.toString()}`:""} ${minprice ? `&minprice=${minprice}  &maxprice=${maxprice}` : ""}`
          },{replace:true})
        //    window.location.reload(false);
    }
    // sort change then  change url and relaod. 3 type of product list(newest first,hightolow..) so check params value and set related to it when change url
    const SortSelect=(sortvalue)=>{
        setproducts("")
        navigate({
            pathname: '/ProductList',
            search: `type=${productListType}&${productListType}=${new URLSearchParams(window.location.search).get(productListType)}&sort=${sortvalue}&PageNo=${PageNo} &${BND ? `&BND=${BrandChoosed.toString()}`:""} ${minprice ? `&minprice=${minprice}  &maxprice=${maxprice}` : ""}`
          },{replace:true})
        //   window.location.reload(false);
    }

    //when choose a brand this function will work
    const BrandChoose=(BrandSele)=>{
       
        if(BrandChoosed.includes(BrandSele)==false)
        {
            setBrandChoosed(BrandChoosed=>[...BrandChoosed,BrandSele.replace(/\s/g, "")])
            
        }

    }

    //BrandFilter execute
    const BrandFilter=()=>{
        setproducts("")
        navigate({
            pathname: '/ProductList',
            search: `type=${productListType}&${productListType}=${new URLSearchParams(window.location.search).get(productListType)}&sort=${sort}&PageNo=${PageNo} &${`&BND=${BrandChoosed.toString()}`} ${minprice ? `&minprice=${minprice}  &maxprice=${maxprice}` : ""}`

        },{replace:true})
      
    }

    //BrandChoose Remove
    const BrandRemove=(BrandSele)=>{
      
            BrandChoosed.filter((item,key)=>item==BrandSele)
            setBrandChoosed((prevBrandchoosed)=>prevBrandchoosed.filter((brandfilter)=>brandfilter!=BrandSele.replace(/\s/g, "")))
            
        
    }
   //show result of price filter
   const priceResult=(min,max)=>{
   

    navigate({ 
        pathname: `/ProductList`,
        search: `type=${productListType}&${productListType}=${new URLSearchParams(window.location.search).get(productListType)}&sort=${sort}&PageNo=${PageNo} &${BND ? `&BND=${BrandChoosed.toString()}`:""} &minprice=${min}  &maxprice=${max}`

    },{replace:true})
    

    }
  

 
    useEffect(()=>{
        
        
            window.scrollTo(0, 0)
            BND && setBrandChoosed(BND.replace(/ /g,'').split(','))
          
            MobileHouseApi.get(`/productList/${productListType}`,{params:{[productListType]:new URLSearchParams(window.location.search).get(productListType),PageNo:PageNo,BND:BND ?  "'"+(BND.replace(/ /g,'').split(',')).join("','")+"'" : "NOBRAND",sort:sort,minprice:minprice,maxprice:maxprice}})
            .then(res=>{
                setproducts(res.data.products)
                setproductBrand(res.data.Brand)
                setTotalProduct(res.data.TotalProduct)
            }) 
      
        
      

    },[sort,minprice,maxprice,BND,PageNo])

   
    return(
      
        
        <div>
             <MainLayoutWebsite>
            {
                products ?
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
                :
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-6'>
                    {[...Array(15)].map((item,key)=>{
                        return(
                            
                        <div class="shadow rounded-md p-2 max-w-sm w-full mx-auto">
                        <div class="animate-pulse space-y-4">
                            <div className='w-full flex justify-center'>
                                <div className='h-32 w-32 bg-gray-200'></div>
                                
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded "></div>
                            <div className="h-2 w-6/12 bg-gray-200 rounded "></div>
                            <div class="grid grid-cols-3 gap-4 ">
                                <div class="h-2 bg-gray-200 rounded col-span-2"></div>
                                <div class="h-6 bg-gray-200 rounded col-span-1"></div>
                            </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
             
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