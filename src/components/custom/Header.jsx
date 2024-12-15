import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // Correctly named here

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log(parsedUser); // Logs the user object if it exists
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      console.log("Login Success:", tokenInfo);
      getUserProfile(tokenInfo); // Fetch user profile after login
    },
    onError: (error) => {
      console.error("Login Error:", error);
    },
    scope: "openid email profile", // Ensure scopes are included
  });

  const getUserProfile = (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error("Access token is missing or invalid.");
      return;
    }

    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        const userData = resp.data;
        console.log("User Profile:", userData);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload(); // Reload the page to update user state
      })
      .catch((error) => {
        if (error.response) {
          console.error("API Error:", error.response.data);
        } else if (error.request) {
          console.error("No Response:", error.request);
        } else {
          console.error("Error Setting Up Request:", error.message);
        }
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center">
      <img src="/laaganorange.svg" alt="Logo" className="header-logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href='/create-trip'>
            <Button variant="outline" className="rounded-full">
              + Create Trip
            </Button>
            </a>
            <a href='/my-trips'>
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className="h-10 w-10 rounded-full" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}
                >Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Get Started</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="../public/laaganorange.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign In to the Website with Google Authentication securely.</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
