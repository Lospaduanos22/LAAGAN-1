import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';


function viewTrip() {

    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(()=>{
        tripId && GetTripData();
    }, [tripId])


    //USED TO GET TRIP INFORMATION FROM FIREBASE
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document:", docSnap.data());
            const tripData = docSnap.data();

            const parsedTripData = tripData.tripData
            ? JSON.parse(tripData.tripData)
            : {};

            setTrip({
                ...tripData,
                tripData: parsedTripData,
            });
        }
        else {
            console.log("No such document");
            toast('No trip found!')
        }
    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/*Information Section */}
            <InfoSection trip={trip}/>

            {/*Recommended Hotels*/}
            <Hotels trip={trip}/>

            {/*Daily Plan */}
            <PlacesToVisit trip={trip} />

            {/*Footer*/}
            <Footer trip={trip}/>

             

        </div>
    )
}

export default viewTrip