import { ScrollArea, Accordion } from "@/components/ui";

import { BrandFilter } from "./BrandFilter";
import { CategoryFilter } from "./CategoryFilter";
import { ShippingFilter } from "./ShippingFilter";
import { ColorFilter } from "./ColorFilter";

export const ShopSidebarFilter = () => {
  return (
    <aside className="w-[280px] border-r  h-full">
      <ScrollArea className="h-full w-full pr-3 py-0">
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
        </Accordion>
      </ScrollArea>
    </aside>
  );
};
