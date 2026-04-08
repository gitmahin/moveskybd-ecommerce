import { shopFilterStore } from "@/services/stores";
import { observer } from "mobx-react";
import React from "react";
import { FilterChkButton } from "./FilterChkButton";

export const ColorFamilyFilterButton = observer(() => {
  if (shopFilterStore.colorFamily.length <= 0) return null;
  return (
    <FilterChkButton
      data={shopFilterStore.colorFamily}
      onRemoveClick={(value) => shopFilterStore.removeColorFamily(value)}
      onRemoveFilterClick={() => (shopFilterStore.colorFamily = [])}
      triggerName="Color Family"
    />
  );
});
