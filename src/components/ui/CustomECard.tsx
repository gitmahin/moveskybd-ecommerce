import Image from "next/image";
import { Badge, badgeVariants } from "./badge";
import { getPriceDiscountValue } from "@/utils/getPriceDiscountValue";
import { VariantProps } from "class-variance-authority";

type CustomCardVariantsType = "card_1" | "card_2";
type CardVariantAttrTypes = {
  imageWrapper?: string;
  mainWrapperClassName?: string;
  contentClassName?: string;
};

const CustomCardVariant: {
  [key in CustomCardVariantsType]: CardVariantAttrTypes;
} = {
  card_1: {
    imageWrapper: "h-[290px] w-full border-b ",
    mainWrapperClassName: "w-full h-fit border  rounded-2xl bg-white ",
    contentClassName: "flex flex-col gap-1 p-4 justify-center",
  },
  card_2: {
    imageWrapper: "h-[290px] w-full border  rounded-lg mb-2 overflow-hidden",
    mainWrapperClassName: "w-full h-fit border  rounded-2xl bg-white p-3",
    contentClassName: "flex flex-col gap-1 p-1 justify-center",
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
  };
  label?: string;
  badge?: string;
  regular_price?: number;
  discount?: number;
  currency_sign?: string;
  badgeVariant?: NonNullable<VariantProps<typeof badgeVariants>["variant"]>;
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
}: CustomCardPropsType) => {
  const { contentClassName, imageWrapper, mainWrapperClassName } =
    CustomCardVariant[variant];
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
      <div className={`${contentClassName} `}>
        {label && (
          <p
            className={`text-sm font-medium text-neutral-500 ${classNames?.labelClassName}`}
          >
            {label}
          </p>
        )}
        <h3 className="text-xl font-medium one-line-ellipsis">{title}</h3>
        {desc && (
          <p className="text-sm text-neutral-500 leading-5 two-line-ellipsis ">
            {desc}
          </p>
        )}
        <div className="flex justify-start items-center gap-1.5 font-semibold text-lg">
          <span>
            {currency_sign}
            {discount
              ? getPriceDiscountValue(Number(regular_price), Number(discount))
              : regular_price}
          </span>
          {discount && (
            <span className="line-through text-neutral-500 ">
              {currency_sign}
              {regular_price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
