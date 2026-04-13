"use client";
import { CustomECard } from "@/components";
import { SHOP_PRODUCTS, SHOP_PRODUCTS_WITH_COUNTS } from "@/constants";
import { shopBaseStore, shopFilterStore } from "@/stores";
import { ShopProductType } from "@/types/shop";
import { observer } from "mobx-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { NoProduct } from "./NoProducts";
import { ShopLoading } from "./ShopLoading";

const ShopPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [loading, setLoading] = useState(true);
  const filteredProducts = useMemo(() => {
    let result = SHOP_PRODUCTS_WITH_COUNTS;

    if (shopFilterStore.brand.length > 0) {
      result = result.filter((item) =>
        shopFilterStore.brand.some((b) => b.value === item.brand.toLowerCase())
      );
    }

    if (shopFilterStore.colorFamily.length > 0) {
      result = result.filter((item) =>
        shopFilterStore.colorFamily.some((c) => c.value === item.color)
      );
    }
    if (category) {
      result = result.filter((item) => item.category === category.toString());
    }

    if (shopFilterStore.shippingLocations.length > 0) {
      result = result.filter((item) =>
        shopFilterStore.shippingLocations.some(
          (s) => s.value === item.shipped_from
        )
      );
    }

    if (shopFilterStore.priceRange) {
      result = result.filter(
        (item) =>
          item.regular_price >= shopFilterStore.priceRange[0] &&
          item.regular_price <= shopFilterStore.priceRange[1]
      );
    }

    shopBaseStore.setNumberOfProducts(result.length);

    return result;
  }, [
    shopFilterStore.colorFamily,
    shopFilterStore.brand,
    shopFilterStore.shippingLocations,
    shopFilterStore.priceRange,
    searchParams,
  ]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [shopBaseStore.numberOfProducts]);

  if (loading) return <ShopLoading />;
  if (shopBaseStore.numberOfProducts == 0) return <NoProduct />;
  return (
    <>
      <div className="grid grid-cols-5 gap-3 auto-rows-max  h-fit pb-10">
        {filteredProducts?.length > 0 &&
          filteredProducts.map((product, i) => {
            return (
              <CustomECard
                variant="ecommerce"
                title={product.title}
                image_src={product.image}
                regular_price={product.regular_price}
                discount={product.discount}
                badge={product.brand as string}
                badgeVariant="brand"
                rating={product.rating}
                rating_count={Number(product.rating_count)}
                shipped_from={product.shipped_from}
                key={i}
              />
            );
          })}
      </div>
    </>
  );
};

export default observer(ShopPage);
