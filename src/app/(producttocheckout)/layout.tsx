import { Header, PrimaryLayout } from "@/components/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[64px] bg-background w-full h-full">
      <Header />
      <PrimaryLayout>
        <>
          {children}
        </>
      </PrimaryLayout>
    </div>
  );
}
