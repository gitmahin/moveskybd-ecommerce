import Image from "next/image";
import React from "react";

export const Logo = () => {
  return (
    <Image
      src={"/logo.png"}
      width={300}
      height={300}
      className=" w-[130px] h-fit object-contain object-center"
      alt="MoveSkyBd"
    />
  );
};
