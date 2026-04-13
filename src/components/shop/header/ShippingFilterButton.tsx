"use client";
import { observer } from "mobx-react";
import { shopFilterStore } from "@/stores";
import { FilterChkButton } from "./FilterChkButton";

export const ShippingFilterButton = observer(() => {
  if (shopFilterStore.shippingLocations.length <= 0) return null;
  return (
    <FilterChkButton
      data={shopFilterStore.shippingLocations}
      onRemoveClick={(value) => shopFilterStore.removeShippingLocations(value)}
      onRemoveFilterClick={() => (shopFilterStore.shippingLocations = [])}
      triggerName="Shipping"
    />
  );
});
