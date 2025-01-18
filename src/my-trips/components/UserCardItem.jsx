import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserCardItem({ trip }) {
  const [PhotoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);
      const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(photoUrl);
    });
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="hover:scale-105 transition-all rounded-lg shadow-md bg-white overflow-hidden">
        <img
          src={PhotoUrl ? PhotoUrl : '/wallpaper-910.jpg'}
          className="object-cover rounded-t-lg h-[220px] w-full"
          alt={trip?.userSelection?.location?.label || 'Trip Image'}
        />
        <div className="p-4">
          <h2 className="font-bold text-lg text-gray-800">
            {trip?.userSelection?.location?.label}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {trip?.userSelection.days} Days trip with a budget of{' '}
            <span className="text-gray-800 font-medium">${trip?.userSelection?.budget}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserCardItem;
