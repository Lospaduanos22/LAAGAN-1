import React, { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { Button } from '@/components/ui/button';

function CreateTrip() {
  const [place, setPlace] = useState(null); // State for Google Places input
  const [formData, setFormData] = useState({}); // Initialize as object
  const [error, setError] = useState(''); // State for error messages

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

  const OnGenerateTrip = () => {
    if (!formData.location) {
      setError('Please select a location.');
      return;
    }

    if (formData.daysStaying && formData.daysStaying > 5) {
      setError('Please enter trip days less than or equal to 5.');
      return;
    }

    if (!formData.budget) {
      setError('Please select a budget option.');
      return;
    }

    if (!formData.travelWith) {
      setError('Please select your travel companions.');
      return;
    }

    setError('');
    console.log(formData);
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
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData.budget === item.title ? 'border-orange-500' : ''
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
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData.travelWith === item.title ? 'border-orange-500' : ''
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
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
