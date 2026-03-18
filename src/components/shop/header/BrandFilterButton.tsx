"use client";
import { observer } from "mobx-react";
import { shopFilterStore } from "@/services/stores";
import { FilterChkButton } from "./FilterChkButton";

export const BrandFilterButton = observer(() => {
  if (shopFilterStore.brand.length <= 0) return null;
  return (
    <FilterChkButton
      data={shopFilterStore.brand}
      onRemoveClick={(value) => shopFilterStore.removeBrand(value)}
      triggerName="Brand"
    />
  );
});
