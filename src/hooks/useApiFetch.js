import { useState,useEffect } from "react";
import { MobileHouseApi } from "helpers/axiosinstance";
const useApiFetch=(url)=>{
    const[apiData,setApiData]=useState("")
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState("true")
    useEffect(()=>{
        MobileHouseApi.get(url)
        .then((res)=>{
            setApiData(res.data)
            setLoading(false)
        })
        .catch((err)=>
        {
            setError(err)
            setLoading(false)
        })
    },[])
    return { loading, apiData,error };
}
export default useApiFetch