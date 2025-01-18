import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl text-blue-600'>Hotel Recommendations</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={hotel} />
                ))}
            </div>
        </div>
    );
}

export default Hotels;