import React from "react";
import {
    Badge,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui";
import { observer } from "mobx-react";
import { shopFilterStore } from "@/services/stores";
import { X } from "lucide-react";
export const PriceMinMaxButton = observer(() => {
  if (
    shopFilterStore.priceRange[0] === 0 &&
    shopFilterStore.priceRange[1] === shopFilterStore.maxPrice
  )
    return null;
  return (
    <div className="flex justify-center items-center gap-1 border rounded-lg p-[1px] pl-1">
      
        
      <p className="text-xs font-medium text-neutral-500">Price Range</p>
      <ButtonGroup>
        <Button variant="outline"  size={"xs"}>
          {shopFilterStore.priceRange[0]}
          <kbd>৳</kbd>
        </Button>
        <Button variant="outline"  size={"xs"}>
          {shopFilterStore.priceRange[1]}
          <kbd>৳</kbd>
        </Button>
      </ButtonGroup>
        <Button variant={"secondary"} size={"icon-xs"} onClick={() => shopFilterStore.setDefaultPriceRange()}><X  /></Button>
    </div>
  );
});
