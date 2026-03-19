"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
} from "@/components/ui";
import { ShopFilterMenuItem } from "../ShopFilterMenuItem";
import { FilterCheckboxDataType } from "@/types/shop";
import { LucideIcon } from "lucide-react";

type FilterByCheckboxPropstype = {
  value: string;
  triggerName: string;
  data: FilterCheckboxDataType[] ;
  onFilterCheckedChange: (label: string, value: string) => void;
  storage: FilterCheckboxDataType[];
  icon?: LucideIcon;
  iconSize?: number;
  iconClassName?: string;
};

export const FilterByCheckbox = ({
  data,
  onFilterCheckedChange,
  storage,
  triggerName = "Undefined",
  value = "undefined",
  icon,

  iconClassName,
  iconSize,
}: FilterByCheckboxPropstype) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{triggerName}</AccordionTrigger>
      <AccordionContent className="leading-6 ">
        {data.map((item, i) => {
          const Icon = icon;
          return (
            <li key={i} className="flex justify-start items-center gap-1.5 ">
              <Checkbox
                checked={storage.some((b) => b.value === item.value)}
                onCheckedChange={() =>
                  onFilterCheckedChange?.(item.label, item.value)
                }
                id={item.value}
                name={item.value}
              />
              {Icon && <Icon size={iconSize} style={{color: item?.hex, fill: item?.hex}} className={`${iconClassName} border rounded-full`} />}
              <label htmlFor={item.value}>
                <ShopFilterMenuItem label={item.label} />
              </label>
            </li>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};
