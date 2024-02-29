"use client";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useParams, usePathname, useRouter} from "next/navigation";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {PlusIcon, Trash2} from "lucide-react";
import Link from "next/link";
import EventTypeList from "./eventtypelist";
import {addNewListing} from "@/lib/actions";
import {auth} from "@/lib/firebase/config";
export default function AddListing({showModal, children}) {
    const [isClient, setIsClient] = useState(false);
    const [value, setValue] = useState("any");

    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();
    const user = params.user || null;
    console.log(user);
    // console.log(params.user === true)
    // console.log(params.user === auth.currentUser.uid)
    console.log(auth.currentUser && params.user);
    // console.log(null === undefined)

    if ((auth.currentUser || user) === null) {
        router.push("/");
    } else if (user !== auth.currentUser?.uid) {
        router.push("/");
    }

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <AlertDialog>
                    {children}
                    <AlertDialogContent>
                        <form onSubmit={() => router.push("?add=true")} className="flex flex-col gap-4"
                              action={addNewListing}>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Add a new listing</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="event-name">Venue name</Label>
                                <Input placeholder="Enter a catchy name for this center" name="event-name" type="text"
                                       required/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="event-location">Location</Label>
                                <Input placeholder="Where is this center located?" name="event-location" type="text"
                                       required/>
                            </div>
                            {" "}
                            <div className="flex flex-row gap-1 items-center ">
                                <Label htmlFor="event-type" className="flex-1">
                                    This center is suitable for:{" "}
                                </Label>

                                <input type="hidden" value={params.user} name="event-lister"/>
                                <input type="hidden" value={value} name="event-type"/>
                                <EventTypeList className="w-fit" value={value} setValue={setValue}/>
                            </div>
                            {" "}
                            <FileChooser/>
                            <AlertDialogFooter>
                                <AlertDialogCancel asChild>
                                    <Link href={pathname}>Cancel</Link>
                                </AlertDialogCancel>
                                <Button type="submit">Continue</Button>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}

function FileChooser() {
    const [mediaCollection, setMediaCollection] = useState([0]);
    useEffect(() => {
        console.log(mediaCollection);
    }, [mediaCollection]);
    return (
        <>
            <div className="flex flex-col gap-3">
                <Label htmlFor="profile-pic" className="flex-1">
                    Attach Pictures. At least one picture is required
                </Label>
                <div className="flex flex-col gap-3">
                    {mediaCollection.map((x, index) => (
                        <div key={x} className="flex gap-2 media-collection">
                            {/* <span>`Click to attach a picture {x}</span> */}
                            <Input
                                placeholder={`Click to at tach a picture ${index}`}
                                name={`event-pictures-${index + 1}`}
                                type="file"
                                accept="image/jpeg"
                                required
                            />
                            {x !== 0 && (
                                <Button
                                    variant="secondary"
                                    type="button"
                                    onClick={() => setMediaCollection([...mediaCollection.filter((y) => y !== x)])}
                                >
                                    <Trash2 className="icon"/>
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
                <Button
                    variant="outline"
                    type="button"
                    onClick={() => setMediaCollection([...mediaCollection, mediaCollection.length])}
                >
                    <PlusIcon className="icon mr-2"/>
                    Add more images
                </Button>
            </div>
        </>
    );
}