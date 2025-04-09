import React from 'react'

const MessageBox = ({message}) => {
  return (
   <>
   <div className=' absoulute w-full h-full flex justify-center items-center '>
    <div className='flex flex-col justify-center items-center'>
        <h3>{message}</h3>

    </div>
   </div>
   </>
  )
}

export default MessageBox