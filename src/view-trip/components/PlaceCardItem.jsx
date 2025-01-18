import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    const [PhotoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        place && GetPlacePhoto();
    }, [place]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place.placeName
        };
        await GetPlaceDetails(data).then(resp => {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0]?.photos[3]?.name || "");
            setPhotoUrl(PhotoUrl);
        });
    };

    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`} target='_blank'>
            <div className='border flex gap-4 rounded-xl p-4 hover:scale-105 transition-transform hover:shadow-lg bg-white'>
                <img src={PhotoUrl || '/default-placeholder.png'} alt="" className='w-[100px] h-[100px] rounded-lg object-cover' />
                <div>
                    <h3 className='font-bold text-lg text-gray-800'>{place.placeName}</h3>
                    <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                    <p className='text-sm text-gray-700 mt-2'>🕒 {place.travelTime}</p>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItem;