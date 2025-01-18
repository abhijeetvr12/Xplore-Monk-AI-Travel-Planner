import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

//const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyBiTKAfxeeuG4gGIomh4faIvpTEGhl5m1M'

function InfoSection({trip}) {
  const [PhotoUrl,setPhotoUrl] = useState();
 
  useEffect(()=>{
     trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto= async()=>{
    
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <div>
        <img src={PhotoUrl?PhotoUrl:'/wallpaper-910.jpg'} alt="" className='h-[340px] w-full object-cover rounded-xl'/> 
        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='text-2xl font-bold'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                📅 {trip.userSelection?.days} Day
                </h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                💰 {trip.userSelection?.budget} Budget
                </h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                🥂 No. Of Traveler:  {trip.userSelection?.traveller} 
                </h2>
            </div>
        </div>
        <Button><IoIosSend /></Button>
        </div>
    
    </div>
  )
}

export default InfoSection