import React, { useState,useEffect } from 'react';
import MobileHouseApi from '../helpers/axiosinstance';
import axios from 'axios'
import SingleItemMain from '../components/SingleItemMain/SingleItemMain'
const SingleItem=(props)=>{
    
    const [singleitem, setsingleitem] = useState("")
    const [relateditems, setrelateditems] = useState("")
    useEffect(() => {
        MobileHouseApi.get(`/singleview`,{params: { productId: props.location.state.itemid}})
        
        .then(res=>{
        const product=res.data;
        setsingleitem(product)
        
          
          })   
        //   axios.get(`http://localhost:9000/related`,{params: { brand: props.location.state.itembrand,type:props.location.state.itemtype}})
        
        // .then(res=>{
      
        //     const product=res.data;
        //     setrelateditems(product)
              
          
        //   })  
           
    }, [])
    console.log(relateditems) 
    return(
        <div className="mt-10">
           
            {singleitem!="" &&<SingleItemMain
            singleitem={singleitem}
            // relateditems={relateditems}
            /> }
        </div>
    )
}
export default SingleItem