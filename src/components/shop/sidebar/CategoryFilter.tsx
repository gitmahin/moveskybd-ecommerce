import {

  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { ALL_CATEGORIES } from "@/constants";
import Link from "next/link";
import { ShopFilterMenuItem } from "../ShopFilterMenuItem";
export const CategoryFilter = () => {
  return (
    <AccordionItem value="category">
      <AccordionTrigger>Category</AccordionTrigger>
      <AccordionContent className="leading-6">
        {/* its dummy category */}
        {ALL_CATEGORIES.map((item, i) => {
          return (
            <Link className="no-underline!" href={`/shop/archive/${item.slug}`} key={item.slug}>
              <ShopFilterMenuItem label={item.label} />
            </Link>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};
