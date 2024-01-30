import Hero from "@/components/root/hero";
// import { Skeleton } from "@/components/ui/skeleton";
import { bebasneue } from "@/components/ui/fonts";
import { Suspense } from "react";
import Trending from "./trending";
// import
import { db } from "@/lib/firebase/config";
export default async function Page() {
  // console.log(db);
  // console.log(products);
  return (
    <>
      <Hero />
      <span id="discover" className=""></span>
      <section className="lg:-mx-56 lg:px-56 px-4 -mx-4 pt-8 ">
        <div className="text-2xl font-medium">Discover Event Spaces</div>
        <Suspense fallback={<CardSkeleton />}>
          <Trending />
        </Suspense>
      </section>
    </>
  );
}

function CardSkeleton() {
  return (
    <div className="mt-10">
      <div className="flex animate-pulse">
        <div className="flex-shrink-0">
          <span className="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
        </div>

        <div className="ms-4 mt-2 w-full">
          {/* <h3 className="h-4 bg-gray-200 rounded-full dark:bg-gray-700" style={{width: 40+"%"}}></h3> */}

          <ul className="mt-5 space-y-3">
            <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
            <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
            <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
            <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
