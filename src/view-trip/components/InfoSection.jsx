import { Button } from '@/components/ui/button'
import React from 'react'
import { IoMdSend } from "react-icons/io";

function InfoSection({ trip }) {
    return (
        <div>
            <img src='/placeholder.jpg' className='h-[340px] w-full object-cover rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-sm md:text-md'>📅{trip.userSelection?.daysStaying} Day Trip</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-sm md:text-md'>💵{trip.userSelection?.budget} Plan</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-sm md:text-md'>🧍No. of Travelers: {trip.userSelection?.travelWith}</h2>
                    </div>
                </div>

                <Button><IoMdSend /></Button>

            </div>
        </div>
    )
}

export default InfoSection