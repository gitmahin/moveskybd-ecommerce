import { Clock, Flame, LucideIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type OfferCardPropsType = {
  icon?: LucideIcon;
  image?: string;
  title: string;
  content?: string;
  duration: Date;
};

export const OfferCard = ({
  duration,
  title,
  content,
  icon = Flame,
  image,
}: OfferCardPropsType) => {
  const Icon = icon;
  return (
    <div className="w-full h-fit bg-orange-100 rounded-lg border border-orange-200 p-3 ">
      <div className="flex justify-between items-center w-full h-fit">
        <div className="flex justify-start items-center gap-3">
          {Icon ? (
            <Icon size={20} className="text-orange-500 shrink-0" />
          ) : image ? (
            <Image src={image ?? ""} width={200} height={200} alt={title} className="shrink-0 w-[20px] h-[20px] object-contain object-center" />
          ) : null}

          <h4 className="text-lg leading-5 font-medium text-orange-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            quo.
          </h4>
          <div className="flex justify-center items-center p-2 px-5 rounded-md bg-orange-500 gap-2 shrink-0">
            <Clock size={15} className="text-white" />
            <div>
                <p className="text-white text-sm">Ends in</p>
                <p className="text-white text-sm">03:14:25:11</p>


            </div>
          </div>
        </div>
      </div>
      <p className="underline hover:no-underline underline-offset-2 text-sm mt-2 text-orange-500">View Rules</p>
    </div>
  );
};
