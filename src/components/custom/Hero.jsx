import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center mx-4 sm:mx-16 md:mx-24 lg:mx-56 gap-6 sm:gap-8 md:gap-9">
      <h1 className="font-extrabold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] text-center mt-10 sm:mt-12 md:mt-16">
        <span className="text-[#f56551]">XploreMonk:</span> Your Gateway to Unforgettable Journeys
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 text-center px-2 sm:px-4 md:px-8">
        Unlock the magic of travel with AI-powered, tailor-made itineraries. 
        Let XploreMonk curate experiences that perfectly align with your passions, pace, and pocket.
      </p>
      <Link to={'/create-trip'}>
        <Button className="px-4 py-2 text-sm sm:text-base md:text-lg">Start Planning Now – It's Free!</Button>
      </Link>
      <img
        src="/laptop.png"
        alt="Laptop"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg -mt-4 sm:-mt-6 md:-mt-8"
      />
    </div>
  );
}

export default Hero;
