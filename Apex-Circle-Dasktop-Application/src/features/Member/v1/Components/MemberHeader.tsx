import React from 'react'

const MemberHeader = () => {
  return (
    <div className='w-full py-[3vh] bg-white border-b-[1px] border-gray-300 flex   text-xl font-bold  justify-between '
    >
        
  
    <div className="w-1/3 h-full  bg-amber-50 flex justify-between items-center">
   <h1 className='text-2xl font-bold text-gray-800  ml-5 mt-2'>Member Managements</h1>
     <span className='text-sm text-gray-500 ml-5'>1,248 Members</span>
    
    </div>
    <div className="w-1/3 h-full bg-red-500"></div>
        
        </div>
  )
}

export default MemberHeader