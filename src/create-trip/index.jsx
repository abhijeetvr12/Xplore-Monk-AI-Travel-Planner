import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  AI_PROMPT,
  SelectBudgetOPtions,
  SelectTravelseList,
} from "@/constants/option";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { chatSession } from "@/service/AIModel";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (
      (formData?.days > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData.traveller
    ) {
      toast("Please fill in all details to create your trip!");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{days}", formData?.days)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{days}", formData?.days);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-32 xl:px-40 mt-10">
      <h1 className="font-extrabold text-4xl md:text-5xl text-orange-600 text-center">
        Welcome to XploreMonk
      </h1>
      <p className="mt-5 text-gray-700 text-lg md:text-xl text-center">
        Plan your dream adventure with AI-driven itineraries tailored to you. ✈️🌍✨
      </p>

      <div className="mt-16 space-y-12">
        {/* Destination */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            What’s your dream destination? 🌍
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.REACT_APP_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handelInputChange("location", v);
              },
            }}
          />
        </div>

        {/* Days */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            How many days do you plan to stay? 🕒
          </h2>
          <Input
            placeholder="E.g., 5"
            type="number"
            className="mt-2"
            onChange={(e) => handelInputChange("days", e.target.value)}
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            What’s your budget? 💰
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOPtions.map((item, index) => (
              <div
                key={index}
                onClick={() => handelInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg text-center hover:shadow-lg transition-all duration-200 ${
                  formData?.budget === item.title
                    ? "shadow-lg border-blue-600"
                    : "border-gray-300"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Who’s traveling with you? 👥
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {SelectTravelseList.map((item, index) => (
              <div
                key={index}
                onClick={() => handelInputChange("traveller", item.people)}
                className={`p-4 border cursor-pointer rounded-lg text-center hover:shadow-lg transition-all duration-200 ${
                  formData?.traveller === item.people
                    ? "shadow-lg border-blue-600"
                    : "border-gray-300"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Trip */}
      <div className="mt-12 flex justify-end">
        <Button
          className="px-6 py-3 text-lg font-semibold"
          disabled={loading}
          onClick={OnGenerateTrip}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
          ) : (
            "Generate My Trip"
          )}
        </Button>
      </div>

      {/* Sign-in Dialog */}
      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/Xplore.png" alt="XploreMonk" className="mx-auto" />
              <h2 className="font-bold text-lg mt-7 text-center">
                Sign In With Google
              </h2>
              <p className="text-center">
                Access personalized trip planning securely with Google.
              </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
