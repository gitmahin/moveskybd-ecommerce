"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
} from "@/components/ui";
import { shopFilterStore } from "@/services/stores";
import { observer } from "mobx-react";
import { BrandFilterButton } from "./BrandFilterButton";

export const ShopHeader = observer(() => {
  return (
    <div className="w-full h-[64px] border-b py-1 flex justify-start items-center">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList className="*:text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-start items-center gap-2 mt-1">
          <h1 className="text-lg font-bold">Shop</h1>
          {shopFilterStore.isFilterActive && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <p className="text-sm font-medium">Filters: </p>
            </>
          )}
          <BrandFilterButton />
        </div>
      </div>
    </div>
  );
});
