"use client";
import { bebasneue } from "@/components/ui/fonts";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import festival from "@/public/festival.png";
import { Search, Megaphone, Filter } from "lucide-react";

// const heroData = [];
export default function Hero() {
  return (
    <section className={`tracking-[-0.1rem] lg:-mx-56 lg:px-56 -mx-4 px-4 text-white flex -mt-16 hero-pattern  pt-16 lg:pb-14 pb-8`}>
      <div className="flex flex-col justify-center mt-5 ">
        <Image src={festival} className="absolute hidden lg:block hero-img" width={410} alt="Two women at a festival"/>
        <div className={`${bebasneue.className} lg:text-[140px] text-8xl z-10 mix-blend-overlay [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]`}>
          Your Event <br className="hidden lg:block"></br> Command Center
        </div>
        <div className="lg:text-[30px] leading-snug text-2xl  tracking-normal z-10 [text-shadow:_0_1.2px_0_rgb(0_0_0_/_40%)]">
          Discover, book, and list event spaces seamlessly, all managed in one centralized platform.
        </div>
        {/* <div className="h-14"></div> */}
        <div className="flex gap-3 mt-6 justify-center lg:justify-start">
          {/* <div></div> */}
          <Form>
            <div className="flex flex-col lg:flex-row w-full gap-5 z-10">
              <Input placeholder="Enter a location..." className="text-black flex-1 text-[17px]" />
              <div className="flex gap-2 justify-center">
                <Button className="text-[17px] flex items-center" type="submit">
                  <Search className="icon mr-2" />
                  Find Event Spaces
                </Button>
                <Button className="text-[17px] w-fit">
                  <Filter className="icon" />
                </Button>
              </div>
            </div>
          </Form>
          {/* <Button className="text-[17px] bg-orange-400 hover:bg-orange-300">
            <Megaphone className="icon mr-1" />
            List a space
          </Button> */}
        </div>
      </div>
    </section>
  );
}
