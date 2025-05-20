import React from 'react'

const SkeletonLoading = () => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8'>
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className='w-full bg-gray-500 rounded-lg overflow-hidden shadow-lg animate-pulse'
        >
          <div className='h-80 bg-gray-500 margin-bottom'>
          </div>

          <div className='p-4 flex flex-col gap-2 margin-bottom'>
            <div className='h-4 bg-gray-600 rounded w-3/4'></div>
            <div className='h-4 bg-gray-600 rounded w-1/4'></div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default SkeletonLoading