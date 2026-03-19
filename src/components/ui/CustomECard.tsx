import Image from "next/image";
import { Badge, badgeVariants } from "./badge";
import { getPriceDiscountValue } from "@/utils/getPriceDiscountValue";
import { VariantProps } from "class-variance-authority";
import { Star } from "lucide-react";
import { Button } from "./button";

type CustomCardVariantsType = "card_1" | "card_2" | "ecommerce";
type CardVariantAttrTypes = {
  imageWrapper?: string;
  mainWrapperClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
};

const CustomCardVariant: {
  [key in CustomCardVariantsType]: CardVariantAttrTypes;
} = {
  card_1: {
    imageWrapper: "h-[290px] w-full border-b ",
    mainWrapperClassName: "w-full h-fit border  rounded-2xl bg-white ",
    contentClassName: " gap-1 p-4 justify-center",
    titleClassName: "text-xl font-medium one-line-ellipsis",
  },
  card_2: {
    imageWrapper: "h-[290px] w-full border  rounded-lg mb-2 overflow-hidden",
    mainWrapperClassName: "w-full h-fit border  rounded-2xl bg-white p-3",
    contentClassName: " gap-1 p-1 justify-center",
    titleClassName: "text-xl font-medium one-line-ellipsis",
  },
  ecommerce: {
    imageWrapper: "h-[200px] w-full border  rounded-lg mb-2 overflow-hidden",
    mainWrapperClassName: "w-full min-h-[390px] border  rounded-2xl bg-white p-2 flex flex-col",
    contentClassName: " flex-1 gap-1 p-1 justify-center",
    titleClassName: "two-line-ellipsis text-[15px] font-medium leading-5",
  },
};

type CustomCardPropsType = {
  variant?: CustomCardVariantsType;
  image_src?: string;
  title?: string;
  desc?: string;
  classNames?: {
    customImageClassName?: string;
    labelClassName?: string;
    titleClassName?: string;
  };
  label?: string;
  badge?: string;
  regular_price?: number;
  discount?: number;
  currency_sign?: string;
  rating?: number;
  rating_count?: number;
  badgeVariant?: NonNullable<VariantProps<typeof badgeVariants>["variant"]>;
  shipped_from?: string;
};

export const CustomECard = ({
  variant = "card_1",
  image_src,
  badge,
  badgeVariant = "default",
  desc,
  label,
  regular_price,
  currency_sign = "$",
  discount,
  title,
  classNames,
  rating,
  rating_count,
  shipped_from,
}: CustomCardPropsType) => {
  const {
    contentClassName,
    imageWrapper,
    mainWrapperClassName,
    titleClassName,
  } = CustomCardVariant[variant];
  return (
    <div
      className={`overflow-hidden relative ${mainWrapperClassName} hover:scale-[1.01] transition-all `}
    >
      {badge && (
        <Badge variant={badgeVariant} className="absolute top-2 left-2">
          {badge}
        </Badge>
      )}
      
      <div className={`${imageWrapper} ${classNames?.customImageClassName}`}>
        <Image
          src={image_src || ""}
          width={500}
          height={700}
          className="object-cover object-center w-full h-full"
          alt={title as string}
        />
      </div>
      <div className={`flex flex-col ${contentClassName} `}>
        {label && (
          <p
            className={`text-sm font-medium text-neutral-500 ${classNames?.labelClassName}`}
          >
            {label}
          </p>
        )}
        <h3 className={` ${titleClassName} ${classNames?.titleClassName}`}>
          {title}
        </h3>
        {desc && (
          <p className="text-sm text-neutral-500 leading-5 two-line-ellipsis ">
            {desc}
          </p>
        )}
        {rating && (
          <p className="flex justify-center items-center gap-1 w-fit  mt-auto">
            <Star className="fill-yellow-500 text-yellow-500 " size={14} />
            <span className="text-sm text-neutral-500">
              {rating} ({rating_count})
            </span>
          </p>
        )}
        <div className="flex justify-start items-center gap-1.5 font-semibold text-lg">
          <span>
            {currency_sign}
            {discount
              ? getPriceDiscountValue(Number(regular_price), Number(discount))
              : regular_price}
          </span>
          {discount? (
            <span className="line-through text-neutral-500 ">
              {currency_sign}
              {regular_price}
            </span>
          ): ""}
        </div>
        {shipped_from && (
        <p className="text-xs font-medium text-neutral-500 ">
          {shipped_from}
        </p>
      )}
        <Button variant={"brand"} className="w-full" size={"lg"}>
          Buy Now
        </Button>
        
      </div>
    </div>
  );
};
