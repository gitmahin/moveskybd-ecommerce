"use client";
import { BRANDS } from "@/constants";
import { shopFilterStore } from "@/services/stores";
import { observer } from "mobx-react";
import { FilterByCheckbox } from "./FilterByCheckbox";
export const BrandFilter = observer(() => {
//   const params = new URLSearchParams();
//   const router = useRouter();
//   useEffect(() => {
//     shopFilterStore.brand.forEach((item) => {
//       params.append("filter", item.value);
//     });
//     const queryString = params.toString();
//     router.push(`/shop${queryString ? `?${queryString}` : ""}`);
//   }, [shopFilterStore.brand]);
  return (
    <FilterByCheckbox
      data={BRANDS}
      storage={shopFilterStore.brand}
      triggerName="Brand"
      value="brand"
      onFilterCheckedChange={(label, value) =>
        shopFilterStore.setBrand({ label, value })
      }
    />
  );
});
