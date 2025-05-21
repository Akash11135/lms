import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/lib/validators/products";

type SideBySideCarouselProps = {
  products: Product[];
};

export function SideBySideCarousel({ products }: SideBySideCarouselProps) {
  return (
    <Carousel className="w-full max-w-sm border m-2">
      <CarouselContent className="-ml-1">
        {products?.map((item, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img
                    src={
                      item.imageUrl ||
                      "https://contents.mediadecathlon.com/p1587979/7813db01883c118aebbc2d12db109eef/p1587979.jpg?format=auto&quality=70&f=256x0"
                    }
                    alt="image here"
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
