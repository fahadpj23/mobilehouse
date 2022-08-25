import { AiFillDelete } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import AllProduct from './products/allProducts';
import CategoryMain from './Catgory/categoryMain';
import AttributeMain from './Attribute/AttributeMain';
import HsnMain from './Hsn/HsnMain';
import HeadingMain from './Heading/HeadingMain';
import BannerMain from './Banner/BannerMain';
import AdsMain from './Ads/AdsMain';
const NavOperation=(props)=>{

   console.log(props.controller)
    return(
        <div className=' bg-gray-100'>
            <div className="w-full sm:flex justify-between  pt-10 pb-5 px-3">
                <div>
               
                    <h1 className='ml-5  font-semibold text-lg uppercase'>{ props.controller}</h1>
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
                                    AddWindowClose={props.AddWindowClose}
                                    operation={props.operation}
                                    operationitem={props.operationitem}
                                
                                />

                            }
                            {
                                props.controller=='attribute' &&
                                <AttributeMain
                                    AddSucess={props.AddSucess}
                                    AddWindowClose={props.AddWindowClose}
                                    operation={props.operation}
                                    operationitem={props.operationitem}
                                
                                />
                            }
                             {
                                props.controller=='HSN' &&
                                <HsnMain
                                    AddSucess={props.AddSucess}
                                    AddWindowClose={props.AddWindowClose}
                                    operation={props.operation}
                                    operationitem={props.operationitem}
                                
                                />
                            }
                           {
                                props.controller=='Heading' &&
                                <HeadingMain
                                    AddSucess={props.AddSucess}
                                    AddWindowClose={props.AddWindowClose}
                                    operation={props.operation}
                                    operationitem={props.operationitem}
                                
                                />
                            }
                            {
                               props.controller=='banner' &&
                               <BannerMain
                                   AddSucess={props.AddSucess}
                                   AddWindowClose={props.AddWindowClose}
                                   operation={props.operation}
                                   operationitem={props.operationitem}
                               
                               />  
                            }
                            {
                                 props.controller=='Ads' &&
                                 <AdsMain
                                     AddSucess={props.AddSucess}
                                     AddWindowClose={props.AddWindowClose}
                                     operation={props.operation}
                                     operationitem={props.operationitem}
                                 
                                 />  
                                
                            }
                           
                        </div>
                }
            </div>
        </div>
    )
}
export default NavOperation