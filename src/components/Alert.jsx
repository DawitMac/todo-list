import React from 'react'
import { useEffect } from 'react'

const Alert = ({title , msg , handleAlert , list }) => {
    useEffect(()=>{
       const timeout = setTimeout(()=>{
         handleAlert();
       },3000)
       return ()=> clearTimeout(timeout)
    },[list])
  return (
    <div className={`${title === 'success' ? 'bg-green-400' : 'bg-red-400'} w-full flex items-center justify-center`}>
        <p className='text-md font-light'>{msg}</p>
    </div>
  )
}

export default Alert