import React from 'react'

const CommonButtons = ({text}) => {
  return (
    <>
      <div className='w-full py-2 px-6 bg-primary text-white text-center cursor-pointer rounded-sm active:scale-95'>
        <p className='text-lg'>{text}</p>
      </div>
    </>
  )
}

export default CommonButtons
