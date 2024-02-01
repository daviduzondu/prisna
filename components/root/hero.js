"use client";
import { bebasneue } from "@/components/ui/fonts";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import festival from "@/public/festival.png";
import { Search, Megaphone, Filter } from "lucide-react";
import { searchListingsByLocation } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { MapPinIcon, PartyPopper } from "lucide-react";

// import {experimental_useFormState as useFormState} from 'react-dom';
// import { experimental_us } from "@/next.config";

// const heroData = [];
export default function Hero() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(null);

  async function searchSpaces(location) {
    setPending(true);
    const response = await fetch(`/api/search?location=${location}`);
    const result = await response.json();
    setData(result.data);
    setPending(false);
  }

  return (
    <>
      <section
        className={`tracking-[-0.1rem] lg:-mx-56 lg:px-56 -mx-4 px-4 text-white flex -mt-16 hero-pattern  pt-16 lg:pb-14 pb-8`}
      >
        <div className="flex flex-col justify-center mt-5 ">
          <Image
            src={festival}
            className="absolute hidden lg:block hero-img"
            width={410}
            alt="Two women at a festival"
          />
          <div
            className={`${bebasneue.className} lg:text-[140px] text-8xl z-10 mix-blend-overlay [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]`}
          >
            Your Next-Level <br className="hidden lg:block"></br> Event Command Center
          </div>
          <div className="lg:text-[30px] leading-snug text-2xl  tracking-normal z-10 [text-shadow:_0_1.2px_0_rgb(0_0_0_/_40%)]">
            Discover, book, and list event spaces seamlessly, all managed in one centralized platform.
          </div>
          {/* <div className="h-14"></div> */}
          <div className="flex gap-3 mt-6 justify-center lg:justify-start">
            {/* <div></div> */}
            <form className="w-full" onSubmit={(e) => (e.preventDefault(), searchSpaces(location))}>
              <div className="flex flex-col lg:flex-row w-full gap-5 z-10">
                <Input
                  placeholder="Enter a location..."
                  className="text-black flex-1 text-[17px] w-full"
                  name="location"
                  onChange={(e) => (e.target.value.length===0 && setPending(false),setLocation(e.target.value))}
                />
                <div className="flex gap-2 justify-center">
                  <Button className="text-[17px] flex items-center" type="submit">
                    <Search className="icon mr-2" />
                    Find Event Spaces
                    {/* {pending ? "Searching..." : "Find Event Spaces"} */}
                  </Button>
                  <Button className="text-[17px] w-fit" type="button">
                    <Filter className="icon" />
                  </Button>
                </div>
              </div>
            </form>
            {/* <Button className="text-[17px] bg-orange-400 hover:bg-orange-300">
            <Megaphone className="icon mr-1" />
            List a space
          </Button> */}
          </div>
        </div>
      </section>
      <Results results={data} pending={pending} />
    </>
  );
}

function Results({ results, pending }) {
  // const [pending, setPending] = useState(false);

  if (results && results.length > 0) {
    return (
      <div className="mt-5">
        <div className="text-3xl mb-3">{results.length} Results Found</div>
        <div className="flex flex-col gap-6">
          {results.map((entry) => (
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
                    <div className="text-xl">{entry.type.replace(entry.type[0], entry.type[0].toUpperCase())}</div>
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
  }

  if (pending) {
    return <div className="flex mt-5 items-center justify-center text-2xl">Searching...</div>
  }

  if (results && results.length === 0 && pending === false) {
    return <div className="flex mt-5 items-center justify-center text-2xl">Nothing found!</div>;
  }
}
