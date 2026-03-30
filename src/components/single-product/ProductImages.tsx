"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide, useSwiper } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "../ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ZoomImage } from "./ZoomImage";

const IMAGES: { src: string; alt_text: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    alt_text: "Watch on white background",
  },
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    alt_text: "Headphones product shot",
  },
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    alt_text: "Red Nike sneaker",
  },
  {
    src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    alt_text: "Sunglasses on surface",
  },
  {
    src: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop",
    alt_text: "White sneaker side view",
  },
  {
    src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop",
    alt_text: "Wireless earbuds case",
  },
];

export const ProductImages = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType>(null);
  const thumbsSwiperRef = useRef<SwiperType | null>(null);
  const handleSlideNext = (swiperRef: React.RefObject<SwiperType | null>) => {
    swiperRef.current?.slideNext();
  };

  const handleSlidePrev = (swiperRef: React.RefObject<SwiperType | null>) => {
    swiperRef.current?.slidePrev();
  };

  return (
    <div className="sticky top-[100px]">
      <div className="border rounded-lg h-[450px] bg-white w-full p-2">
        <div className="w-full h-full rounded-md bg-background relative overflow-hidden group">
          <Button
            onClick={() => handleSlideNext(mainSwiperRef)}
            size={"icon-lg"}
            variant={"outline"}
            className="absolute top-1/2  -translate-y-1/2 -right-[100%] group-hover:right-2 transition-all z-50"
          >
            <ChevronRight size={15} />
          </Button>
          <Button
            onClick={() => handleSlidePrev(mainSwiperRef)}
            size={"icon-lg"}
            variant={"outline"}
            className="absolute top-1/2  -translate-y-1/2 -left-[100%] group-hover:left-2 transition-all z-50"
          >
            <ChevronLeft size={15} />
          </Button>
          <Swiper
            onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            className="w-full h-full"
          >
            {IMAGES.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <ZoomImage
                    src={item.src}
                    alt={item.alt_text}
               
    
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="mt-5 w-full relative group overflow-hidden">
        <Button
          onClick={() => handleSlideNext(thumbsSwiperRef)}
          size={"icon-sm"}
          variant={"brand"}
          className="absolute top-1/2  -translate-y-1/2 -right-[100%] group-hover:right-2 transition-all z-50"
        >
          <ChevronRight size={15} />
        </Button>

        <Button
          onClick={() => handleSlidePrev(thumbsSwiperRef)}
          size={"icon-sm"}
          variant={"brand"}
          className="absolute top-1/2  -translate-y-1/2 -left-[100%] group-hover:left-2 transition-all z-50"
        >
          <ChevronLeft size={15} />
        </Button>
        <Swiper
          onSwiper={(swiper) => {
            thumbsSwiperRef.current = swiper;
            setThumbsSwiper(swiper); // still needed for thumbs sync
          }}
          spaceBetween={5}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="w-full"
        >
          {IMAGES.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <div
                  className="w-[95px] h-[95px] p-1 rounded-md border bg-white"
                  key={i}
                >
                  <div className="w-full h-full rounded-sm bg-background overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt_text}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
