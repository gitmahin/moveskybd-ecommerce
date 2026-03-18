import { LucideIcon, WatchIcon } from "lucide-react";
import React from "react";
import { LandingPageTitle } from "./LandingPageTitle";
import { CATEGORIES } from "@/constants";

type CategoryCardPropsType = {
  label: string;
  desc: string;
  icon: LucideIcon;
};
const CategoryCard = ({ label, desc, icon }: CategoryCardPropsType) => {
  const Icon = icon;
  return (
    <div className="w-full h-[250px] rounded-xl border bg-white flex justify-center items-center flex-col">
      <div className="rounded-full w-[80px] h-[80px] flex justify-center items-center bg-brand-color/20 ">
        {Icon && <Icon size={40} className="text-brand-color" />}
      </div>
      <div className="mt-5 flex flex-col justify-center items-center">
        <h3 className="text-lg text-black font-medium one-line-ellipsis">
          {label}
        </h3>
        <p className="text-sm text-neutral-500 font-medium one-line-ellipsis">
          {desc}
        </p>
      </div>
    </div>
  );
};

type FeaturedCategoriesPropsType = {
  className?: string;
};

export const FeaturedCategories = ({
  className,
}: FeaturedCategoriesPropsType) => {
  return (
    <div className={`${className}`}>
      <LandingPageTitle title="Featured Categories" />
      <div className="grid grid-cols-6 grid-rows-1 gap-3 mt-5">
        {CATEGORIES.map((item, i) => {
          return <CategoryCard key={i} label={item.label} desc={item.description} icon={item.icon} />;
        })}
      </div>
    </div>
  );
};
