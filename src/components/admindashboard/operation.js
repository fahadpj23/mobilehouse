import { AiFillDelete } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import AllProduct from './products/allProducts';
import CategoryMain from './Catgory/categoryMain';
const NavOperation=(props)=>{

   console.log("dsd")
    return(
        <div className=' bg-gray-100'>
            <div className="w-full sm:flex justify-between  pt-10 pb-5 px-3">
                <div>
               
                    <h1 className='ml-5 uppercase font-semibold text-lg'>{ window.location.href.substring(window.location.href.lastIndexOf("/") + 1, window.location.href.length)}</h1>
                </div>
                <div className='flex space-x-3 justify-end'>
                    <button className=" flex items-center px-3 py-1 border border-gray-400 rounded space-x-1"><h1><AiFillDelete/></h1> <h1 className='hidden sm:block'>Delete</h1></button>
                    <button  className=" flex items-center  px-3 py-1 border border-gray-400 rounded space-x-1 "> <h1><MdModeEdit/></h1> <h1 className='hidden sm:block'>Edit</h1></button>
                    <button onClick={()=>props.setAddNewstatus(true)}className="px-3 flex items-center py-1 border border-gray-400  space-x-1 rounded "><h1><FaPlus/></h1> <h1 className='hidden sm:block'>Add New</h1></button>
                </div>  
                
                {
                    props.AddNewstatus && 

                        <div className='w-screen h-screen fixed left-0 top-0 z-20'>
                            {
                                props.controller=='product' &&
                                
                                <AllProduct
                                AddSucess={props.AddSucess}
                                operation={props.operation}
                                operationitem={props.operationitem}
                                AddWindowClose={props.AddWindowClose}
                                />
                            }
                            {
                                props.controller=='category' &&
                                <CategoryMain
                                    AddSucess={props.AddSucess}
                                    operation={props.operation}
                                    operationitem={props.operationitem}
                                    AddWindowClose={props.AddWindowClose}
                                
                                />

                            }
                           
                        </div>
                }
            </div>
        </div>
    )
}
export default NavOperation