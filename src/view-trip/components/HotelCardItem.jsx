import React from "react";
import { Link } from "react-router-dom";
import { getPlaceDetails } from "@/service/GlobalApi";
import { useEffect } from "react";
import { useState } from "react";
const PHOTOS_REF_URL =   "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    if (hotel) {
      GetPlaceEPhoto();
    }
  }, [hotel]);

  // Mark the function as async to use 'await'
  const GetPlaceEPhoto = async () => {
    try {
      const data = {
        textQuery: hotel?.hotelName
      };

      // Use 'await' for the API call
      const result = await getPlaceDetails(data);
      console.log(result.data.places[0].photos[3].name);
      const PhotoUrl = PHOTOS_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };
  return (
    <div>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          hotel?.hotelName +
          "," +
          hotel?.address
        }
        target="_blank"
      >
        <div className="hover:scale-105 transition-all cursor-pointer">
          <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className="rounded-xl h-[180px] w-full object-cover" alt="Hotel" />
          <div className="my-2 flex flex-col gap-2">
            <h2 className="font-medium">{hotel?.hotelName}</h2>
            <h2 className="text-xs text-gray-500">📍 {hotel?.address}</h2>
            <h2 className="text-sm">💰 {hotel?.price}</h2>
            <h2 className="text-sm">⭐ {hotel?.rating}</h2>
            <h2 className="text-xs text-orange-700">{hotel?.description}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;
