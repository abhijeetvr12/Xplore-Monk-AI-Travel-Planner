import { GoogleGenerativeAI } from "@google/generative-ai";
//import * as dotenv from '../../.env.local';
//dotenv.config(); 

  
   const apiKey = "AIzaSyCQJk3HZxdrOHkIHUdeTAG6ypb8TKu8v98";

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time  travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"location\": \"Las Vegas\",\n  \"duration\": \"3 Days\",\n  \"budget\": \"Cheap\",\n  \"travelers\": \"Couple\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$40-$80 per night\",\n      \"hotelImageUrl\": \"https://example.com/circus_circus_hotel.jpg\",\n       \"geoCoordinates\": {\n        \"latitude\": 36.1261,\n        \"longitude\": -115.1671\n      },\n      \"rating\": 3.5,\n      \"description\": \"A classic Las Vegas hotel with a circus theme, offering budget-friendly accommodations and family-friendly attractions. Has the Adventuredome indoor theme park.\"\n    },\n    {\n      \"hotelName\": \"Strat Hotel, Casino & Skypod\",\n      \"hotelAddress\": \"2000 S Las Vegas Blvd, Las Vegas, NV 89104\",\n      \"price\": \"$50-$90 per night\",\n      \"hotelImageUrl\": \"https://example.com/strat_hotel.jpg\",\n       \"geoCoordinates\": {\n        \"latitude\": 36.1467,\n        \"longitude\": -115.1557\n      },\n      \"rating\": 3.8,\n       \"description\": \"Features the iconic Stratosphere tower with thrilling rides, plus affordable rooms and dining options.\"\n    },\n        {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$60-$100 per night\",\n      \"hotelImageUrl\": \"https://example.com/excalibur_hotel.jpg\",\n       \"geoCoordinates\": {\n        \"latitude\": 36.0984,\n        \"longitude\": -115.1740\n      },\n       \"rating\": 3.9,\n        \"description\": \"A medieval-themed hotel on the Strip, offers affordable rooms and family-friendly attractions. Features a wide array of dining options.\"\n    }\n  ],\n    \"itinerary\": {\n    \"day1\": {\n      \"theme\": \"Exploring the Strip and Free Attractions\",\n       \"bestTimeToVisit\": \"Late afternoon/Evening for the atmosphere and lights\",\n      \"activities\": [\n          {\n          \"placeName\": \"Welcome to Fabulous Las Vegas Sign\",\n          \"placeDetails\": \"An iconic photo opportunity at the entrance to the Las Vegas Strip. Best to go during sunset for golden hour photos.\",\n          \"placeImageUrl\": \"https://example.com/las_vegas_sign.jpg\",\n           \"geoCoordinates\": {\n            \"latitude\": 36.0827,\n             \"longitude\": -115.1726\n          },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"15 mins drive from strip\",\n           \"time\":\"1 hr\"\n        },\n          {\n             \"placeName\": \"Bellagio Conservatory & Botanical Gardens\",\n            \"placeDetails\": \"Beautifully themed floral displays change seasonally. A wonderful free attraction inside the Bellagio hotel.\",\n             \"placeImageUrl\":\"https://example.com/bellagio_gardens.jpg\",\n             \"geoCoordinates\": {\n               \"latitude\": 36.1128,\n               \"longitude\": -115.1741\n           },\n          \"ticketPricing\": \"Free\",\n            \"travelTime\": \"10 mins drive from Las Vegas Sign\",\n             \"time\": \"2 hrs\"\n         },\n        {\n          \"placeName\": \"Fountains of Bellagio\",\n          \"placeDetails\": \"A spectacular water show with music and lights in front of the Bellagio Hotel. Shows happen every 30 minutes in the afternoon and every 15 minutes in the evening.\",\n          \"placeImageUrl\": \"https://example.com/bellagio_fountains.jpg\",\n           \"geoCoordinates\": {\n            \"latitude\": 36.1128,\n             \"longitude\": -115.1741\n          },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"next to bellagio conservatory\",\n             \"time\": \"1 hr\"\n        },\n        {\n          \"placeName\": \"The LINQ Promenade\",\n          \"placeDetails\": \"An outdoor shopping, dining, and entertainment area.  Enjoy the lively atmosphere and street performers.\",\n          \"placeImageUrl\": \"https://example.com/linq_promenade.jpg\",\n           \"geoCoordinates\": {\n            \"latitude\": 36.1165,\n             \"longitude\": -115.1702\n          },\n          \"ticketPricing\": \"Free (costs for dining and some attractions)\",\n          \"travelTime\": \"5 mins walk from Bellagio\",\n           \"time\":\"2 hrs\"\n\n        }\n      ]\n    },\n    \"day2\": {\n      \"theme\": \"Downtown Las Vegas and Cheap Thrills\",\n        \"bestTimeToVisit\": \"Afternoon for browsing, evening for Fremont Street Experience\",\n      \"activities\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A pedestrian mall in downtown Las Vegas with a massive video screen canopy.  Enjoy the Viva Vision light show and street performers.\",\n          \"placeImageUrl\": \"https://example.com/fremont_street.jpg\",\n           \"geoCoordinates\": {\n            \"latitude\": 36.1701,\n             \"longitude\": -115.1401\n          },\n          \"ticketPricing\": \"Free (costs for some attractions)\",\n          \"travelTime\": \"15-20 minutes drive from the strip\",\n          \"time\":\"3 hrs\"\n        },\n         {\n          \"placeName\": \"Container Park\",\n         \"placeDetails\": \"An open-air shopping and entertainment area built from shipping containers. Unique shops, dining, and play areas.\",\n          \"placeImageUrl\": \"https://example.com/container_park.jpg\",\n           \"geoCoordinates\": {\n            \"latitude\": 36.1691,\n             \"longitude\": -115.1366\n          },\n          \"ticketPricing\": \"Free (costs for purchases and some attractions)\",\n           \"travelTime\":\"5 mins walk from Fremont Street\",\n             \"time\":\"2 hrs\"\n\n        },\n           {\n             \"placeName\":\"Pawn Stars Shop\",\n             \"placeDetails\": \"See the famous Gold & Silver Pawn Shop from the reality show Pawn Stars.\",\n             \"placeImageUrl\": \"https://example.com/pawn_stars.jpg\",\n              \"geoCoordinates\": {\n                \"latitude\": 36.1570,\n                \"longitude\": -115.1473\n           },\n          \"ticketPricing\":\"Free to visit, costs for purchases\",\n           \"travelTime\": \"5 min drive from Container Park\",\n           \"time\":\"2 hrs\"\n\n          }\n        ]\n    },\n    \"day3\": {\n      \"theme\": \"Affordable Entertainment and Departure\",\n      \"bestTimeToVisit\":\"Morning/Afternoon before departure\",\n      \"activities\": [\n        {\n          \"placeName\": \"M&M's World Las Vegas\",\n          \"placeDetails\": \"A colorful and fun multi-story store dedicated to M&M's candies. Lots of photo opportunities and unique merchandise.\",\n         \"placeImageUrl\": \"https://example.com/mms_world.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1073,\n             \"longitude\": -115.1721\n          },\n          \"ticketPricing\": \"Free (costs for purchases)\",\n            \"travelTime\":\"15 mins drive from Fremont Street\",\n            \"time\":\"2 hrs\"\n        },\n           {\n            \"placeName\":\"The Venetian Canal Shops & Streetmosphere\",\n           \"placeDetails\":\"Experience Venice in Las Vegas! Explore the indoor canals, shops, and street performers.\",\n            \"placeImageUrl\":\"https://example.com/venetian_canals.jpg\",\n            \"geoCoordinates\": {\n                \"latitude\": 36.1200,\n                 \"longitude\": -115.1697\n            },\n             \"ticketPricing\":\"Free to walk around (costs for Gondola ride)\",\n              \"travelTime\":\"5 mins drive from M&M\",\n                \"time\":\"2 hrs\"\n        },\n         {\n          \"placeName\": \"High Roller Observation Wheel (Optional)\",\n          \"placeDetails\": \"Consider a ride on the High Roller for amazing views of Las Vegas.\",\n          \"placeImageUrl\": \"https://example.com/high_roller.jpg\",\n           \"geoCoordinates\": {\n            \"latitude\": 36.1168,\n             \"longitude\": -115.1698\n           },\n            \"ticketPricing\": \"$25-$35 per person (Optional, consider if budget allows)\",\n            \"travelTime\": \"next to Venetian\",\n            \"time\":\"1 hr\"\n        }\n\n      ]\n    }\n  }\n}\n```"},
          ],
        },
      ],
    });
  

 
  
  