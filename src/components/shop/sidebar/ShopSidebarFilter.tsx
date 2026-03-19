import { ScrollArea, Accordion } from "@/components/ui";

import { BrandFilter } from "./BrandFilter";
import { CategoryFilter } from "./CategoryFilter";
import { ShippingFilter } from "./ShippingFilter";
import { ColorFilter } from "./ColorFilter";
import { PriceMinMaxfilter } from "./PriceMinMaxfilter";

export const ShopSidebarFilter = () => {
  return (
    <aside className="w-[280px] border-r  h-full">
      <ScrollArea className="h-full w-full pr-3 py-0 pb-20">
        <Accordion
          type="single"
          collapsible
          defaultValue="shop-filter"
          className="max-w-lg"
        >
          <CategoryFilter />
          <BrandFilter />
          <ShippingFilter />
          <ColorFilter/>
          <PriceMinMaxfilter/>
        </Accordion>
      </ScrollArea>
    </aside>
  );
};
