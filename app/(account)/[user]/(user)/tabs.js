// "use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import Link from "next/link";
import Listings from "@/components/root/Listings";
import {Suspense} from "react";
import {usePathname} from "next/navigation";
import UniversalSkeleton from "@/components/root/skeleton";
import Reviews from "@/app/(account)/[user]/(user)/Reviews";
import {addNewListerReview} from "@/lib/actions";
export default function ProfileTabs({user, userDetails}) {
    const pathname = usePathname();

    return (
        <Tabs defaultValue={"reviews"}>
            <div className="flex w-full items-end justify-end border-b-[1px] border-solid pb-2">
                <TabsList className="grid lg:w-[28%] w-full grid-cols-2 bg-slate-600 text-white">
                    {/* <div className="w-full py-4"> */}
                    <TabsTrigger value="reviews">
                        Reviews
                    </TabsTrigger>
                    <TabsTrigger value="listings">
                        Listings
                    </TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="reviews" className="mt-4">
                {user ? (
                    <div className="grid gap-2 my-4">
                        {!pathname.includes(user.uid) ? <form action={addNewListerReview}>
                                <Textarea placeholder="Add a review" id="textArea" name={"review"}/>
                                <input type={"hidden"} name={"reviewerID"} value={user.uid}/>
                                <input type={"hidden"} name={"listerID"} value={userDetails.data.uid}/>
                                <div className="flex items-end justify-end w-full">
                                    <Button className="lg:w-fit w-full " type={"submit"}>Send Review</Button>
                                </div>
                            </form> :
                            <div className={"flex w-100 items-center justify-center bg-blue-100 my-2"}>You cannot add a
                                review on your own page.</div>}
                    </div>
                ) : (
                    <div className="text-lg my-3 text-center block">
                        <em>You must be signed in to send a review</em>{" "}
                        <Button asChild className="text-lg ml-2">
                            <Link href="/login"> Sign In </Link>
                        </Button>
                    </div>
                )}
                <Suspense fallback={<UniversalSkeleton/>}>
                    <Reviews uid={userDetails.data.uid}/>
                </Suspense>
            </TabsContent>


            <TabsContent value="listings" className="mt-4">
                <Suspense fallback={<UniversalSkeleton/>}>
                    <Listings userID={userDetails.data.uid}/>
                </Suspense>
            </TabsContent>
        </Tabs>
    );
}


// async function Listings({user}) {
//   console.log(user);
//   // const userListings = getUserListings();
//   return <div>Hello from the children of Earth!</div>;
// }
