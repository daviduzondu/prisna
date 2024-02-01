"use client";
import { getUserListings } from "@/lib/data";
import { useState, useEffect, useCallback } from "react";
import { MapPinIcon, PartyPopper } from "lucide-react";
let cache;
export default function Listings({ user }) {
  const [data, setData] = useState(cache);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/?uid=${user.uid}`);
        const result = await response.json();
        console.log(typeof result.data);
        result.data.forEach((entry) => console.log(entry));
        cache = result.data;
        setData(result.data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (cache === undefined) fetchData();
  }, []);
  // const userListings = getUserListings(user.uid);

  // console.log(userListings);
  // const userListings = getUserListings();
  if (data)
    return (
      <div>
        <div className="text-2xl font-bold mb-3">
          {data.length} {data.length > 1 ? "event spaces" : "event space"} listed
        </div>
        <div className="flex flex-col gap-6">
          {data.map((entry) => (
            <div key={entry.id} className="border p-5 rounded-lg">
              <div className="flex flex-col mb-3 gap-2">
                <div className="text-3xl font-semibold">{entry.name}</div>
                <div className="flex gap-3">
                  <span className="flex items-center gap-2">
                    <MapPinIcon className="icon" />
                    <div className="text-xl">{entry.location}</div>
                  </span>
                  <span className="flex items-center gap-2">
                    <PartyPopper className="icon" />
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
          ))}
        </div>
      </div>
    );

  return <div className="text-center block font-bold text-2xl">Nothing to see here...yet</div>;
}
