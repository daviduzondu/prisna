"use client";
import {bebasneue} from "@/components/ui/fonts";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import festival from "@/public/festival.png";
import {MapPinIcon, PartyPopper, Search} from "lucide-react";
import {useState} from "react";
import Link from "next/link";
import EventTypeList from "@/components/root/eventtypelist";

// import {experimental_useFormState as useFormState} from 'react-dom';
// import { experimental_us } from "@/next.config";

// const heroData = [];
export default function Hero() {
    const [location, setLocation] = useState("");
    const [data, setData] = useState(null);
    const [pending, setPending] = useState(null);
    const [value, setValue] = useState("any");

    async function searchSpaces(location) {
        setPending(true);
        const response = await fetch(`/api/search?location=${location}`);
        const result = await response.json();
        console.log("Results:", result);
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
                    <div
                        className="lg:text-[30px] leading-snug text-2xl  tracking-normal z-10 [text-shadow:_0_1.2px_0_rgb(0_0_0_/_40%)]">
                        Discover, book, and list event spaces seamlessly, all managed in one centralized platform.
                    </div>
                    {/* <div className="h-14"></div> */}
                    <div className="flex gap-3 mt-6 justify-center lg:justify-start">
                        {/* <div></div> */}
                        <form className="w-full" onSubmit={(e) => (e.preventDefault(), searchSpaces(location))}>
                            <div className="flex flex-col lg:flex-row w-[70%] gap-5 z-10">
                                <Input
                                    placeholder="Enter a location..."
                                    className="text-black flex-1 text-[17px] w-full"
                                    name="location"
                                    onChange={(e) => (e.target.value.length === 0 && setPending(false), setLocation(e.target.value))}
                                />
                                <div className="flex gap-2 justify-center">
                                    <EventTypeList value={value} setValue={setValue} variant={"primary"}
                                                   className={"bg-black"}/>
                                    <Button className="text-[17px] flex items-center" type="submit">
                                        <Search className="icon mr-2"/>
                                        Find Event Spaces
                                        {/* {pending ? "Searching..." : "Find Event Spaces"} */}
                                    </Button>
                                    {/*<Button className="text-[17px] w-fit" type="button">*/}
                                    {/*    <Filter className="icon"/>*/}
                                    {/*</Button>*/}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {pending && <div className="flex mt-5 items-center justify-center text-2xl">Searching...</div>}
            {data?.length > 0 &&  !pending && <Results results={data} pending={pending} eventType={value}/>}
            {data?.length === 0 && !pending && <div className="flex mt-5 items-center justify-center text-2xl">Nothing found!</div>}
        </>
    );
}

function Results({results, pending, eventType}) {
    // const [pending, setPending] = useState(false);
    // console.log("Results are:", results);
    console.log(results.filter(x => x.type !== eventType));

    eventType !== "any" ? results = results.filter(x => x.type === eventType) : results;

    if (results && results.length > 0) {
        return (
            <div className="mt-5">
                <div className="text-3xl mb-3">{results.length} Results Found</div>
                <div className="flex flex-col gap-6">
                    {results.map((entry) => (
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
                                <div className="post-metadata flex gap-2 items-center mt-3">
                                    <span>Listed by: </span>
                                    <img
                                        src={entry.userData.pic}
                                        className="w-[3em] h-[3em] rounded-full border-2 border-solid"
                                        loading="lazy"
                                        alt="Image"
                                    />
                                    <div className="text-base">{entry.userData.name}</div>
                                    <div className="text-base">{entry.userData.phone}</div>
                                </div>
                                {/* <div className="text-base">{entry.location}</div> */}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    } else {
        return <div className="flex mt-5 items-center justify-center text-2xl">Nothing found!</div>
    }

}
