"use client";
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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import EventTypeList from "./eventtypelist";
export default function AddListing({ showModal }) {
  const [isClient, setIsClient] = useState(false);
  //   const dialogRef = useRef();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <AlertDialog open>
          {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
          <form>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add a new listing</AlertDialogTitle>
                {/* <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </AlertDialogDescription> */}
              </AlertDialogHeader>
              <div className="flex flex-col gap-3">
                <Label htmlFor="profile-pic">Venue name</Label>
                <Input placeholder="Enter a catchy name for this center" name="center-name" type="text" required />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="profile-pic">Location</Label>
                <Input placeholder="Where is this center located?" name="center-location" type="text" required />
              </div>{" "}
              <div className="flex flex-row gap-1 items-center ">
                <Label htmlFor="profile-pic flex-1  " >
                  This center is suitable for:{" "}
                </Label>
                <EventTypeList className="min-w-full"/>
              </div>{" "}
              <div className="flex flex-col gap-3">
                <Label htmlFor="profile-pic">Profile Picture</Label>
                <Input placeholder="Enter a catchy name for this center" name="center-name" type="text" required />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Link href={pathname}>Cancel</Link>
                </AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </form>
        </AlertDialog>
      )}
    </>
  );
}
