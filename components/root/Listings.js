// "use client";
// import { useState, useEffect, useCallback } from "react";
import {MapPinIcon, PartyPopper} from "lucide-react";
import Link from 'next/link'

let cache = undefined;
export default async function Listings({userID}) {
    // const
    const response = await fetch(`/api/?uid=${userID} `);
    const data = (await response.json()).data;

    if (data)
        return (
            <div>
                <div className="text-2xl font-bold mb-3">
                    {data.length} {data.length > 1 ? "event spaces" : "event space"} listed
                </div>

                <div className="flex flex-col gap-6">
                    {data.reverse().map((entry) => (
                        <Link href={`/listing/${entry.id}`} key={entry.id}>
                            <div className="border p-5 rounded-lg">
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
                                {/* <div className="text-base">{entry.location}</div> */}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );

    return <div className="text-center block font-bold text-2xl">Nothing to see here...yet</div>;
}
