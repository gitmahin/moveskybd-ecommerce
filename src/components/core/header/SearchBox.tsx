"use client";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Separator,
} from "@/components/ui";

import { Circle, History, SearchIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";


export const SearchBox = () => {
  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button variant={"secondary"}>
          <SearchIcon size={20} />
          <span className="text-neutral-500">Search gadgets...</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[850px] h-[550px] flex-row! justify-start items-start gap-0 p-0! overflow-hidden!"
        align="end"
      >
        <div className="w-full  h-full">
          {/* Recommanded products */}
          <div className="h-[80px] border-b  p-3 w-full ">
            <Input placeholder="Search here..." />
            <div className="flex justify-start items-center h-[calc(100%-20px)]">
              <p className="text-sm font-medium text-black">
                Recommended for you
              </p>
            </div>
          </div>

          <ScrollArea className="h-[calc(100%-80px)] w-full ">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <React.Fragment key={item}>
                <div className="w-full h-fit rounded-xs p-2 hover:bg-neutral-50 flex justify-start items-start gap-3">
                  <Image
                    src={""}
                    width={300}
                    height={300}
                    className="w-[100px] h-[100px]l shrink-0 rounded-xs border "
                    alt="Product Image"
                  />
                  <div>
                    <h3 className="two-line-ellipsis text-sm font-medium text-black ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum, nisi?
                    </h3>
                    <p className="text-sm text-neutral-500 mt-2">
                      <Circle
                        size={12}
                        className="fill-emerald-500 text-emerald-500 inline"
                      />{" "}
                      Available: <b className="font-medium">3000 packs</b>,
                      Shipping within <b className="font-medium">24h</b>
                    </p>
                  </div>
                  <div className="w-[100px] text-right flex flex-col shrink-0 ml-2">
                    <p className="font-medium text-sm mb-1">45$</p>
                    <Button variant={"brand"} size={"sm"}>
                      <ShoppingCart size={16} />
                      Add to cart
                    </Button>
                  </div>
                </div>
                {index < [1, 2, 3, 4, 5].length - 1 && (
                  <Separator
                    orientation="horizontal"
                    className="border-neutral-100!"
                  />
                )}
              </React.Fragment>
            ))}

            <Separator orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="w-[260px] border-l h-full shrink-0 p-5">
          <p className="text-neutral-400">Recently searched</p>
          <ul className="flex flex-col gap-1 mt-5">
            {[
              "Wireless earbuds",
              "Smart watch",
              "Mechanical keyboard",
              "USB-C hub",
              "Desk lamp",
            ].map((search) => (
              <Link
                key={search}
                className="text-sm font-medium text-neutral-500 hover:text-black"
                href={`/search?q=${encodeURIComponent(search)}`}
              >
                <History size={15} className="inline" /> {search}
              </Link>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};
