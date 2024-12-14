import { Button } from '@/components/ui/button';
import React from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    if (!place) {
        return null; // Return nothing if place is undefined or null
    }

    return (
            <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all">
                <img
                    src={place.image || '/placeholder.jpg'} // Use a placeholder if no image is provided
                    alt={place.placeName || 'Place'}
                    className="w-[130px] h-[130px] rounded-xl"
                />

                <div>
                    <h2 className='font-bold text-lg'>{place.placeName || 'N/A'}</h2>
                    <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                    <h2 className='mt-2'>🕙 {place.timeTravel}</h2>
                    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
                    <Button size="sm"><FaMapLocationDot /></Button>
                    </Link>
                </div>

            </div>
    );
}

export default PlaceCardItem;
