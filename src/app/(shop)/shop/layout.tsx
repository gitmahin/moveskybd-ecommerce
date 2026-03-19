import { ScrollArea } from "@/components";
import { ShopHeader, ShopSidebarFilter } from "@/components/shop";

type ShopPageLayoutPropsType = {
  children: React.ReactNode;
};

export default function ShopPageLayout({ children }: ShopPageLayoutPropsType) {
  return (
    <div className="h-full w-full">
      <ShopHeader />
      <div className="flex justify-center items-start h-[calc(100%-64px)] w-full ">
        <ShopSidebarFilter />
        <main className="w-full h-full">
          <ScrollArea className="w-full h-full p-2">
          {children}
          </ScrollArea>
          </main>
      </div>
    </div>
  );
}
