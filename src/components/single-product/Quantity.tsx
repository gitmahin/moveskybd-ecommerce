"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Input } from "../ui";
import { Minus, Plus } from "lucide-react";

type QuantityPropsType = {
  stock_count: number;
  onQuantityChange?: (value: number) => void;
};

export const Quantity = ({
  stock_count,
  onQuantityChange,
}: QuantityPropsType) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddQuantity = () => {
    const next = quantity + 1;
    setQuantity(next);
    onQuantityChange?.(next);
  };

  const handleRemoveQuantity = () => {
    const next = quantity - 1;
    setQuantity(next);
    onQuantityChange?.(next);
  };
  return (
    <div className="flex justify-center items-center gap-1">
      <Button
        disabled={quantity < 1}
        className="shrink-0 "
        onClick={handleRemoveQuantity}
        size={"icon-sm"}
        variant={"outline"}
      >
        <Minus size={15} />
      </Button>
      <Input
        disabled={quantity >= Number(stock_count)}
        type="number"
        value={quantity}
        onChange={(e) => {
          const val = Number(e.target.value);
          const max = Number(stock_count);

          if (e.target.value === "") {
            setQuantity(0);
            onQuantityChange?.(0);
            return;
          }

          if (val <= max) {
            setQuantity(val);
            onQuantityChange?.(val);
          }
        }}
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none w-[80px] [&::-webkit-inner-spin-button]:appearance-none text-center"
      />
      <Button
        disabled={quantity >= Number(stock_count)}
        aria-valuemax={stock_count}
        className="shrink-0 "
        onClick={handleAddQuantity}
        size={"icon-sm"}
        variant={"outline"}
      >
        <Plus size={15} />
      </Button>
    </div>
  );
};
