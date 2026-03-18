"use client";
import { observer } from "mobx-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Badge,
} from "@/components/ui";
import { X } from "lucide-react";
import { shopFilterStore } from "@/services/stores";

export const BrandFilterButton = observer(() => {
  if (shopFilterStore.brand.length <= 0) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size={"xs"}>
          Brand{" "}
          <Badge variant={"default"} className="text-xs! p-0! w-5 h-5">
            {" "}
            {shopFilterStore.brand.length}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex flex-row! flex-wrap! max-h-[400px] overflow-y-auto"
      >
        {shopFilterStore.brand.map((item, i) => {
          return (
            <Badge
              className="text-xs! font-normal!"
              variant={"secondary"}
              key={i}
            >
              {item.label}{" "}
              <span
                onClick={() => shopFilterStore.removeBrand(item.value)}
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
});
