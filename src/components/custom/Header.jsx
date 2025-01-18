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
  });
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
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
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
       <a href="/">
      <img src="/Xplore.png" className="h-[85px] w-full rounded-full object-cover " />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-3 ">
          <a href="/create-trip">
            <Button variant="outline" className="rounded-full">
              + Create Trip
            </Button>
            </a>
          <a href="/my-trips">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
            </a>
            <Popover >
              <PopoverTrigger className=" rounded-full bg-transparent " ><img
              src={user?.picture}
              alt=""
              className="h-[35px] w-[35px] rounded-full "
            /></PopoverTrigger>
              <PopoverContent>
                <h2 className=" cursor-pointer " onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                  window.location.href = "/";
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={()=>setOpenDailog(true)}>Sign in</Button>
        )}
      </div>
      <Dialog open={openDailog}  onOpenChange={setOpenDailog}>
          <DialogContent>
            <DialogHeader>
            
              <DialogDescription>
                <img src="/Xplore.png" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the App with Google authentication securely</p>
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

export default Header;
