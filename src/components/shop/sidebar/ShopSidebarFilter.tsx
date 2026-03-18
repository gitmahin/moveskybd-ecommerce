import {
  ScrollArea,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";

import { BrandFilter } from "./BrandFilter";
import { CategoryFilter } from "./CategoryFilter";

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

          <AccordionItem value="shipped-from">
            <AccordionTrigger>Shipped From</AccordionTrigger>
            <AccordionContent>
              Reach us via email, live chat, or phone. We respond within 24
              hours during business days.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </aside>
  );
};
