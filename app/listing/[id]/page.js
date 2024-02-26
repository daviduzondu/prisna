import {fetchListingData} from "@/lib/data";
import {MapPinIcon, PartyPopper} from "lucide-react";

export default async function Page({params}) {


    const {id} = params;
    const {data: entry, userData, error} = (await fetchListingData(id));

    // console.log("User Entry",entry);
    // return <h1>Hello</h1>


    return <div className="border p-5 rounded-lg">
        <div className="flex flex-col mb-3 gap-2">
            <div className="text-3xl font-semibold">{entry.name}</div>
            <div className="flex gap-3">
                 <span className="flex items-center gap-2">
                   <MapPinIcon className="icon"/>
                   <div className="text-xl">{entry.location}</div>
                 </span>
                <span className="flex items-center gap-2">
                   <PartyPopper className="icon"/>
                   <div className="text-xl">{entry.type.replace(entry.type[0], entry?.type[0]?.toUpperCase())}</div>
                 </span>
            </div>
        </div>
        <div className="images flex gap-3 h-fit flex-wrap">
            {entry.media.map((medium) => (
                <img
                    src={medium}
                    width={400}
                    height={400}
                    className="w-screen lg:w-[400px] lg:h-[350px] rounded-md"
                    loading="lazy"
                    key={entry.id}
                    alt="Image"
                />
            ))}
        </div>
        <div className="post-metadata flex gap-2 items-center mt-3">
        <span>Listed by: </span>
            <img
                src={userData.pic}
                className="w-[3em] h-[3em] rounded-full border-2 border-solid"
                loading="lazy"
                alt="Image"
            />
            <div className="text-base">{userData.name}</div>
            <div className="text-base">{userData.phone}</div>
        </div>
    </div>
}