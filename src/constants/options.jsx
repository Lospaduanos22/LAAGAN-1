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
   - Place Name
   - Place Details
   - Place Image URL
   - Geo-coordinates
   - Ticket Pricing
   - Rating
   - Time Travel Details
   - Best Time to Visit
3. Ensure the recommendations align with the budget constraints and provide a seamless travel experience.`;
