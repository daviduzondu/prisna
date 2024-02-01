"use client";
import { useContext } from "react";
import { AuthContext } from "@/lib/context/AuthContext";
import { updateDetails } from "@/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { toast } from "sonner";
import ProfileTabs from "./tabs";
import { PlusCircleIcon, EyeIcon, FerrisWheel, Star, Phone, MapPin } from "lucide-react";
import Link from "next/link";

function handleFileChange(e) {
  const fileInput = e.target;
  const file = fileInput.files[0];
  // console.log(e)
  // Check if a file is selected
  if (file) {
    // Check if the file size is less than 200KB
    if (file.size <= 300 * 1024) {
      // 200KB in bytes
      // File is valid, you can proceed with processing it
      fileInput.parentElement.children[2].classList.add("hidden");
      console.log("File is valid:", file);
    } else {
      // File size is too large
      fileInput.parentElement.children[2].classList.remove("hidden");
      fileInput.parentElement.children[2].classList.add("text-red-500");
      // alert('File size must be less than 300KB.');
      // Clear the file input (optional)
      fileInput.value = "";
    }
  }
}

export default function Profile({ userDetails, user }) {
  // console.log(userDetails)
  const [signOut, loading, error] = useSignOut(auth);
  const updateUserDetails = updateDetails.bind(null, userDetails);

  if (!userDetails.data) {
    throw new Error("Something Went Wrong!");
  }
  return (
    <section className="w-[100%]">
      {userDetails.data && (
        <div className="flex items-center">
          <div className="flex-1 flex items-center">
            <img src={userDetails.data?.pic} className="rounded-[100%] mr-2" width={70} height={70} />
            <div className="text-base lg:text-2xl font-bold ">
              {user && "Welcome back,"} {userDetails.data.name}
            </div>
          </div>
          <div className="flex gap-5 items-center ">
            <span className="flex items-center gap-1">
              <MapPin className="icon" />
              {userDetails.data.location || ""}
            </span>
            {user && (
              <Button
                variant="destructive"
                onClick={async () => {
                  console.log("Signing out...");
                  const success = await signOut();
                  if (success) {
                    toast.info("You have signed out");
                  } else {
                    console.log(error);
                  }
                }}
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
      {userDetails.data && Object.entries(userDetails.data).length === 2 && (
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogTitle>Complete setting up your account</AlertDialogTitle>
            <Alert className="bg-red-500 text-white">
              <AlertCircle className="icon mr-2" color="white" />
              <AlertTitle>Hold up!</AlertTitle>
              <AlertDescription>
                You have not completed your account set-up. Your account will not be visible to the public until this is
                done.
              </AlertDescription>
            </Alert>
            <form className="flex flex-col gap-5" action={updateUserDetails}>
              <div className="flex flex-col gap-3">
                <Label htmlFor="profile-pic">Profile Picture</Label>100vw
                <Input
                  placeholder="Add a profile picture"
                  name="profile-pic"
                  type="file"
                  accept="image/png, image/jpeg"
                  required
                  onChange={handleFileChange}
                />
                <span className="italic -mt-2 text-sm w-[100%] hidden">
                  The image should be a jpeg not more than 300 kilobytes in size
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="name">Name</Label>
                <Input placeholder="What is your name?" name="name" required />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="location">Location</Label>
                <Input placeholder="Select your location" name="location" required />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="phone">Phone Number</Label>
                <Input placeholder="Enter your phone number" name="phone" type="number" required />
              </div>
              <Button type="submit">Update details</Button>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {userDetails.data && (
        <>
          <Dashboard userDetails={userDetails} user={user} />
          <ProfileTabs user={user} />
        </>
      )}
    </section>
  );
}

function Dashboard({ userDetails, user }) {
  return (
    <div className="flex lg:flex-row flex-col-reverse w-full gap-2 my-7 items-center lg:static">
      <div className="flex-1 w-full action-btns flex gap-3 sticky top-10">
        {user && (
          <Button asChild className="h-fit lg:w-fit w-full">
            <Link href={`?add=true`}>
              <div className="flex lg:flex-col items-center justify-center lg:w-fit w-[100%] hover:bg-blue-10 lg:p-4 cursor-pointer rounded-sm flex-1 lg:text-5xl text-2xl top-10  py-3">
                <PlusCircleIcon className="icon mr-2" />
                <span className="text-base lg:text-xl lg:mt-4">Add a listing</span>
              </div>
            </Link>
          </Button>
        )}
        <Button asChild className="h-fit lg:w-fit w-full bg-green-600 hover:bg-green-700  top-10">
          <Link href="tel:09014204138">
            <div className="flex lg:flex-col items-center justify-center lg:w-fit w-[100%] hover:bg-blue-10 lg:p-4 cursor-pointer rounded-sm flex-1 lg:text-5xl text-2xl top-10  py-3">
              <Phone className="icon mr-2" />
              <span className="text-base lg:text-xl lg:mt-4">09014204138</span>
            </div>
          </Link>
        </Button>
      </div>
      <div className="stats flex gap-3 w-fit lg:w-fit justify-between flex-wrap">
        {/* <div className="flex lg:flex-col lg:items-start items-center justify-center p-4 ">
          <div className="lg:text-5xl text-xl flex justify-center items-center">
            <FerrisWheel className="icon mr-2" />
            <span className="font-bold">4</span>
          </div>
          <span className="ml-2 text-base lg:text-xl lg:mt-4 text-left">Event Spaces Listed</span>
        </div> */}
        <div className="flex lg:flex-col items-start  p-4 ">
          <div className="lg:text-5xl text-xl flex justify-center items-center">
            <Star className="icon mr-2" />
            <span className="font-bold">4.6</span>
          </div>
          <span className="ml-2 text-base lg:text-xl lg:mt-4">Average Rating</span>
        </div>
        {user && (
          <div className="flex lg:flex-col items-start  p-4 ">
            <div className="lg:text-5xl text-xl flex justify-center items-center">
              <EyeIcon className="icon mr-2" />
              <span className="font-bold">400</span>
            </div>
            <span className="ml-2 text-base lg:text-xl lg:mt-4">Profile Views</span>
          </div>
        )}
      </div>
      {/* <div>30 Listings</div>
      <div>4.5 Total Views</div>
      <div>Testing Something</div> */}
    </div>
  );
}
