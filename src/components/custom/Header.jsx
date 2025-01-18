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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

import axios from "axios";

function Header() {
  const [openDailog, setOpenDailog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    console.log(user);
  }, [user]);

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

  return (
    <div className="p-2 sm:p-3 shadow-sm flex justify-between items-center px-4 sm:px-5 bg-white">
      <a href="/">
        <img
          src="/Xplore.png"
          className="h-[60px] sm:h-[75px] rounded-full object-cover"
          alt="XploreMonk Logo"
        />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-sm sm:text-base px-3 py-1 sm:px-4">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-sm sm:text-base px-3 py-1 sm:px-4">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger className="rounded-full bg-transparent">
                <img
                  src={user?.picture?user?.picture:'/user.png'}
                  alt="User Profile"
                  className="h-[30px] sm:h-[35px] w-[30px] sm:w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
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
              <h2 className="font-bold text-lg mt-7 text-center">Sign In With Google</h2>
              <p className="text-sm text-center">Sign in to the app securely with Google authentication</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center justify-center"
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

export default Header;
