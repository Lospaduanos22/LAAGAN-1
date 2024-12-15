import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getPlaceDetails } from "@/service/GlobalApi";
import { useEffect, useState } from "react";

const PHOTOS_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function PlaceCardItem({ place }) {
  if (!place) {
    return null; // Return nothing if place is undefined or null
  }

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (place) {
      GetPlaceEPhoto();
    }
  }, [place]);

  // Mark the function as async to use 'await'
  const GetPlaceEPhoto = async () => {
    try {
      const data = {
        textQuery: place.placeName,
      };

      // Use 'await' for the API call
      const result = await getPlaceDetails(data);
      console.log(result.data.places[0].photos[3].name);

      const url = PHOTOS_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[3].name
      );
      setPhotoUrl(url); // Correctly set the photoUrl state
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all">
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"} // Corrected to 'photoUrl'
        alt={place.placeName || "Place"}
        className="w-[130px] h-[130px] rounded-xl object-cover"
      />

      <div>
        <h2 className="font-bold text-lg">{place.placeName || "N/A"}</h2>
        <p className="text-sm text-gray-500">{place.placeDetails}</p>
        <h2 className="mt-2">🕙 {place.timeTravel}</h2>
        <Link
          to={
            "https://www.google.com/maps/search/?api=1&query=" + place.placeName
          }
          target="_blank"
        >
          <Button size="sm">
            <FaMapLocationDot />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PlaceCardItem;
