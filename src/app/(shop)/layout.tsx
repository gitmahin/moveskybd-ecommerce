import { Header, PrimaryLayout } from "@/components/core";

type ShopLayoutPropsType = {
  children: React.ReactNode;
};

export default function ShopLayout({ children }: ShopLayoutPropsType) {
  return (
    <div className="bg-white h-screen overflow-hidden px-4">
      <Header />
      <PrimaryLayout className="pt-[64px] h-full">{children}</PrimaryLayout>
    </div>
  );
}
