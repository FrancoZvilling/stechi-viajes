import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export const useTrips = () => {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'trips'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const tripsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Map Firebase image URLs to the 'image' prop expected by our UI components
                const mappedTrips = tripsData.map(trip => ({
                    ...trip,
                    image: trip.imageUrl
                }));
                setTrips(mappedTrips);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching trips:", err);
                setError(err);
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return { trips, isLoading, error };
};
