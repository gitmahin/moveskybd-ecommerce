import { Header, PrimaryLayout } from "@/components/core";
import { OrderFlowHeader } from "./OrderFlowHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[64px] w-full h-full">
      <Header />
      <PrimaryLayout>
        <>
          <OrderFlowHeader />
          {children}
        </>
      </PrimaryLayout>
    </div>
  );
}
