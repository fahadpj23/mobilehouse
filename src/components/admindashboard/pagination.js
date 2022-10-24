import ReactPaginate from 'react-paginate';

const PaginateTable =(props)=>{
   console.log(props)
            return (
                <div className="py-6">
                <ReactPaginate 
               
                pageCount={props.pageSize}
                forcePage={(+props.pageNo-1)}
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