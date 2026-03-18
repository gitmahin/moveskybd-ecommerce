"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
} from "@/components/ui";
import { ShopFilterMenuItem } from "../ShopFilterMenuItem";
import { BRANDS } from "@/constants";
import { shopFilterStore } from "@/services/stores";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export const BrandFilter = observer(() => {
    const params = new URLSearchParams()
    const router = useRouter()
    useEffect(() => {
        shopFilterStore.brand.forEach((item) => {
            params.append("filter",item.value )
        })
    const queryString = params.toString();
  router.push(`/shop${queryString ? `?${queryString}` : ""}`);
    }, [shopFilterStore.brand])
  return (
    <AccordionItem value="brand">
      <AccordionTrigger>Brand</AccordionTrigger>
      <AccordionContent className="leading-6 ">
        {BRANDS.map((item, i) => {
          return (
            <li key={i} className="flex justify-start items-center gap-1.5 ">
              <Checkbox
              checked={shopFilterStore.brand.some((b) => b.value === item.value)}
                onCheckedChange={() =>
                  shopFilterStore.setBrand({
                    label: item.label,
                    value: item.value,
                  })
                }
                id={item.value}
                name={item.value}
              />
              <label htmlFor={item.value}>
                <ShopFilterMenuItem label={item.label} />
              </label>
            </li>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
});
