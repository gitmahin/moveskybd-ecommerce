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
import { shopBaseStore, shopFilterStore } from "@/stores";
import { observer } from "mobx-react";
import { BrandFilterButton } from "./BrandFilterButton";
import { ShippingFilterButton } from "./ShippingFilterButton";
import { ColorFamilyFilterButton } from "./ColorFamilyFilterButton";
import { PriceMinMaxButton } from "./PriceMinMaxButton";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { rmvHypenNSentenceCase } from "@/utils/rmvHypenNSentenceCase";
import { ChevronLeft, Router } from "lucide-react";

export const ShopHeader = observer(() => {
  const path_name = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const groupCategory = searchParams.get("group-category");
  const router = useRouter();

  const breadPaths = useMemo(() => {
    const paths = path_name.split("/");
    let breads = paths;
    if (groupCategory) {
      breads = [...breads, groupCategory];
    }
    if (category) {
      breads = [...breads, category];
    }
    return breads;
  }, [path_name, searchParams]);

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
                      <li>{rmvHypenNSentenceCase(item)}</li>
                    )}
                  </BreadcrumbItem>
                  {i < breadPaths.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-start items-center gap-2 mt-1">
          <div className="flex justify-start items-center gap-2">
            <h1 className="text-lg font-bold">Shop</h1>
            {category && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex justify-start items-center gap-2">
                  <Button
                    variant={"outline"}
                    size={"xs"}
                    onClick={() => router.push("/shop")}
                  >
                    <ChevronLeft />
                    Back
                  </Button>
                  <h2 className="text-lg font-medium">
                    {rmvHypenNSentenceCase(category?.toString() || "")}
                  </h2>
                </div>
              </>
            )}
          </div>
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
                className="text-red-500! hover:bg-red-500/5! border border-red-500/40"
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
