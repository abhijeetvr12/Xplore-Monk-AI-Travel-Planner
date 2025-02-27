import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const [openDailog, setOpenDailog] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        window.location.reload();
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const handleGuestLogin = () => {
    const guestUser = {
      id: "guest_" + Math.random().toString(36).substr(2, 9), // Unique guest ID
      name: "Guest",
      email: "",
      picture: "/guest.png", // Default guest avatar (ensure this file exists)
      isGuest: true, // Flag to identify guest users
    };
    localStorage.setItem("user", JSON.stringify(guestUser));
    setOpenDailog(false);
    window.location.reload();
  };

  return (
    <div className="p-2 sm:p-3 shadow-sm flex justify-between items-center px-4 sm:px-5 bg-white">
      <a href="/">
        <img
          src="/Xplore.png"
          className="h-[50px] sm:h-[60px] rounded-full object-cover"
          alt="XploreMonk Logo"
        />
      </a>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {!isMobile && (
              <div className="flex items-center gap-2">
                <a href="/create-trip">
                  <Button
                    variant="outline"
                    className="rounded-full text-sm sm:text-base px-3 py-1 sm:px-4"
                  >
                    Create Trip
                  </Button>
                </a>
                <a href="/my-trips">
                  <Button
                    variant="outline"
                    className="rounded-full text-sm sm:text-base px-3 py-1 sm:px-4"
                  >
                    My Trips
                  </Button>
                </a>
              </div>
            )}
            <Popover>
              <PopoverTrigger className="rounded-full bg-transparent border-white">
                <img
                  src={user?.picture ? user?.picture : "/user.png"}
                  alt="User Profile"
                  className="h-[30px] sm:h-[35px] w-[30px] sm:w-[35px] rounded-full border-none"
                />
              </PopoverTrigger>
              <PopoverContent className="p-4 w-48">
                {isMobile && (
                  <>
                    <a
                      href="/create-trip"
                      className="block text-sm text-gray-700 hover:bg-gray-100 rounded-t p-2"
                    >
                      Create Trip
                    </a>
                    <a
                      href="/my-trips"
                      className="block text-sm text-gray-700 hover:bg-gray-100 p-2"
                    >
                      My Trips
                    </a>
                  </>
                )}
                <h2
                  className="block text-sm text-red-500 hover:bg-gray-100 rounded-b p-2 cursor-pointer"
                  onClick={() => {
                    if (!user.isGuest) {
                      googleLogout(); // Only call for Google users
                    }
                    localStorage.removeItem("user"); // Remove user data for both
                    window.location.reload();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button
            onClick={() => setOpenDailog(true)}
            className="text-sm sm:text-base px-3 py-1 sm:px-4"
          >
            Sign in
          </Button>
        )}
      </div>
      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/Xplore.png" alt="XploreMonk Logo" />
              <h2 className="font-bold text-lg mt-7 text-center">
                Sign In Options
              </h2>
              <p className="text-sm text-center">
                Choose how you want to proceed
              </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center justify-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
              <Button
                onClick={handleGuestLogin}
                variant="outline"
                className="w-full mt-3"
              >
                Continue as Guest
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;