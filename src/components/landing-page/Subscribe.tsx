import Image from "next/image";
import { Button, Input } from "../ui";
import { LandingPageTitle } from "./LandingPageTitle";

type SubscribePropsType = {
  className?: string;
};

export const Subscribe = ({ className }: SubscribePropsType) => {
  return (
    <div
      className={`w-full rounded h-[500px] border bg-[#F0E1D133] relative flex overflow-hidden justify-center rounded-3xl gap-20 items-center ${className}`}
    >
      <div className="w-[230px] h-[230px] bg-[#E9B16D1A] rounded-full absolute -top-20 -right-20 "></div>
      <div className="flex flex-col gap-5 ">
        <LandingPageTitle title="Join MoveSky Insider" />
        <p className="text-[16px] font-medium text-neutral-500 max-w-[550px] w-full">
          Get early access to drops, exclusive discounts, and professional tech
          tips delivered weekly to your inbox.
        </p>
        <div className="flex justify-center items-center gap-3">
          <Input className="h-12 px-5" />
          <Button variant={"brand"} className="h-12 px-5 font-semibold">
            Subscribe
          </Button>
        </div>
      </div>
      <div className="flex justify-start items-center ">
        <div className="w-[300px] h-[300px] rounded-2xl bg-white p-1">
          <div className="w-full h-full bg-neutral-100 rounded-xl overflow-hidden">
            <Image
              src={"/products/subscribe.png"}
              alt="Mobile image"
              width={500}
              height={500}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
