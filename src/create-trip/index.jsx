import React, { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '../service/firebaseConfig'
import { useNavigate, useNavigation } from 'react-router-dom';



function CreateTrip() {
  const [place, setPlace] = useState(null); // State for Google Places input
  const [formData, setFormData] = useState({}); // Initialize as object
  const [error, setError] = useState(''); // State for error messages

  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    const processedValue = name === 'daysStaying' ? parseInt(value, 10) || 0 : value;

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
    console.log(`${name}:`, processedValue);
  };

  useEffect(() => {
    console.log('Updated formData:', formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      console.log('Login Success:', tokenInfo);
      getUserProfile(tokenInfo); // Fetch user profile after login
    },
    onError: (error) => {
      console.error('Login Error:', error);
    },
    scope: 'openid email profile', // Ensure scopes are included
  });




  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDailog(true)
      return;
    }

    // Check if any of the required fields are missing or invalid
    if (
      !formData.location ||
      !formData.daysStaying ||
      formData.daysStaying > 5 ||
      !formData.budget ||
      !formData.travelWith
    ) {
      toast.error('Please fill all the details.');
      return;
    }

    setLoading(true);

    // All validations passed
    toast.success('Trip details successfully generated! Loading... Please wait a while');



    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label || 'your destination')
      .replace('{daysStaying}', formData?.daysStaying || 'a few')
      .replace('{travelWith}', formData?.travelWith || 'travelers')
      .replace('{budget}', formData?.budget || 'a flexible budget');


    const result = await chatSession.sendMessage(FINAL_PROMPT);


    console.log("--", result?.response?.text());
    setLoading(false);
    saveAiTrip(result?.response?.text());

  };

  const saveAiTrip = async (TripData) => {

    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docId

    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  }

  const getUserProfile = (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error('Access token is missing or invalid.');
      return;
    }

    axios
      .get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((resp) => {
        const userData = resp.data;
        console.log('User Profile:', userData);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        if (error.response) {
          console.error('API Error:', error.response.data);
        } else if (error.request) {
          console.error('No Response:', error.request);
        } else {
          console.error('Error Setting Up Request:', error.message);
        }
      });
  };




  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Plan Your Trip</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Discover destinations, activities, and build your perfect trip itinerary.
      </p>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <div className="mt-20 flex flex-col gap-10">
        {/* Google Places Autocomplete */}
        <div>
          <h2 className="text-xl my-3 font-medium">Where To?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              placeholder: 'Enter a location...',
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
            }}
            autocompletionRequest={{
              componentRestrictions: { country: 'PH' },
            }}
          />
        </div>

        {/* Number of Days Staying */}
        <div>
          <h2 className="text-xl my-3 font-medium">Number of Days Staying?</h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            min="0"
            className={`border ${error && formData.daysStaying > 5 ? 'border-red-500' : ''}`}
            onChange={(e) => handleInputChange('daysStaying', e.target.value)}
          />
        </div>

        {/* Budget Options */}
        <div>
          <h2 className="text-xl my-3 font-medium">Budget Estimate?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <button
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.budget === item.title ? 'border-orange-700' : ''
                  }`}
                onClick={() => handleInputChange('budget', item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.description}</h2>
              </button>
            ))}
          </div>
        </div>

        {/* Travel Companions */}
        <div>
          <h2 className="text-xl my-3 font-medium">Traveling with whom?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <button
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.travelWith === item.title ? 'border-orange-700' : ''
                  }`}
                onClick={() => handleInputChange('travelWith', item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.description}</h2>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
          }
        </Button>
      </div>

      <Dialog open={openDailog}>

        <DialogContent>
          <DialogHeader>

            <DialogDescription>
              <img src="../public/laaganorange.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign In to the Website with Google Authentication securely.</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center">

                <FcGoogle className='h-7 w-7' />Sign In with Google

              </Button>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  );
}

export default CreateTrip;
