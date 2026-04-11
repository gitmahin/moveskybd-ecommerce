import { AvatarGroups } from "@/components/core";
import { ScrollArea } from "@/components";
import { AVATAR_GROUP_DATA } from "@/constants";
import { Stars } from "lucide-react";

type AuthLayoutPropsType = {
  children: React.ReactNode;
};
export default function AuthLayout({ children }: AuthLayoutPropsType) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white flex justify-center items-center ">
      <section
        className="w-full border-r h-full flex justify-end items-center p-5 pr-16"
        style={{
          backgroundImage: `
        linear-gradient(to bottom, #26436C99, #0E1A27E5, #0E1A2700, #0E1A2700), 
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
        url("/auth/login_page_bg_image.png")
      `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[460px] w-full">
          <h2 className="text-5xl font-semibold text-white">
            Global Connect Your Gateway to Borderless Shopping
          </h2>
          <p className="text-lg leading-5.5 mt-8 text-gray-100">
            Welcome to MoveSky Global, where shopping knows no borders! Shop
            from your favorite international brands and have your purchases
            delivered straight to your doorstep.
          </p>
          <div className="mt-8">
            <AvatarGroups data={AVATAR_GROUP_DATA} />
            <div className="flex justify-start items-center gap-2 mt-3">
              <Stars />
              <span className="font-medium text-lg text-white">5.0</span>
              <span className="font-medium text-sm text-gray-200">
                from 2000+ reviews
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-screen flex justify-start items-center p-5 pl-16">
        <div className="max-w-[460px] w-full  h-full">
          <ScrollArea className="w-full h-full px-2 ">
            <div className="min-h-full flex items-center justify-center ">
              <div className="space-y-5 w-full">{children}</div>
            </div>
          </ScrollArea>
        </div>
      </section>
    </div>
  );
}
