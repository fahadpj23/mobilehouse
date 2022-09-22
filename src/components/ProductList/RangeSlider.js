import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import { useState,useEffect} from 'react'


const useStyles = makeStyles({
  root: {
    
    width: 180,
    
  },
});


function valuetext(value) {
  return `${value}°C`;
}
export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = useState([0, 500]);
  const [minvalue, setminvalue] = useState(0)
  const [maxvalue, setmaxvalue] = useState(props.maxval)

  const handleChange = (event, newValue) => {
   
    setValue(newValue)
    setminvalue(value[0])
    setmaxvalue(value[1])   
  };
  const inputhandlemin=( newValue)=>
  {
    setminvalue(newValue)
   
  }
  const inputhandlemax=( newValue)=>
  {
    setmaxvalue(newValue)

  }

  useEffect(() => {
    setValue([minvalue,maxvalue])
  
  }, [minvalue,maxvalue])
 
  return (
    <div className=' px-4 w-full' >
      <div className='flex w-full justify-center items-center space-x-2'>
        <h1 className='font-semibold text-xl'>₹{minvalue}</h1>
        <h1 className='text-2xl font-semibold'>-</h1>
        <h1 className='font-semibold text-xl'>₹{maxvalue}</h1>
      </div>
     
     
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={0}
        max={props.maxval}
      />
      <div className="flex justify-between lg:space-y-0 space-y-2 font-semibold text-base ">
            <h1>0</h1>
            <h1>{props.maxval}</h1>
           
        </div>
        <hr className='w-full mt-3'></hr>
        <div className='space-y-2 mt-3'>
          <button onClick={()=>(setmaxvalue(props.maxval),setminvalue(0))}  className='w-full focus:outline-none flex justify-center tracking-wider hover:text-red-500'>Clear</button>
         
          <button onClick={()=>props.priceResult(minvalue,maxvalue)} className='w-full focus:outline-none bg-blue-600 py-2 tracking-wider text-white rounded-2xl'>View Result</button>
        </div>
        
    </div>
  );
}
