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
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const PriceMinMaxfilter = observer(() => {
  const [localRange, setLocalRange] = useState<number[]>(
    shopFilterStore.priceRange
  );

  const debouncedStoreUpdate = useDebouncedCallback((value: number[]) => {
    shopFilterStore.setPriceRange(value);
  }, 300);

  const debouncedStoreSinglePriceChange = useDebouncedCallback(
    (value: number, index: number) => {
      shopFilterStore.setPriceRangeByIndex(value, index);
    },
    300
  );

  const handleChange = (value: number[]) => {
    setLocalRange(value);
    debouncedStoreUpdate(value);
  };

  const handleSingleValueChange = (value: number, index: number) => {
    setLocalRange((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

    debouncedStoreSinglePriceChange(value, index);
  };

  return (
    <div className="py-3 pb-5 border-b">
      <p className="text-sm font-medium mb-2">Price</p>
      <div className="flex justify-center items-center gap-2 mb-5">
        <InputGroup>
          <InputGroupInput
            type="number"
            placeholder="From"
            value={localRange[0]}
            onChange={(e) => handleSingleValueChange(Number(e.target.value), 0)}
          />
          <InputGroupAddon align="inline-end">
            <kbd>৳</kbd>
          </InputGroupAddon>
        </InputGroup>

        <Separator orientation="horizontal" className="w-2" />

        <InputGroup>
          <InputGroupInput
            type="number"
            placeholder="To"
            value={localRange[1]}
            onChange={(e) => handleSingleValueChange(Number(e.target.value), 1)}
          />
          <InputGroupAddon align="inline-end">
            <kbd>৳</kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <Slider
        max={shopFilterStore.maxPrice}
        value={localRange}
        onValueChange={handleChange}
        step={1}
        className="mx-auto w-full"
      />
    </div>
  );
});
