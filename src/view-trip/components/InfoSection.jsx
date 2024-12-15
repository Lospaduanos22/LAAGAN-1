import { Button } from "@/components/ui/button";
import { getPlaceDetails } from "@/service/GlobalApi";
import { useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";

const PHOTOS_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
function InfoSection({ trip }) {
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
    <div>
      <img
        src={photoUrl}
        className="h-[340px] w-full object-cover rounded-xl"
        alt="Placeholder"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-sm md:text-md">
              📅 {trip?.userSelection?.daysStaying} Day Trip
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-sm md:text-md">
              💵 {trip?.userSelection?.budget} Plan
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-sm md:text-md">
              🧍 No. of Travelers: {trip?.userSelection?.travelWith}
            </h2>
          </div>
        </div>

        <Button>
          <IoMdSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
