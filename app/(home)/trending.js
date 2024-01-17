import { fetchTrending } from "@/lib/data";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
export default async function Trending() {
  const { products } = await fetchTrending();

  return (
    <div className="mt-6 grid-custom lg:w-[100%]">
      {products.map((element) => (
        <Card key={element.title} className="flex flex-col justify-between w-[100%] lg:w-[350px] lg:h-[500px] h-fit">
          <CardHeader>
            <CardTitle>{element.title}</CardTitle>
            <CardDescription>{element.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative flex items-center justify-center h-[100%] w-[100%] object-contain">
              <img src={element.thumbnail} alt={element.title} className="w-[100%] h-[100%] object-contain" />
            </div>
          </CardContent>
          <CardFooter>
            <Star className="icon mr-1" />
            {element.rating}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
