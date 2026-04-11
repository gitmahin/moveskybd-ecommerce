type OrderOverViewListItem = {
  itemkey: string;
  value: string;
  currency: string;
  classNames?: {
    currencyClassName?: string;
  };
};

export const OrderOverViewListItem = ({
  itemkey,
  value,
  currency,
  classNames,
}: OrderOverViewListItem) => {
  return (
    <li className="w-full flex justify-between items-center text-gray-500 text-[16px]">
      {itemkey}{" "}
      <span
        className={`text-white font-medium ${classNames?.currencyClassName}`}
      >
        {currency} {value}
      </span>
    </li>
  );
};
