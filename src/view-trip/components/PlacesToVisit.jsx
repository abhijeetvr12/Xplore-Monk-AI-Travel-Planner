import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
    const itineraryEntries = trip?.tripData?.itinerary
        ? Object.entries(trip.tripData.itinerary).sort(
            ([dayA], [dayB]) =>
                parseInt(dayA.replace("day", ""), 10) - parseInt(dayB.replace("day", ""), 10)
        )
        : [];

    return (
        <div className='mt-10'>
            <h2 className="font-bold text-2xl text-blue-600">Explore Places to Visit</h2>
            <div className='mt-5'>
                {itineraryEntries.length > 0 ? (
                    itineraryEntries.map(([day, details], index) => (
                        <div key={index} className="mt-8 bg-white shadow-lg rounded-lg p-5">
                            <h3 className="font-semibold text-xl text-gray-800">Day {day.replace("day", "")} - {details.theme}</h3>
                            <p className="text-sm text-gray-600">Best time to visit: {details.bestTimeToVisit}</p>
                            <div className="grid gap-4 mt-5 md:grid-cols-2">
                                {details.activities?.map((activity, idx) => (
                                    <div key={idx} className="">
                                        <h4 className="font-medium text-md text-orange-500">
                                            {activity.time}
                                        </h4>
                                        <PlaceCardItem place={activity} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No itinerary available. Start planning your trip today!</p>
                )}
            </div>
        </div>
    );
}

export default PlacesToVisit;