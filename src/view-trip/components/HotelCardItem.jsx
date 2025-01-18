import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {
    const [PhotoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        };
        await GetPlaceDetails(data).then(resp => {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0]?.photos[3]?.name || "");
            setPhotoUrl(PhotoUrl);
        });
    };

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`}
            target="_blank"
        >
            <div className="hover:scale-105 transition-transform cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={PhotoUrl || '/default-placeholder.png'} className="h-[200px] w-full object-cover" alt="" />
                <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800">{hotel?.hotelName}</h3>
                    <p className="text-sm text-gray-500">📍 {hotel?.hotelAddress}</p>
                    <p className="text-sm text-gray-700 mt-2">💰 {hotel?.price}</p>
                    <p className="text-sm text-yellow-500">⭐ {hotel?.rating}</p>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;