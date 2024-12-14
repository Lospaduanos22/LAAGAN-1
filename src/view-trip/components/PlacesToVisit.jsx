import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  console.log('Trip Data:', trip); // Debugging

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div>
        {trip.tripData?.itinerary
          ? Object.entries(trip.tripData.itinerary).map(([day, details], index) => (
              <div key={index} className='mt-5'> 
              
                <h2 className="font-bold text-lg">Day {index + 1}</h2>
                <div className='grid md:grid-cols-2 gap-5'> {/*GOD THIS LAYOUT IS UGLY PLS FIX IT SOON */}
                <p className="text-blue-500 font-medium">{details.theme}</p>

                {['morning', 'afternoon', 'evening'].map((timeOfDay) => (
                  <div key={timeOfDay}  className=''>
                    <h3 className="font-bold text-orange-700">{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</h3>
                    <p>
                      <strong>Best Time to Visit:</strong> {details[timeOfDay]?.bestTime || 'N/A'}
                    </p>
                    {/* <p>
                      <strong>Place Name:</strong> {details[timeOfDay]?.placeName || 'N/A'}
                    </p> */}
                    <PlaceCardItem place={details[timeOfDay]} />
                  </div>
                ))}
                </div>
              </div>
            ))
          : 'No itinerary available'}
      </div>
    </div>
  );
}

export default PlacesToVisit;
