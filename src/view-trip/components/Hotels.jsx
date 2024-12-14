import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.hotelOptions?.map((item, index)=>(
              <Link to={'https://www.google.com/maps/search/?api=1&query='+item?.hotelName + "," +item?.address} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src='/placeholder.jpg' className='rounded-xl'/>
                    <div className='my-2 flex flex-col gap-2'>
                      <h2 className='font-medium'>{item?.hotelName}</h2>
                      <h2 className='text-xs text-gray-500'>📍{item?.address}</h2>
                      <h2 className='text-sm'>💰{item?.price}</h2>
                      <h2 className='text-sm'>⭐{item?.rating}</h2>
                      <h2 className='text-xs text-orange-700'>{item?.description}</h2>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Hotels