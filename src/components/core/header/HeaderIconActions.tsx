import { IconButtonType } from "@/types/menus";
import React from "react";
import { Heart, ShoppingCart, UserRound } from "lucide-react";
export const HEADER_ACTION_ICONS: IconButtonType[] = [
  { icon: ShoppingCart },
  { icon: UserRound },
  { icon: Heart },
];

export const HeaderIconActions = () => {
  return (
    <>
      {HEADER_ACTION_ICONS.map((item, i) => {
        const Icon = item.icon;
        return (
          <React.Fragment key={i}>
            {Icon && <Icon size={20} className="hover:fill-black" />}
          </React.Fragment>
        );
      })}
    </>
  );
};
