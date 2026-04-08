import React from "react";

type ShopFilterMenuItemPropsType = {
  label: string;
};

export const ShopFilterMenuItem = ({ label }: ShopFilterMenuItemPropsType) => {
  return (
    <p className="text-[13px]! font-normal! text-neutral-500 hover:text-black ">
      {label}
    </p>
  );
};
