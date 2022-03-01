const DetailsBox=(props)=>{
    return(
        <div className="w-10/12">
            <div className="w-full flex flex-col items-center justify-center  ">
                <h1>{props.head}</h1>
                <h1><span>{props.amount}</span> <span className="text-sm">This Month</span></h1>

            </div>
        </div>
    )
}
export default DetailsBox