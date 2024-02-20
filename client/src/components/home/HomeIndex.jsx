import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                console.log(places)
            } catch (error) {
                console.log('Not able to fetch places:', error);
            }
        };

        fetchAllLocationPhotos();
    }, []);

    return (
        <div className='flex flex-wrap justify-center m-2 mt-16 gap-5'>
        {places.map(place => (
            <Link to={'/place/'+place._id} key={place._id} className='flex flex-col border w-64'>
                <img className='w-full rounded-lg object-cover' key={place._id} src={place.photos[0]} alt="Location Photo" />
                <div className='p-4'>
                    <h2 className='font-mono font-light'>{place.title}</h2>
                    <h2 className='font-extralight text-sm'>{place.address}</h2>
                    <h5>${place.price}</h5>
                </div>
            </Link>
        ))}
    </div>
    
    );
};

export default Index;
