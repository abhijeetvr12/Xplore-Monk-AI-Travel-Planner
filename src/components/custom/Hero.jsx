import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative flex flex-col items-center mx-56 gap-9">
      <div className="relative z-10 flex flex-col items-center gap-9">
        <h1 className="font-extrabold text-[50px] text-center mt-16">
          <span className="text-[#f56551]">XploreMonk:</span> Your Gateway to Unforgettable Journeys
        </h1>
        <p className="text-xl text-gray-500 text-center">
          Unlock the magic of travel with AI-powered, tailor-made itineraries. 
          Let XploreMonk curate experiences that perfectly align with your passions, pace, and pocket.
        </p>
        <Link to={'/create-trip'}>
          <Button>Start Planning Now – It's Free!</Button>
        </Link>

        <img src='/laptop.png' alt="" className='-mt-20' />
      </div>
    </div>
  );
}

export default Hero;
