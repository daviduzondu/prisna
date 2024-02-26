"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import Link from "next/link";
import Listings from "@/components/root/Listings";
import {Suspense} from "react";
import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation";
import {useSearchParams} from "next/navigation";
import UniversalSkeleton from "@/components/root/skeleton";

const tabsData = {
    reviews: [
        {
            uid: "John Doe",
            text: "I had a great experience with this venue. The staff was friendly and the atmosphere was perfect for our event. Highly recommended!",
            time: "2 days ago",
        },
        {
            uid: "Jane Smith",
            text: "The event space exceeded my expectations. The interior design was impressive, and the amenities provided were top-notch. Will definitely book again!",
            time: "1 week ago",
        },
        {
            uid: "Alex Johnson",
            text: "Chad, the owner, was very accommodating. He helped us with all our requests and made sure everything ran smoothly. Great communication throughout the process.",
            time: "3 weeks ago",
        },
        {
            uid: "Emily White",
            text: "Attended an event here, and I must say it was fantastic. The location is convenient, and the venue itself is well-maintained. Looking forward to future events!",
            time: "1 month ago",
        },
        {
            uid: "Anonymous",
            text: "Chad, is one of the best people I have worked with. He replies to messages quickly and is a genuine person. The event space was perfect for our needs.",
            time: "3 months ago",
        },
        {
            uid: "BusinessPartner789",
            text: "As a business partner, Chad has been reliable and professional. His commitment to quality service is commendable. Looking forward to future collaborations!",
            time: "3 weeks ago",
        },
        {
            uid: "Anonymous",
            text: "Chad, the lister, is a pleasure to work with. His expertise and dedication make him stand out. I appreciate the effort he puts into ensuring client satisfaction.",
            time: "1 month ago",
        },
        {
            uid: "SatisfiedCustomer",
            text: "Chad, the lister, is a genuine and trustworthy professional. He made the entire process easy and stress-free. I highly recommend his services!",
            time: "3 months ago",
        },
        {
            uid: "Alex Johnson",
            text: "Chad, the owner, was very accommodating. He helped us with all our requests and made sure everything ran smoothly. Great communication throughout the process.",
            time: "3 weeks ago",
        },
        {
            uid: "Emily White",
            text: "Attended an event here, and I must say it was fantastic. The location is convenient, and the venue itself is well-maintained. Looking forward to future events!",
            time: "1 month ago",
        },
        {
            uid: "Anonymous",
            text: "Chad, is one of the best people I have worked with. He replies to messages quickly and is a genuine person. The event space was perfect for our needs.",
            time: "3 months ago",
        },
        {
            uid: "BusinessPartner789",
            text: "As a business partner, Chad has been reliable and professional. His commitment to quality service is commendable. Looking forward to future collaborations!",
            time: "3 weeks ago",
        },
        {
            uid: "Anonymous",
            text: "Chad, the lister, is a pleasure to work with. His expertise and dedication make him stand out. I appreciate the effort he puts into ensuring client satisfaction.",
            time: "1 month ago",
        },
        {
            uid: "SatisfiedCustomer",
            text: "Chad, the lister, is a genuine and trustworthy professional. He made the entire process easy and stress-free. I highly recommend his services!",
            time: "3 months ago",
        },
    ],
    listings: null,
};

export default function ProfileTabs({user}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <Tabs defaultValue={`${searchParams.get("tab") || "reviews"}`}>
            <div className="flex w-full items-end justify-end border-b-[1px] border-solid pb-2">
                <TabsList className="grid lg:w-[28%] w-full grid-cols-2 bg-slate-600 text-white">
                    {/* <div className="w-full py-4"> */}
                    <TabsTrigger value="reviews" onClick={()=>router.push("?tab=reviews")}>
                        Reviews
                    </TabsTrigger>
                    <TabsTrigger value="listings" onClick={()=>router.push("?tab=listings")}>
                            Listings
                    </TabsTrigger>
                    {/* </div> */}
                </TabsList>
            </div>
            <TabsContent value="reviews" className="mt-4">
                <div className="text-2xl font-bold">32 User Reviews</div>
                {user ? (
                    <div className="grid gap-2 my-4">
                        <Textarea placeholder="Add a review"/>
                        <div className="flex items-end justify-end w-full">
                            <Button className="lg:w-fit w-full ">Send Review</Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-lg my-3 text-center block">
                        <em>You must be signed in to send a review</em>{" "}
                        <Button asChild className="text-lg ml-2">
                            <Link href="/login"> Sign In </Link>
                        </Button>
                    </div>
                )}
                <Reviews/>
            </TabsContent>


            <TabsContent value="listings" className="mt-4">
                <Suspense fallback={<UniversalSkeleton/>}>
                    <Listings userID={pathname.split("/")[1]}/>
                </Suspense>
            </TabsContent>
        </Tabs>
    );
}

function Reviews() {
    const {reviews, listings} = tabsData;
    return (
        // <ScrollArea className="h-72 w-full rounded-md border overflow-scroll">
        <div className="h-full max-h-[700px] w-full rounded-md  overflow-y-scroll">
            {reviews.map((review) => {
                return (
                    <div className="review-item my-5" key="">
                        <div className="review-info flex gap-4">
                            <span className="font-bold">{review.uid}</span>
                            <span className="italic">{review.time}</span>
                        </div>
                        <div className="text-lg">{review.text}</div>
                    </div>
                );
            })}
        </div>
        // </ScrollArea>
    );
}

// async function Listings({user}) {
//   console.log(user);
//   // const userListings = getUserListings();
//   return <div>Hello from the children of Earth!</div>;
// }
