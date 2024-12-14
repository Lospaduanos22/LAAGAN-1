export const SelectTravelList = [
    {
        id: 1,
        title: 'Just Me',
        description: 'Perfect for solo adventurers seeking independence and exploration. (1 Person)',
        icon: '🌍',
        people: '1 Person'
    },

    {
        id: 2,
        title: 'A Couple',
        description: 'A romantic getaway for two, ideal for bonding and shared experiences. (2 People)',
        icon: '💑',
        people: '2 People'
    },

    {
        id: 3,
        title: 'Family',
        description: 'Fun-filled adventures for the whole family, with activities for everyone. (3-4 People)',
        icon: '👨‍👩‍👧‍👦',
        people: '3-4 People'
    },

    {
        id: 4,
        title: 'Friends',
        description: 'For groups of friends looking to make unforgettable memories together. (5-10 People)',
        icon: '👯‍♂️',
        people: '5-10 People'
    },
];


export const SelectBudgetOptions=[
    {
        id:1,
        title: 'Budget',
        description: 'Low Cost (₱1,000 - ₱3,500/Day)',
        icon: '💸',
    },

    {
        id:2,
        title: 'Moderate',
        description: 'Mid-Range (₱3,500 - ₱8,500/Day)',
        icon: '💵',
    },

    {
        id:3,
        title: 'Luxury',
        description: 'High End (₱9,000+/Day)',
        icon: '💎',
    }
]


export const AI_PROMPT = `
Generate a Travel Plan for the selected location: {location}, staying for {daysStaying} days, traveling with {travelWith}, and a {budget} budget in local currency.
Provide the following details in JSON format:
1. Hotel Options:
   - Hotel Name
   - Address
   - Price
   - Image URL
   - Geo-coordinates
   - Rating
   - Descriptions
2. Day-wise Itinerary:
   - For each day, provide activities for morning, afternoon, and evening.
   - For each activity:
     - Place Name {placeName}
     - Place Details {placeDetails}
     - Place Image URL {placeImageUrl}
     - Geo-coordinates {geoCoords}
     - Ticket Pricing {ticketPrice}
     - Rating {rating}
     - Time Travel Details {timeTravel)
     - Best Time to Visit (with specific time ex: 2:00 PM) {bestTime}
3. Ensure the recommendations align with the budget constraints and provide a seamless travel experience.

* Provide at least eight hotel options.
* Prioritize activities within the specified budget, including transportation costs.


Make the tripData structure  follow this format to avoid issues in the code:

"{ "tripDetails": { "location": "Cebu, Philippines", "duration": "3 Days", "travelers": "1 Person", "budget": "Budget (Philippine Pesos)" }, "hotelOptions": [ { "hotelName": "RedDoorz Plus @ Cebu IT Park", "address": "Cebu IT Park, Cebu City", "price": "₱800-₱1200", "imageUrl": "https://example.com/hotel1.jpg", "geoCoordinates": { "latitude": 10.3157, "longitude": 123.8854 }, "rating": 4.0, "description": "Simple, clean rooms near IT Park." }, { "hotelName": "Pensionne", "address": "Gorordo Ave, Cebu City", "price": "₱700-₱1000", "imageUrl": "https://example.com/hotel2.jpg", "geoCoordinates": { "latitude": 10.3218, "longitude": 123.8956 }, "rating": 3.8, "description": "Budget-friendly guesthouse in a central location." }, { "hotelName": "Casa Verde", "address": "Escario St, Cebu City", "price": "₱900-₱1500", "imageUrl": "https://example.com/hotel3.jpg", "geoCoordinates": { "latitude": 10.3191, "longitude": 123.8897 }, "rating": 4.2, "description": "Clean and comfortable rooms, good value." }, { "hotelName": "Z Hostel Cebu", "address": "Colon St, Cebu City", "price": "₱500-₱800", "imageUrl": "https://example.com/hotel4.jpg", "geoCoordinates": { "latitude": 10.3162, "longitude": 123.8835 }, "rating": 4.0, "description": "Affordable hostel with dorm and private rooms." }, { "hotelName": "Abreeza Place Cebu", "address": "F. Cabahug St, Cebu City", "price": "₱1000-₱1800", "imageUrl": "https://example.com/hotel5.jpg", "geoCoordinates": { "latitude": 10.3092, "longitude": 123.8990 }, "rating": 4.5, "description": "Modern hotel with good amenities, slightly higher price point." }, { "hotelName": "Bai Hotel Cebu", "address": "Gen. Maxilom Ave, Cebu City", "price": "₱1500-₱2500", "imageUrl": "https://example.com/hotel6.jpg", "geoCoordinates": { "latitude": 10.3108, "longitude": 123.8881 }, "rating": 4.3, "description": "Mid-range hotel with a pool and other facilities." }, { "hotelName": "Quest Hotel and Conference Center Cebu", "address": "General Maxilom Ave, Cebu City", "price": "₱2000-₱3500", "imageUrl": "https://example.com/hotel7.jpg", "geoCoordinates": { "latitude": 10.3093, "longitude": 123.8886 }, "rating": 4.2, "description": "Business hotel with convenient location." }, { "hotelName": "Waterfront Airport Hotel and Casino", "address": "Mactan-Cebu International Airport, Lapu-Lapu City", "price": "₱2500-₱4500", "imageUrl": "https://example.com/hotel8.jpg", "geoCoordinates": { "latitude": 10.3101, "longitude": 123.9668 }, "rating": 4.4, "description": "Airport hotel with casino, pricier option." } ], "itinerary": { "day1": { "morning": { "placeName": "Magellan's Cross", "placeDetails": "Historical landmark.", "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Magellan%27s_Cross.jpg/800px-Magellan%27s_Cross.jpg", "geoCoords": { "latitude": 10.29179, "longitude": 123.9033 }, "ticketPrice": "Free", "rating": 4.5, "timeTravel": "15 minutes by taxi", "bestTime": "Morning for less crowds (10:00 AM - 11:00 AM)" }, "afternoon": { "placeName": "Fort San Pedro", "placeDetails": "Historic fort.", "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Fort_San_Pedro_Cebu.jpg/800px-Fort_San_Pedro_Cebu.jpg", "geoCoords": { "latitude": 10.29112, "longitude": 123.90416 }, "ticketPrice": "₱30", "rating": 4.2, "timeTravel": "10 minutes walk from Magellan's Cross", "bestTime": "Afternoon for pleasant weather (2:00 - 4:00 pm)" }, "evening": { "placeName": "Carbon Public Market (for street food)", "placeDetails": "Local market with food stalls.", "placeImageUrl": "https://example.com/carbonMarket.jpg", "geoCoords": { "latitude": 10.29626, "longitude": 123.89347 }, "ticketPrice": "Free", "rating": 4.0, "timeTravel": "15 minutes by taxi", "bestTime": "Evening for a lively atmosphere (6:00 - 8:00 PM)" } }, "day2": { "morning": { "placeName": "Basilica del Santo Niño", "placeDetails": "Important Catholic church.", "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Basílica_Minore_del_Santo_Niño_%28Cebu%29.jpg/800px-Basílica_Minore_del_Santo_Niño_%28Cebu%29.jpg", "geoCoords": { "latitude": 10.29266, "longitude": 123.90237 }, "ticketPrice": "Free", "rating": 4.6, "timeTravel": "10 minutes by taxi", "bestTime": "Morning for a quieter visit (7:00 AM)" }, "afternoon": { "placeName": "Yap-Sandiego Ancestral House", "placeDetails": "Historic ancestral home.", "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Yap_Sandiego_ancestral_house_in_Cebu.jpg/800px-Yap_Sandiego_ancestral_house_in_Cebu.jpg", "geoCoords": { "latitude": 10.29343, "longitude": 123.90062 }, "ticketPrice": "₱150", "rating": 4.3, "timeTravel": "5 minutes walk from Basilica", "bestTime": "Afternoon to avoid midday heat (2:00 PM)" }, "evening": { "placeName": "Ayala Center Cebu (for dinner)", "placeDetails": "Mall with various dining options.", "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ayala_Center_Cebu.jpg/800px-Ayala_Center_Cebu.jpg", "geoCoords": { "latitude": 10.31901, "longitude": 123.9015 }, "ticketPrice": "Depends on dinner choice", "rating": 4.5, "timeTravel": "20 minutes by taxi", "bestTime": "Evening for a relaxed dinner (7:00 PM)" } }, "day3": { "morning": { "placeName": "Temple of Leah", "placeDetails": "Roman-inspired temple with city views.", "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Temple_of_Leah_Cebu_City.jpg/800px-Temple_of_Leah_Cebu_City.jpg", "geoCoords": { "latitude": 10.36111, "longitude": 123.87114 }, "ticketPrice": "₱100", "rating": 4.4, "timeTravel": "30 minutes by taxi", "bestTime": "Morning for clear views (7:00 AM)" }, "afternoon": { "placeName": "Sirao Flower Garden", "placeDetails": "Flower garden.", "placeImageUrl": "https://example.com/siraoGarden.jpg", "geoCoords": { "latitude": 10.36787, "longitude": 123.85087 }, "ticketPrice": "₱50", "rating": 4.0, "timeTravel": "20 minutes taxi from Temple of Leah", "bestTime": "Afternoon for good light (1:00 PM)" }, "evening": { "placeName": "Dinner at a local restaurant", "placeDetails": "Explore local restaurants near your hotel.", "placeImageUrl": "https://example.com/localRestaurant.jpg", "geoCoords": { "latitude": 0, "longitude": 0 }, "ticketPrice": "Variable", "rating": 0, "timeTravel": "Variable", "bestTime": "Evening (6:00 PM)" } } } }"
(string)


`;

