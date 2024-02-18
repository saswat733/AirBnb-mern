import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchAllLocationPhotos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/users/all-location-photos');
                // Extract places from the response data
                const placesData = response.data.data;

                // Update state with the fetched places
                setPlaces(placesData);
            } catch (error) {
                console.log('Not able to fetch places:', error);
            }
        };

        fetchAllLocationPhotos();
    }, []);

    return (
        <div className='grid grid-cols-3 m-6 mt-16 gap-5'>
            {places.map(place => (
                <div key={place._id} className=''>
                    <img className='w-full rounded-lg ' key={''} src={place.photos[0]} alt="Location Photo" />
                    <h2 className='font-mono font-light'>{place.title}</h2>
                    <h2 className='font-extralight text-sm '>{place.address}</h2>
                    
                </div>
            ))}
        </div>
    );
};

export default Index;
