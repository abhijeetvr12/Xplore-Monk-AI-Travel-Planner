import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  //console.log(trip);

  // Convert itinerary object to an array of entries and sort by day number
  const itineraryEntries = trip?.tripData?.itinerary
    ? Object.entries(trip.tripData.itinerary).sort(
        ([dayA], [dayB]) =>
          parseInt(dayA.replace("day", ""), 10) - parseInt(dayB.replace("day", ""), 10)
      )
    : [];

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {itineraryEntries.length > 0 ? (
          itineraryEntries.map(([day, details], index) => (
            <div key={index} className="mt-5" >
              <h2 className="font-medium text-lg">Day: {day}</h2>
              <h3 className="font-medium text-md">{details.theme}</h3>
              <p>Best time to visit: {details.bestTimeToVisit}</p>
              <div className="grid md:grid-cols-2 gap-5">
              {details.activities?.map((activity, idx) => (
                <div key={idx} className="">
                  <h2 className="font-medium text-sm text-orange-600">
                    {activity.time} {/* Example: 9AM - 12AM */}
                  </h2>
                  <PlaceCardItem place={activity} />
                </div>
              ))}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary available.</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
