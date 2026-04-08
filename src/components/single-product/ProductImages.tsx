"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide, useSwiper } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "../ui";
import { ChevronLeft, ChevronRight, PlayIcon } from "lucide-react";
import { ZoomImage } from "./ZoomImage";
import { VideoSlide } from "./VideoSlide";

type ProductMediaDataType = {
  type: "image" | "video";
  src: string;
  alt_text?: string;
};

const PRODUCT_MEDIA_SRCS: ProductMediaDataType[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    alt_text: "Watch on white background",
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    alt_text: "Product video 1",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    alt_text: "Headphones product shot",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    alt_text: "Red Nike sneaker",
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/movie.mp4",
    alt_text: "Product video 2",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    alt_text: "Sunglasses on surface",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop",
    alt_text: "White sneaker side view",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop",
    alt_text: "Wireless earbuds case",
  },
];

export const ProductImages = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
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
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              // ... rest
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            className="w-full h-full"
          >
            {PRODUCT_MEDIA_SRCS.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  {item.type == "image" ? (
                    <ZoomImage src={item.src} alt={item.alt_text ?? ""} />
                  ) : (
                    <VideoSlide src={item.src} isActive={activeIndex === i} />
                  )}
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
          {PRODUCT_MEDIA_SRCS.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <div
                  className="w-[95px] h-[95px] p-1 rounded-md border bg-white"
                  key={i}
                >
                  <div className="w-full h-full rounded-sm bg-background relative overflow-hidden">
                    {item.type == "image" ? (
                      <Image
                        src={item.src}
                        alt={item.alt_text ?? ""}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <>
                        <video
                          preload="metadata" // ← loads just enough to show first frame
                          className="w-full h-full object-cover"
                          muted
                        >
                          <source src={item.src + "#t=0.1"} type="video/mp4" />
                        </video>
                        {/* Play icon overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                            <PlayIcon
                              size={14}
                              className="text-black ml-0.5"
                              fill="black"
                            />
                          </div>
                        </div>
                      </>
                    )}
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
