"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  Button,
  EmptyTitle,
} from "@/components/ui";
import { shopFilterStore } from "@/stores";

import { FunnelX, PackageSearch, RefreshCcwIcon, Store } from "lucide-react";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";

export const NoProduct = observer(() => {
  const router = useRouter();
  return (
    <Empty className="h-full w-full bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageSearch />
        </EmptyMedia>
        <EmptyTitle>No Products</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          {shopFilterStore.brand.length > 0 ||
          shopFilterStore.colorFamily.length > 0 ||
          shopFilterStore.shippingLocations.length > 0
            ? "No products found matching your current filters. Try adjusting or clearing your filters."
            : "No products available at the moment. Please check back later."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {shopFilterStore.brand.length > 0 ||
        shopFilterStore.colorFamily.length > 0 ||
        shopFilterStore.shippingLocations.length > 0 ||
        shopFilterStore.priceRange[0] !== 0 ||
        shopFilterStore.priceRange[1] !== shopFilterStore.maxPrice ? (
          <Button
            variant="brand"
            onClick={() => shopFilterStore.clearAllFilters()}
          >
            <FunnelX />
            Clear all filters
          </Button>
        ) : (
          <Button variant="brand" onClick={() => router.push("/shop")}>
            <Store />
            Back to shop page
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
});
