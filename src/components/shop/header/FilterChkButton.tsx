"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Badge,
} from "@/components/ui";
import { LucideIcon, X } from "lucide-react";
import { FilterCheckboxDataType } from "@/types/shop";

type FilterButtonPropsType = {
  data: FilterCheckboxDataType[];
  triggerName?: string;

  onRemoveClick?: (value: string) => void;
};

export const FilterChkButton = ({
  data,
  triggerName,
  onRemoveClick,
}: FilterButtonPropsType) => {
  if (data.length <= 0) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size={"xs"}>
          {triggerName}{" "}
          <Badge variant={"default"} className="text-xs! p-0! w-5 h-5">
            {data.length}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex flex-row! flex-wrap! max-h-[400px] overflow-y-auto"
      >
        {data.map((item, i) => {
       
          return (
            <Badge
              className="text-xs! font-normal!"
              variant={"secondary"}
              key={i}
            >
             
              <span
                onClick={() => onRemoveClick?.(item.value)}
                className="text-neutral-400 hover:text-red-500"
              >
                <X size={13} />
              </span>
            </Badge>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};
