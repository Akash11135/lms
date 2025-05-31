"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  const plugin = React.useRef(
    Autoplay({ delay: 1200, stopOnInteraction: true })
  );

  const carouselImages = [
    "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg",
    "https://contents.mediadecathlon.com/s1236598/k$2903a515ea45071cf931506ffa1590d6/defaut.jpg?format=auto&quality=70&f=1920x0",
    "https://contents.mediadecathlon.com/s1248252/k$880b0138c044b7d5455d1831ddbb5287/defaut.jpg?format=auto&quality=70&f=1920x0",
    "https://contents.mediadecathlon.com/s1244904/k$a76dc441afe46ff71e9c0e9ee86f999a/defaut.jpg?format=auto&quality=70&f=1920x0",
    "https://contents.mediadecathlon.com/s1250324/k$ee87e7559f58c28d58145592ddc21727/defaut.jpg?format=auto&quality=70&f=1920x0",
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full relative"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-0">
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                  <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden relative">
                    <img
                      src={carouselImages[index]}
                      alt="banner"
                      className="w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Position arrows absolutely over image */}
      <CarouselPrevious className="  absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90" />
      <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90" />
    </Carousel>
  );
}
