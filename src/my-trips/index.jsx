import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import UserCardItem from './components/UserCardItem';

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigation('/');
      return;
    }
    setUserTrips([]);
    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshort = await getDocs(q);
    querySnapshort.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      setUserTrips((prevValue) => [...prevValue, doc.data()]);
    });
  };

  return (
    <div className="sm:p-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl text-gray-800">My Trips</h2>
      <p className="text-gray-500 mt-2 text-sm">
        Explore your planned adventures and revisit your favorite memories.
      </p>
      <div className="grid grid-cols-2 gap-5 mt-10 md:grid-cols-3">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => <UserCardItem key={index} trip={trip} />)
          : Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
                ></div>
              ))}
      </div>
    </div>
  );
}

export default MyTrips;
