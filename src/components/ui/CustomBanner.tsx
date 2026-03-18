"use client";
import { VariantProps } from "class-variance-authority";
import React, { StyleHTMLAttributes } from "react";
import { Badge, badgeVariants } from "./badge";
import Image from "next/image";
import { Button } from "./button";

type CustomBannerVariantType = "hero" | "md";

const CustomBannerVariant: {
  [key in CustomBannerVariantType]: {
    titleClassName?: string;
    badgeClassName?: string;
    descClassName?: string;
    buttonsWrapperClassName?: string;
    buttonClassName?: string;
    wrapperClassName?: string;
    innerContentClassName?: string;
  };
} = {
  hero: {
    wrapperClassName: "rounded-3xl h-[600px]",
    buttonClassName: "uppercase py-7 px-8 text-sm font-bold",
    buttonsWrapperClassName: "gap-5",
    titleClassName: "text-6xl font-bold",
    innerContentClassName: "gap-5  px-20",
    descClassName:
      "max-w-[550px] w-full three-line-ellipsis text-[18px] font-medium",
  },
  md: {
    wrapperClassName: "rounded-2xl h-[350px]",
    buttonClassName: " py-5 px-6 text-sm font-semibold",
    buttonsWrapperClassName: "gap-5",
    titleClassName: "text-4xl font-bold",
    innerContentClassName: "gap-5  px-15",
    descClassName:
      "max-w-[350px] w-full two-line-ellipsis text-[16px] font-medium",
  },
};

type CustomBannerPropsType = {
  title: string;
  variant?: CustomBannerVariantType;
  desc: string;
  bg_image?: string;
  primaryButton?: boolean;
  bgOverLayStyle?: React.CSSProperties
  secondaryButton?: boolean;
  badge?: string;
  classNames?: {
    titleCustomClassName?: string,
    primaryButtonCustomClassName?: string
    secondaryButtonCustomClassName?: string
    descCustomClassName?: string,


  }
  badgeVariant?: NonNullable<VariantProps<typeof badgeVariants>["variant"]>;
  primaryButtonContent?: React.ReactNode;
  secondaryButtonContent?: React.ReactNode;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
};

export const CustomBanner = ({
  title,
  desc,
  badge,
  bg_image,
  badgeVariant = "brand",
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonContent,
  secondaryButtonContent,
  classNames,
  primaryButton,
  bgOverLayStyle,
  secondaryButton,
  variant = "md",
}: CustomBannerPropsType) => {
  const getVariant = CustomBannerVariant[variant];
  return (
    <div
      className={`${getVariant.wrapperClassName} w-full  overflow-hidden relative`}
    >
      <Image
        src={`${bg_image ?? ""}`}
        width={3000}
        height={1000}
        className="w-full absolute top-0 left-0 h-full object-cover object-center "
        alt="Hero Image"
      />
      {
        bgOverLayStyle &&
      <div className="absolute inset-0" style={bgOverLayStyle} />
      }
      <div
        className={`${getVariant.innerContentClassName} relative z-10 flex flex-col justify-center w-full h-full `}
      >
        {badge && (
          <Badge
            variant={badgeVariant}
            className={`${getVariant.badgeClassName} rounded-full `}
          >
            {badge}
          </Badge>
        )}
        <h1 className={`${getVariant.titleClassName} ${classNames?.titleCustomClassName}`}>
          <span className="text-brand-color">
            {title.split("|")?.[0]?.trim()}
          </span>
          <br />
          <span className="text-white">{title.split("|")?.[1]?.trim()}</span>
        </h1>
        <p className={`${getVariant.descClassName} text-neutral-200 ${classNames?.descCustomClassName} `}>
          {desc}
        </p>
        {(primaryButton || secondaryButton) && (
          <div
            className={`${getVariant.buttonsWrapperClassName} flex justify-start items-center   `}
          >
            {primaryButton && (
              <Button
                onClick={() => onPrimaryButtonClick?.()}
                className={`${getVariant.buttonClassName}  ${classNames?.primaryButtonCustomClassName}`}
                variant={"brand"}
              >
                {primaryButtonContent}
              </Button>
            )}
            {secondaryButton && (
              <Button
         
                onClick={() => onSecondaryButtonClick?.()}
                className={`${getVariant.buttonClassName} ${classNames?.secondaryButtonCustomClassName} backdrop-blur-md `}
              >
                {secondaryButtonContent}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
