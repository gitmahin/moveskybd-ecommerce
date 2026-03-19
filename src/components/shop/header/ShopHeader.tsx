"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Separator,
} from "@/components/ui";
import { shopBaseStore, shopFilterStore } from "@/services/stores";
import { observer } from "mobx-react";
import { BrandFilterButton } from "./BrandFilterButton";
import { ShippingFilterButton } from "./ShippingFilterButton";
import { ColorFamilyFilterButton } from "./ColorFamilyFilterButton";
import { PriceMinMaxButton } from "./PriceMinMaxButton";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { rmvHypenNSentenceCase } from "@/utils";

export const ShopHeader = observer(() => {
  const path_name = usePathname();
  const searchParams = useSearchParams();

  const breadPaths = useMemo(() => {
  const category = searchParams.get("category");
    const paths = path_name.split("/");
    return category ? [...paths, category]: paths;
  }, [path_name, searchParams])

  return (
    <div className="w-full h-[64px] border-b py-1 flex justify-between items-center">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList className="*:text-xs">
            {breadPaths.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <BreadcrumbItem>
                    {item == "" ? (
                      <Link href={"/"}>Home</Link>
                    ) : item == "shop" ? (
                      <Link href={"/shop"}>Shop</Link>
                    ) : (
                      <li>
                        {rmvHypenNSentenceCase(item)}
                      </li>
                    )}
                  </BreadcrumbItem>
                  {i < breadPaths.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-start items-center gap-2 mt-1">
          <h1 className="text-lg font-bold">Shop</h1>
          {((shopFilterStore.brand.length ||
            shopFilterStore.shippingLocations.length ||
            shopFilterStore.colorFamily.length) > 0 ||
            shopFilterStore.priceRange[0] !== 0 ||
            shopFilterStore.priceRange[1] !== shopFilterStore.maxPrice) && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <p className="text-sm font-medium">Filters: </p>
              <Button
                variant={"ghost"}
                onClick={() => shopFilterStore.clearAllFilters()}
                className="text-red-500! hover:bg-red-500/5!"
                size={"xs"}
              >
                Clear all
              </Button>
            </>
          )}
          <BrandFilterButton />
          <ShippingFilterButton />
          <ColorFamilyFilterButton />
          <PriceMinMaxButton />
        </div>
      </div>
      <div className="shrink-0 w-fit">
        <p className="text-sm font-medium text-right">
          Showing {shopBaseStore.numberOfProducts}{" "}
          {shopBaseStore.numberOfProducts > 0 ? "Results" : "Result"}
        </p>
      </div>
    </div>
  );
});
