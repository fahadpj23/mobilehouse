import ReactPaginate from 'react-paginate';
const PaginateTable =(props)=>{
   
            return (
                <div className="py-6">
                <ReactPaginate 
                // pageCount={isFinite(props.rowCount/props.pageSize) ? Math.ceil(props.rowCount/props.pageSize) : 0}
                pageCount={props.pageSize}
               
                perPage={props.pageSize}
                containerClassName=" pl-0 list-none m-auto rounded sm:m-0 m-auto flex justify-center mb-2 overflow-auto"
                pageClassName="page-item"
                pageLinkClassName="relative block px-5 py-1.5  border"
                activeLinkClassName="text-black bg-red-500 focus:outline-none text-white"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="relative block px-5 py-1.5  border"
                nextLinkClassName="relative block px-5 py-1.5  border"
                onPageChange={props.handlePageClick}
                />
                </div>
          );
  
}

export default PaginateTable