"use client";
import { observer } from "mobx-react";
import { FilterByCheckbox } from "./FilterByCheckbox";
import { COLOR_FAMILIES } from "@/constants";
import { shopFilterStore } from "@/stores";
import { Circle } from "lucide-react";

export const ColorFilter = observer(() => {
  return (
    <FilterByCheckbox
      data={COLOR_FAMILIES}
      storage={shopFilterStore.colorFamily}
      triggerName="Color Family"
      value="color-family"
      icon={Circle}
      iconSize={13}
      onFilterCheckedChange={(label, value) =>
        shopFilterStore.setColorFamily({ label, value })
      }
    />
  );
});
