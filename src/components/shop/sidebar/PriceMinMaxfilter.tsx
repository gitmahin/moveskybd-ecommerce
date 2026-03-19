"use client";
import {
  Input,
  Separator,
  Slider,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui";
import { shopFilterStore } from "@/services/stores";
import { observer } from "mobx-react";

export const PriceMinMaxfilter = observer(() => {
  return (
    <div className="py-3 pb-5 border-b">
      <p className="text-sm font-medium mb-2">Price</p>
      <div className="flex justify-center items-center gap-2 mb-5">
        <InputGroup>
          <InputGroupInput type="number" placeholder="From" value={shopFilterStore.priceRange[0]} onChange={(e) => shopFilterStore.priceRange[0] = Number(e.target.value)} />
          <InputGroupAddon align="inline-end">
            <kbd>৳</kbd>
          </InputGroupAddon>
        </InputGroup>
       
        <Separator orientation="horizontal" className="w-2" />

        <InputGroup>
          <InputGroupInput type="number" placeholder="To" value={shopFilterStore.priceRange[1]} onChange={(e) => shopFilterStore.priceRange[1] = Number(e.target.value)}  />
          <InputGroupAddon align="inline-end">
            <kbd>৳</kbd>
          </InputGroupAddon>
        </InputGroup>
     
      </div>
      <Slider
        max={shopFilterStore.maxPrice}
        value={shopFilterStore.priceRange}
        onValueChange={(value) => shopFilterStore.setPriceRange(value)}
        step={1}
        className="mx-auto w-full"
      />
    </div>
  );
});
