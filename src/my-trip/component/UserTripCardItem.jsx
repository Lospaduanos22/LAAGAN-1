
import { useState,useEffect } from "react";
import { getPlaceDetails } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

const PHOTOS_REF_URL ="https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const UserTripCardItem = ({ trip }) => {
   const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
      if (trip) {
        GetPlaceEPhoto();
      }
    }, [trip]);
  
    // Mark the function as async to use 'await'
    const GetPlaceEPhoto = async () => {
      try {
        const data = {
          textQuery: trip?.userSelection?.location?.label,
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
    <Link to={'/view-trip/'+trip?.id} >
    <div className="hover:scale-105 transition-all">
      <img src={photoUrl?photoUrl:"/placeholder.jpg"} className="object-cover rounded-xl mt-10" />
      <div>
        <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
        <h2 className="text-sm text-gray-500">{trip?.userSelection.daysStaying} Days Trip with {trip?.userSelection.budget} Plan</h2>
      </div>
    </div>
    </Link>
  );
};

export default UserTripCardItem;
